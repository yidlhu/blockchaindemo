process.env.GOPATH = __dirname;

var hfc = require('hfc');
var util = require('util');
var fs = require('fs');
const https = require('https');

var config;
var chain;
var network;
var certPath;
var peers;
var users;
var userObj;
var newUserName;
var chaincodeID;
var certFile = 'us.blockchain.ibm.com.cert';
var chaincodeIDPath = __dirname + "/chaincodeID";


var caUrl;
var peerUrls = [];
var EventUrls = [];

init();

function init() {
    try {
        config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
    } catch (err) {
        console.log("config.json is missing or invalid file, Rerun the program with right file")

    }
    console.log(config);

    // Create a client blockchin.
    chain = hfc.newChain(config.chainName);
    //path to copy the certificate
    certPath = __dirname + "/certificate.pem";

    // Read and process the credentials.json
    var credentialFileName = "";
    if(config.isBluemix == "true") {

        credentialFileName = "ServiceCredentials.json";

    } else {
        credentialFileName = "LocalServiceCredentials.json";
    }



    try {
        if (config.runOnBluemix == 'true') {
            var vcap = JSON.parse(process.env.VCAP_SERVICES);
            network = vcap['ibm-blockchain-5-prod'][0];
            console.log(network);
        } else {
            network = JSON.parse(fs.readFileSync(__dirname + '/' + credentialFileName, 'utf8'));
        }

        if (network.credentials) network = network.credentials;
    } catch (err) {
        console.log(credentialFileName + " is missing or invalid file, Rerun the program with right file:err:",err.message);

    }

    peers = network.peers;
    users = network.users;

    setup();

    printNetworkDetails();

    //Check if chaincode is already deployed
    if (config.isBluemix == "true") {

        if (fileExists(chaincodeIDPath)) {
            // Read chaincodeID and use this for sub sequent Invokes/Queries

            chaincodeID = fs.readFileSync(chaincodeIDPath, 'utf8');
            chain.enroll(users[0].enrollId, users[0].enrollSecret, function (err, user) {
                if (err) throw Error(" Failed to register and enroll " + deployerName + ": " + err);
                userObj = user;

            });
        } else {
            enrollAndRegisterUsers();
        }
    } else {
        chaincodeID = "mycc";

        enrollAndRegisterUsers();
    }

}

function setup() {
    // Determining if we are running on a startup or HSBN network based on the url
    // of the discovery host name.  The HSBN will contain the string zone.
    var isHSBN = peers[0].discovery_host.indexOf('secure') >= 0 ? true : false;
    var network_id = Object.keys(network.ca);
    var grpcPrefix = "";

    if (config.isBluemix == "true") {
        grpcPrefix = "grpcs://";
    } else {
        grpcPrefix = "grpc://";
    }

    caUrl = grpcPrefix + network.ca[network_id].discovery_host + ":" + network.ca[network_id].discovery_port;


    // Configure the KeyValStore which is used to store sensitive keys.
    // This data needs to be located or accessible any time the users enrollmentID
    // perform any functions on the blockchain.  The users are not usable without
    // This data.
    var uuid = network_id[0].substring(0, 8);


    if (config.isBluemix == "true") {

        console.log("%%%%%%%%%%%%%%%%% new file key val store %%%%%%%%%%%%%%% start....");
        console.log("config.isBluemix: true: ", config.isBluemix);
        console.log(__dirname + '/keyValStore-' + uuid);
        chain.setKeyValStore(hfc.newFileKeyValStore(__dirname + '/keyValStore-' + uuid));
        console.log("%%%%%%%%%%%%%%%%% new file key val store %%%%%%%%%%%%%%% end....");
    } else {
        console.log("config.isBluemix: false: ", config.isBluemix);
        chain.setKeyValStore(hfc.newFileKeyValStore('/tmp/volume/keyValStore'));
    }

    if (config.chainCodeMode == "dev") chain.setDevMode(true);


    console.log("isHSBN: ",isHSBN);

    if (isHSBN) {
        certFile = '0.secure.blockchain.ibm.com.cert';
    }
    fs.createReadStream(certFile).pipe(fs.createWriteStream(certPath));
    var cert = fs.readFileSync(certFile);

    if (config.isBluemix == "true") {
        chain.setMemberServicesUrl(caUrl, {
            pem: cert
        });
    } else {
        console.log("%%%%%%%%%%% beging setMemberServicesUrl %%%%%%%%%%%%%");
        console.log("caUrl: ",caUrl);
        chain.setMemberServicesUrl(caUrl);

        console.log("%%%%%%%%%% end setMemberServicesUrl  %%%%%%%%%%%");
    }

    peerUrls = [];
    //eventUrls = [];
    // Adding all the peers to blockchain
    // this adds high availability for the client
    //for (var i = 0; i < 1; i++) {
    for (var i = 0; i < peers.length; i++) {
        // Peers on Bluemix require secured connections, hence 'grpcs://'
        peerUrls.push(grpcPrefix + peers[i].discovery_host + ":" + peers[i].discovery_port);

        if (config.isBluemix == "true") {
            chain.addPeer(peerUrls[i], {
                pem: cert
            });
        } else {
            chain.addPeer(peerUrls[i]);
        }
        // eventUrls.push("grpcs://" + peers[i].event_host + ":" + peers[i].event_port);
        // chain.eventHubConnect(eventUrls[0], {
        //     pem: cert
        // });
    }
    //newUserName = config.user.username;
    // Make sure disconnect the eventhub on exit

    // process.on('exit', function() {
    //     chain.eventHubDisconnect();
    // });
}

function printNetworkDetails() {
    console.log("\n------------- ca-server, peers and event URL:PORT information: ------------");
    console.log("\nCA server Url : %s\n", caUrl);
    for (var i = 0; i < peerUrls.length; i++) {
        console.log("Validating Peer%d : %s", i, peerUrls[i]);
    }
    console.log("");
    // for (var i = 0; i < eventUrls.length; i++) {
    //     console.log("Event Url on Peer%d : %s", i, eventUrls[i]);
    // }
    console.log("");
    console.log('-----------------------------------------------------------\n');
}

function enrollAndRegisterUsers() {

    // Enroll a 'admin' who is already registered because it is
    // listed in fabric/membersrvc/membersrvc.yaml with it's one time password.
    console.log(users[0]);
    //console.log(chain);
    chain.enroll(users[0].enrollId, users[0].enrollSecret, function(err, admin) {


        if (err) throw Error("\nERROR: failed to enroll admin : " + err);

        console.log("\nEnrolled admin sucecssfully");

        // Set this user as the chain's registrar which is authorized to register other users.
        chain.setRegistrar(admin);
        userObj = admin;
        //creating a new user

    });
}


function invoke(funcName, jSONString) {

    var args = [];
    args.push(jSONString);

    var invokeRequest = {
        // Name (hash) required for invoke
        chaincodeID: chaincodeID,
        // Function to trigger
        fcn: funcName,
        // Parameters for the invoke function
        args: args
    };

    // Trigger the invoke transaction
    var invokeTx = userObj.invoke(invokeRequest);

    // Print the invoke results
    invokeTx.on('submitted', function(results) {
        // Invoke transaction submitted successfully
        console.log(util.format("\nSuccessfully submitted chaincode invoke transaction: request=%j, response=%j", invokeRequest, results));
    });
    invokeTx.on('complete', function(results) {
        // Invoke transaction completed successfully
        console.log(util.format("\nSuccessfully completed chaincode invoke transaction: request=%j, response=%j", invokeRequest, results));
        //query();
    });
    invokeTx.on('error', function(err) {
        // Invoke transaction submission failed
        console.log(util.format("\nFailed to submit chaincode invoke transaction: request=%j, error=%j", invokeRequest, err));

    });
}

function query(funcName, args, cb) {
    // Construct the query request
    var queryRequest = {
        // Name (hash) required for query
        chaincodeID: chaincodeID,
        // Function to trigger
        fcn: funcName,
        // Existing state variable to retrieve
        args: args
    };

    console.log("%%%%%% query request %%%%%");
    console.log(queryRequest);
    // Trigger the query transaction
    var queryTx = userObj.query(queryRequest);

    // Print the query results
    queryTx.on('complete', function(results) {
        // Query completed successfully

        cb( results.result.toString() );


        console.log("\nSuccessfully queried  chaincode function: request=%j, value=%s", queryRequest, results.result.toString());
    });
    queryTx.on('error', function(err) {
        // Query failed
        console.log("\nFailed to query chaincode, function: request=%j, error=%j", queryRequest, err);

    });
}

function getArgs(request) {
    var args = [];
    for (var i = 0; i < request.args.length; i++) {
        args.push(request.args[i]);
    }
    return args;
}

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

module.exports = {
    invoke: invoke,
    query: query
};
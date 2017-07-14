/**
 * Created by huyi on 2017/7/4.
 */
var bcOps = require('./../blockchainOps');

module.exports.newSensorInfo = function(req, res){
    console.log("getting into CreateIOTInfo............")
    bcInvoke("CreateIOTInfo",req, res);
};

module.exports.newOrderInfo = function(req, res){
    bcInvoke("CreateOrder",req, res);
};

module.exports.resetIOTTable = function(req, res){
    bcInvoke("ResetIOTTable", req, res);
};

function bcInvoke(funcName, req, res){

    var reqJSONString = JSON.stringify(req.body) ;

    if (reqJSONString.length > 0) {
        var bodystring = "-------->>>>" +  reqJSONString +"<<<<-------"
        console.log(bodystring );

        bcOps.invoke(funcName, reqJSONString);

        res
            .status(201)
            .json(req.body);

    } else {
        res
            .status(400)
            .json({message:"Required data missing from body."});
    }
}

module.exports.listIOTInfo = function(req, res){
    bcQuery("ListIOTInfo",req, res);
};


module.exports.getOrder = function(req, res){
    bcQuery("GetOrder", req, res);
};



function bcQuery(funcName, req, res) {
    var args =[];
    console.log("getting into SelectRows............");
    console.log("funcName--->",funcName);
    console.log("req.params --->",req.params);

    bcOps.query( funcName, args , function(result) {
        res.send(result);
    });
}


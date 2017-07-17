export PATH=$PATH:$GOPATH/bin

cd $GOPATH/src/chaincodes/BCDEMO2

echo 'clear vendor folders'
rm -Rf vendor
rm BCDEMO2

echo 'building...'
govendor init
govendor add +external
govendor add github.com/hyperledger/fabric/peer
# govendor add chaincodes/assets
go build






#!/bin/sh
#link chaincodes to GOPATH
cd ..
mkdir -p $GOPATH/src/chaincodes
rm -Rf $GOPATH/src/chaincodes/BCDEMO2
ln -s $PWD/chaincodes/BCDEMO2 $GOPATH/src/chaincodes/BCDEMO2

#install go dependencies
go get github.com/op/go-logging
go get -u github.com/kardianos/govendor

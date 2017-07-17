

package main

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/core/crypto/primitives"
	logging "github.com/op/go-logging"

)

var logger = logging.MustGetLogger("BCDEMO")

type Chaincode struct {
}

func main() {
	primitives.SetSecurityLevel("SHA3", 256)
	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting  Chaincode: %s", err)
	}
}

//template header end

func (t *Chaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	if function == "init" {
		if len(args) > 1 {
			return nil, errors.New("[Init][init]Incorrect number of arguments. Expecting 0 or 1")
		}
		return t.init(stub, args)
	}
	return nil, errors.New("Received unknown function Init")
}



func (t *Chaincode) init(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	//sub.f init start
	logger.Debug("[Init] start.")

	err := CreateTableIOTInfo(stub)

	if err !=nil {
		logger.Debug(err)

	}

	logger.Debug("[Init] end.")
	return nil, nil
	//sub.f init end
}


func CreateTableIOTInfo(stub shim.ChaincodeStubInterface) error {
	var cols []*shim.ColumnDefinition
	cols = append(cols, &shim.ColumnDefinition{Name: "DATA", Type: shim.ColumnDefinition_STRING, Key: true})

	err := stub.CreateTable("IOTInfo", cols)
	if err != nil {
		logger.Errorf("[CreateTableIOTInfo]table create failed. err: %s", err)
		return err
	}
	return nil
}

func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	if function == "CreateIOTInfo" {
		if len(args) != 1 {
			return nil, errors.New("[Invoke][CreateIOTInfo]Incorrect number of arguments. Expecting 1")
		}
		return CreateIOTInfo(stub, args)

	} else if function == "CreateOrder" {
		if len(args) != 1 {
			logger.Debug("[CreateOrder]",args)
			return nil, errors.New("[Invoke][CreateOrder]Incorrect number of arguments. Expecting 1")
		}
		return CreateOrder(stub, args)
	} else if function == "ResetIOTTable" {

		return ResetIOTTable(stub, args)
	}

	return nil, errors.New("Received unknown function Invoke")
}

func ResetIOTTable(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	err := stub.DeleteTable("IOTInfo")
	if err != nil {return nil, err}
	err = CreateTableIOTInfo(stub)

	if err !=nil {
		logger.Debug(err)
		return nil, err
	}
	return nil, nil
}

func CreateOrder(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	err := stub.PutState("OrderInfo", []byte (args[0]) )
	if err != nil {
		logger.Errorf("[CreateOrder(%s)]Order update failed. %s", args[0], err)
		return nil, err
	}
	return nil, nil
}


func CreateIOTInfo(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	logger.Debugf("[CreateIOTInfo(%s)] start.", args[0])
	err := InsertIOTInfo(stub, args[0])
	if err != nil {
		return nil, err
	}
	return nil, nil
}

//InsertRow
func InsertIOTInfo(stub shim.ChaincodeStubInterface,  IOTInfo string) error {
	tableName := "IOTInfo"
	logger.Debugf("[InsertRow(%s)] start.", tableName)

	vals := make([]*shim.Column, 0)
	vals = append(vals, &shim.Column {Value: &shim.Column_String_{String_: IOTInfo}})
	row := shim.Row{Columns: vals}

	//execute insert
	ok, err := stub.InsertRow(tableName, row)

	//error handle
	if err != nil {
		logger.Errorf("[InsertRow(%s)] %s", tableName, err.Error())
		return err
	}
	if !ok {
		err = errors.New("Row with given key already exists.")
		logger.Errorf("[InsertRow(%s)] %s", tableName, err.Error())
		return err
	}

	logger.Debugf("[InsertRow(%s)] end.", tableName)
	return nil
}



//---------------------------------------------------------------------------------------------------


func (t *Chaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	if function == "ListIOTInfo" {

		return t.ListIOTInfo(stub, args)

	} else if function == "GetOrder" {
		return t.GetOrder(stub, args)
	}

	return nil, errors.New("Received unknown function Query")
}

func (t *Chaincode) GetOrder(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	orderBytes, err := stub.GetState("OrderInfo")
	logger.Debug("[GetOrder]", orderBytes)
	if err == nil {
		return orderBytes, nil
	}
	return nil, err
}


func (t *Chaincode) ListIOTInfo(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	var err error

	rows, err := SelectIOTInfo(stub)
	if err != nil {
		return nil, err
	}
	//生成JSON
	IOTInfos, err := ParseIOTInfoRows(stub, rows)
	if err != nil {
		return nil, err
	}

	if len(IOTInfos) == 0 {
		err = errors.New("[ListIOTInfo]Data Not Found.")
		return nil, err
	}
	return json.Marshal(IOTInfos)
}

func SelectIOTInfo(stub shim.ChaincodeStubInterface) ([]shim.Row, error) {
	logger.Debug("[SelectIOTInfo] start.")


	rows, err := GetRows(stub, "IOTInfo")
	//error handle
	if err != nil {
		logger.Errorf("[SelectIOTInfo]%s", err.Error())
		return rows, err
	}
	logger.Debug("[SelectIOTInfo] end.")
	return rows, nil
}

//GetRows
func GetRows(stub shim.ChaincodeStubInterface, tableName string) ([]shim.Row, error) {
	logger.Debugf("[GetRows(%s)] start.", tableName)

	rows := make([]shim.Row, 0)


	//執行查詢
	rowChannel, err := stub.GetRows(tableName, nil)
	if err != nil {
		logger.Errorf("[GetRows(%s)]%s", tableName, err.Error())
		return rows, err
	}

	for {
		select {
		case row, ok := <-rowChannel:
			if !ok {
				rowChannel = nil
			} else {
				if row.Columns != nil {
					rows = append(rows, row)
				}
			}
		}
		if rowChannel == nil {
			break
		}
	}

	//error handle
	if err != nil {
		logger.Errorf("[GetRows(%s)]%s", tableName, err.Error())
		return rows, err
	}
	logger.Debugf("[GetRows(%s)] end.", tableName)

	return rows, nil
}

func ParseIOTInfoRows(stub shim.ChaincodeStubInterface, rows []shim.Row) ([]string, error) {
	sRows := make([]string, 0)

	for _, row := range rows {
		s := row.Columns[0].GetString_()
		sRows = append(sRows, s)
	}
	return sRows, nil
}

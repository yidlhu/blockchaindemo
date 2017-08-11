# Practice:
## 1. Make a chaincode "hello" and do unit testing.
  ### 1.1. (In new Terminal) enter the fabric_client environment of Docker Container 
  ```
    docker exec -it client_dev_s /bin/bash
  ```
  ### 1.2. compile chaincode
  ```
    cd $GOPATH/src/chaincodes/hello
    go build
  ```
  ### 1.3. do unit testing
  ```
    go test
  ```
## 2. Startup chaincode "hello" in DEV mode by REST
  ### 2.1. (In new Terminal) enter the fabric_client environment of Docker Container 
  ```
    ./login_workspace.sh  或者
    docker exec -it client_dev_s /bin/bash
  ```
  ### 2.2. startup chaincode DEV environment
  ```
    cd $GOPATH/src/chaincodes/hello/scripts
    ./startup.sh
  ```
## 3. Access chaincode "hello" by REST API(Deploy, Invoke, Query)
  ### 3.1. (In new Terminal) enter the fabric_client environment of Docker Container  
  ```
    ./login_workspace.sh  或者
    docker exec -it client_dev_s /bin/bash
  ```
  ### 3.2. deploy chaincode
  ```
    cd $GOPATH/src/chaincodes/hello/scripts
    ./enroll.sh
    ./deploy.sh
  ```
  ### 3.3. invoke chaincode
  ```
    ./invoke.sh
  ```
  ### 3.4. query chaincode
  ```
    ./query.sh
  ```
# Exercise: (Base on hello.go)
- Define an invoke function named `SetValue` with 2 arguments: `Account` and `Balence`
- Define a query function named `GetValue` with 1 argument: `Account` to return the current value of the account.
- Deploy the chaincode again
- Access `SetValue` function by shell  `exercises/SetValue.sh`
- Access `GetValue` function by shell  `exercises/GetValue.sh`

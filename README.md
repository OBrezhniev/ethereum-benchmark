# Ethereum benchmark
A set of scripts to test performance of private ethereum networks: Quorum, Geth with Clique, etc.

## Prerequisites
* Nodejs v8+
* Truffle
* Geth

## Install
Edit `truffle-config.js` as you need.
```bash
truffle migrate --network quorum
cd nodejs
npm install
```

## Run
There are two type of scripts.
1. Scripts to run inside geth itself (inside `geth_scripts` directory):
    ```bash
    cd geth_scripts
    geth attach http://172.16.239.11:8545 --exec 'loadScript("sendEth.js")'
    ```
2. Nodejs scripts (inside `nodejs` directory):
    ```bash
    cd nodejs
    node sendEth.js
    node sendToken.js
    ```

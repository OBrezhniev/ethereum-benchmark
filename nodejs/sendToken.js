const Web3 = require('web3');

console.log("*** send token test ***");

//const net = require('net');
//const web3 = new Web3(new Web3.providers.HttpProvider("http://172.25.0.110:8545"));
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://172.16.239.11:8546"));
//const web3_2 = new Web3(new Web3.providers.WebsocketProvider("ws://172.16.239.12:8546"));

const contractAddress = "0x1932c48b2bF8102Ba33B4A6B545C32236e342f34";

const contractAbi = require('../build/contracts/SimpleToken.json');
// ABI description as JSON structure
const abi = contractAbi.abi;

const SimpleTokenContract = new web3.eth.Contract(abi, contractAddress);

async function run() {
    let amount = 1;
    let sender = (await web3.eth.personal.getAccounts())[0];
    let receiver;
    receiver = "0x32dc9d787df5bffb7218bd247c7bc7838151d87f";

    console.log("Account tx count:", await web3.eth.getTransactionCount(sender));
    console.log("Account tx count incl pending:", await web3.eth.getTransactionCount(sender, "pending"));
    console.log(await web3.eth.getBalance(sender));

    console.log(sender);

    await web3.eth.personal.unlockAccount(sender, "", 0);

    let start = new Date().getTime();
    let count = 1000;
    let done = 0;

    for (let i = 0; i < count; ++i) {
        //console.log(i);
        SimpleTokenContract.methods.transfer(receiver, amount)
            .send({from: sender, gas: 1000000})
            .then((result, error) => {
                //console.log(result, error);
                done++;
            })
            .catch((err) => {
                console.log(err);
                done++;
            })
    }

    console.log("sent");

    let timerId = setInterval(async function () {
        if (done >= count) {
            let end = new Date().getTime();
            let time = end - start;
            console.log('Execution time: ' + time);
            console.log('TPS: ' + (count * 1000 / time));
            console.log("Account tx count:", await web3.eth.getTransactionCount(sender));
            console.log("Account tx count incl pending:", await web3.eth.getTransactionCount(sender, "pending"));
            clearInterval(timerId);
            process.exit(0);
        }
    }, 100);

}

run().then(() => {
}).catch((err) => {
    console.log(err);
});
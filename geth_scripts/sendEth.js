var amount = 1;
var sender = personal.listAccounts[0];
//var receiver = "0xed9d02e382b34818e88b88a309c7fe71e65f419d";
//var receiver = sender;
var receiver = "0x32dc9d787df5bffb7218bd247c7bc7838151d87f";

console.log(sender);

personal.unlockAccount(sender, "", 0);

var txCount = eth.getTransactionCount(sender);

console.log("Account tx count:", eth.getTransactionCount(sender));
console.log("Account tx count incl pending:", eth.getTransactionCount(sender, "pending"));

var start = new Date().getTime();
var count = 1000;
var done = 0;
for (i = 0; i < count; ++i) {
    eth.sendTransaction({from: sender, to: receiver, value: amount}, function (err, res) {
        if (err !== null) {
            console.log(err, res);
        }
        done++;
    });
}

console.log("sent");

// wait for txs to be included into blocks
while (eth.getTransactionCount(sender) - txCount < count) {
    eth.getTransactionCount(sender); // just do nothing
}

if (done >= count) {
    var end = new Date().getTime();
    var time = end - start;
    console.log('Execution time: ' + time);
    console.log('TPS: ' + (count * 1000 / time));
    console.log("Account tx count:", eth.getTransactionCount(sender));
    console.log("Account tx count incl pending:", eth.getTransactionCount(sender, "pending"));
}


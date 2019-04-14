const SimpleToken = artifacts.require("SimpleToken.sol");

contract('SimpleToken', (accounts) => {
  it('should put 1000000 SimpleToken in the first account', async () => {
    const SimpleTokenInstance = await SimpleToken.deployed();
    const balance = (await SimpleTokenInstance.balanceOf.call(accounts[0])).toNumber();

    assert.equal(balance.valueOf(), 1000000, "1000000 wasn't in the first account");
  });
  it('should transfer tokens correctly', async () => {
    const SimpleTokenInstance = await SimpleToken.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = "0x32dc9d787df5bffb7218bd247c7bc7838151d87f";

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await SimpleTokenInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await SimpleTokenInstance.balanceOf.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await SimpleTokenInstance.transfer(accountTwo, amount);

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await SimpleTokenInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await SimpleTokenInstance.balanceOf.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});

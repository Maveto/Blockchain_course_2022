const Lottery = artifacts.require("Lottery");

contract("Lottery", accounts => {

    let instance;

    beforeEach("Deploy again", async () => {
        instance = await Lottery.new();
    });

    it("Allows one account to enter", async () => {
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    });

    it("Allows multiple accounts to enter", async () => {
        await instance.enter({from: accounts[0], value: web3.utils.toWei("3", "ether")});
        await instance.enter({from: accounts[1], value: web3.utils.toWei("4", "ether")});
        await instance.enter({from: accounts[2], value: web3.utils.toWei("5", "ether")});

        const players = await instance.getPlayers.call();

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it("Require a minimun amount of ether to enter", async () => {
        try {
            await instance.enter({from: accounts[0], value: web3.utils.toWei("1", "ether")});
            assert(false);
        }catch (e) {
            assert.equal("Not enough money!", e.reason);
        }
    });

    it("Only manager can call pickWinner", async () => {
        try {
            await instance.pickWinner({from:accounts[8]});
            assert(false);
        } catch (e) {
            assert.equal("You are not the manager", e.reason);
        }
    });
});
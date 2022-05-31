const Inbox = artifacts.require('Inbox');

contract('Inbox', accounts => {

    it('getMessage', async () => {
        const instance = await Inbox.deployed();

        assert.equal(await instance.getMessage.call(), 'Hi');
    });

    it('setMessage', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Mauricio', {from: accounts[0]});
        assert(await instance.getMessage.call(), 'Hi Mauricio');
    });
});
const Inbox = artifacts.require('Inbox');

contract('Inbox', accounts => {

    it('getMessage', async () => {
        const instance = await Inbox.deployed();

        assert.equal(await instance.getMessage.call(), 'Hi');
    });

    it('setMessage should change value', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Mauricio', {from: accounts[0]});
        assert.equal(await instance.getMessage.call(), 'Hi Mauricio');
    });

    it('setMessage should not change value', async () => {
        try{
            const instance = await Inbox.deployed();
            await instance.setMessage('Hi Mauricio', {from: accounts[1]});
        }catch(e){
            assert.equal(e.reason, 'Only the owner can change this!');
        }
    });
    
});
const Amazon = artifacts.require("TestAmazon");

contract("TestAmazon", accounts => {

    let instance;

    beforeEach("Deply again", async () => instance = await Amazon.new());

    it("1. Only owner can add new products and quantity must be 0", async () => {
        await instance.addProduct([0, "Magic Book", 3, 50], { from: accounts[0] });

        const product = await instance.listProducts.call(0);
        //Test prduct exists
        assert(product != undefined);
        //Test quantity = 0
        assert.equal(product.stock, 0);

        //Test others can't add product
        try {
            await instance.addProduct([1, "Magic Book 2", 3, 50], { from: accounts[1] });
            assert(false);
        } catch (e) {
            assert.equal(e.reason, "You are not the owner.")
        }
    });

    it("2. Adding a product name must be longer than 5 characters", async () => {
        try {
            await instance.addProduct([0, "Book", 3, 50], { from: accounts[0] });
            assert(falase);
        } catch (e) {
            assert.equal(e.reason, "The name of product should be more than 5.")
        }
    });

    it("3. Only owner can add product stock", async () => {
        await instance.addProduct([0, "Magic Book", 0, 50], { from: accounts[0] });
        await instance.addQuantity(0, 5, {from: accounts[0]});

        const product = await instance.listProducts.call(0); 
        //Test quantity has been added
        assert.equal(product.stock, 5);

        //Testing others cant't add quantity
        try {
            await instance.addProduct([0, "Magic Book", 0, 50], { from: accounts[1] });
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "You are not the owner.");
        }
    });

    it("4. Only owner can close the store", async () => {
        //Testing others can't close the store
        try {
            await instance.closeOrOpenAmazon(true, {from: accounts[1]});
            assert(false);
        } catch (e) {
            assert.equal(e.reason, "You are not the owner.");
        }

        //Testing owner can close the store
        await instance.closeOrOpenAmazon(true, {from: accounts[0]});
        try {
            await instance.addProduct([0, "Magic Book", 3, 50], { from: accounts[0] });
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "Amazon is closed.")
        }
    });

    it("5. Only owner can withdraw money", async () => {
        await instance.addProduct([1, "Magic Book 2", 0, 25], { from: accounts[0] });
        await instance.addQuantity(0, 5, {from: accounts[0]});

        await instance.buyProduct(0, 2, {from: accounts[1], value: web3.utils.toWei("50", "ether")});

        try {
            await instance.withdrawAllMoney({from: accounts[1]});
            assert(false);
        }catch(e) {
            assert.equal(e.reason, "You are not the owner.")
        }

        const iniOwnerBalance = await web3.eth.getBalance(accounts[0]);
        await instance.withdrawAllMoney({from: accounts[0]});
        const finalOwnerBalance = await web3.eth.getBalance(accounts[0]);

        assert(finalOwnerBalance > iniOwnerBalance);
    });

    it("6. Client can buy 2 products", async () => {
        await instance.addProduct([1, "Magic Book 2", 5, 25], { from: accounts[0] });
        await instance.addQuantity(0, 5, {from: accounts[0]});

        const buyedQuantity = 2;

        const initClientBalance = await web3.eth.getBalance(accounts[1]);
        const initProduct = await instance.listProducts.call(0);

        await instance.buyProduct(0, buyedQuantity, {from: accounts[1], value: web3.utils.toWei("50", "ether")});

        const finalClientBalance = await web3.eth.getBalance(accounts[1]);
        const finalProduct = await instance.listProducts.call(0);

        const expectedClientBlanace = initClientBalance - (buyedQuantity * initProduct.price);
        // console.log(initProduct.price);

        //Testing client balance
        assert(finalClientBalance <= expectedClientBlanace);
        //Testing product quantity
        assert.equal(finalProduct.stock, initProduct.stock - buyedQuantity);
        //Testing smart contract balance
        assert.equal(await web3.eth.getBalance(instance.address), buyedQuantity * initProduct.price);

    });

    it("7. ")
});
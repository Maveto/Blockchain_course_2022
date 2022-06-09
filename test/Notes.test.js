const Notes = artifacts.require("Notes");

contract("Notes", accounts => {

    let instance;

    beforeEach("Deploy again", async () => {
        instance = await Notes.new();
    });

    it("Evaluar is setting the grade", async () => {
        await instance.Evaluar("Mauri", 9);
        const grade = await instance.VerNotas("Mauri");
        assert.equal(9, grade);
    });

    it("Only professor can call Evaluar", async () => {
        try {
            await instance.Evaluar("Mauri", 9, {from: accounts[1]});
            assert(false);
        } catch (e) {
            assert.equal("No tienes permisos para ejecutar esta funcion.", e.reason);
        }
    });
});
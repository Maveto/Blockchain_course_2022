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

});
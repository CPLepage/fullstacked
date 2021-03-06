import {before, describe} from "mocha";
import Helper from "tests/e2e/Helper"
import {equal} from "assert";

describe("Basic Test", function(){
    let test = new Helper(__dirname);

    before(async function (){
        await test.start();
    });

    it('Should load a basic web page', async function(){
        const root = await test.page.$("#root");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "<div>Basic Test</div>");
    });

    after(async function(){
        await test.stop();
    });
});

import {describe} from "mocha";
import {ok} from "assert";
import {sleep} from "../../scripts/utils";

describe("Unit Tests", function(){
    it('Should sleep near 1 second', async function(){
        const now = Date.now();
        const oneSec = 1000;
        await sleep(oneSec);
        ok(Date.now() - now > oneSec - 5);
    });
});

import {before, describe} from "mocha";
import {equal} from "assert";
import {exec} from "child_process";
import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";
import sleep from "fullstacked/scripts/sleep";
import waitForServer from "fullstacked/scripts/waitForServer";

describe("Docker-Compose Test", function(){
    let runProcess, browser, page;

    before(async function (){
        runProcess = exec(`node ${path.resolve(__dirname, "../../../cli")} run --src=${__dirname} --out=${__dirname} --test-mode`);
        await waitForServer(15000);
        browser = await puppeteer.launch({headless: process.argv.includes("--headless")});
        page = await browser.newPage();
    })

    it('Should create connection with mongo container', async function(){
        await page.goto("http://localhost:8000/mongo-test-connection");
        const body = await page.$("body");
        const innerHTML = await body.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "success");
    });

    after(async function(){
        await browser.close();
        runProcess.kill("SIGINT");

        await sleep(3000);

        const distDir = path.resolve(__dirname, "dist");
        if(fs.existsSync(distDir)) fs.rmSync(distDir, {recursive: true, force: true});
    });
});

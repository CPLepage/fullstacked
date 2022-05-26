import {before, describe} from "mocha";
import Helper from "tests/e2e/Helper"
import {equal} from "assert";
import {killProcess, sleep} from "../../../scripts/utils";
import {exec} from "child_process";
import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";

describe("Run Test", function(){
    let runProcess, browser, page;

    before(async function (){
        runProcess = exec(`node ${path.resolve(__dirname, "../../../cli")} run --src=${__dirname} --out=${__dirname} --silent`);
        await sleep(5000);
        browser = await puppeteer.launch({headless: process.argv.includes("--headless")});
        page = await browser.newPage();
        await page.goto("http://localhost:8000");
    })

    it('Should run a basic web page', async function(){
        const root = await page.$("#root");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "<div>Run Test</div>");
    });

    after(async function(){
        await browser.close();
        runProcess.kill("SIGINT");

        await sleep(3000);

        const distDir = path.resolve(__dirname, "dist");
        if(fs.existsSync(distDir)) fs.rmSync(distDir, {recursive: true, force: true});
    });
});
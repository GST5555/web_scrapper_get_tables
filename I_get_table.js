// Primer Argumento debe ser el link a entrar
//console.time('someFunction');
var myArgs = process.argv.slice(1);
//console.log(myArgs[1])
//myArgs[0] aqui esta el link a entrar
const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({});//headless: false
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720})
    await page.goto(myArgs[1], { waitUntil: 'networkidle0' }); // wait until page load
    //await page.waitForNavigation({ waitUntil: 'networkidle0' }),   
    await page.waitFor('tbody').then(async function() {
	//await page.waitFor(2000);
        first_column_text = await page.evaluate(() => Array.from(document.querySelectorAll("tbody")[0].rows, e => Array.from(e.children,w => w.innerHTML)));
        console.log(first_column_text)
        //head_column_text = await page.evaluate(() => Array.from(document.querySelectorAll(".ft_head")[0].children, e => e.innerText));
        //console.log(head_column_text)
    }).catch(error => (console.log("No tiene")))
    //await page.reload({ waitUntil: 'load' }); // wait until page load
    // wait for 1 second

    //console.timeEnd('someFunction');
    //await page.waitFor(14000);
    await browser.close();
}

main();

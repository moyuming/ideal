//https://zhaoqize.github.io/puppeteer-api-zh_CN/
//https://github.com/puppeteer/puppeteer
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('http://www.baidu.com', {waitUntil: 'networkidle2'});
  /*await page.screenshot({
    path: 'd:/tmp/baidu.png'
  })*/
  await page.pdf({path: 'd:/tmp/baidu.pdf', format: 'A4'});
  await browser.close();
})()
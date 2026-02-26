const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));

        console.log("Navigating to http://localhost:3002...");
        await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });

        console.log("Page loaded. Closing browser...");
        await browser.close();
    } catch (e) {
        console.error("Script failed:", e);
    }
})();

import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}
const files = walk('d:/MY PROJECTS/PROPFIRMPLAZA/prop-firm-plaza');
let updated = 0;
files.forEach(f => {
    let raw = fs.readFileSync(f, 'utf8');
    let newRaw = raw;

    // Specifically target the uppercase CAPITAL promo codes but don't break "Alpha Capital" firm name
    // Replace "CAPITAL" strictly when used as a promo code or standalone, not as part of "Alpha Capital"
    newRaw = newRaw.replace(/\bCAPITAL\b(?!')/g, 'PLAZA'); // Replace CAPITAL with PLAZA

    // Replace instances of Capital Match (the old brand name)
    newRaw = newRaw.replace(/Capital Match/g, 'PropFirms Plaza');

    // Replace the old email domain
    newRaw = newRaw.replace(/thecapitalmatch\.com/g, 'propfirmsplaza.com');

    if (newRaw !== raw) {
        fs.writeFileSync(f, newRaw);
        updated++;
    }
});
console.log('Updated ' + updated + ' files successfully.');

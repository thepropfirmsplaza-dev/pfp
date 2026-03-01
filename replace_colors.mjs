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
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}
const files = walk('d:/MY PROJECTS/PROPFIRMPLAZA/prop-firm-plaza');
let updated = 0;
files.forEach(f => {
    let raw = fs.readFileSync(f, 'utf8');
    let newRaw = raw.replace(/#0f0b1e/gi, '#0f1a12');
    newRaw = newRaw.replace(/8b5cf6/gi, '1fd655');
    newRaw = newRaw.replace(/#2d2745/gi, '#122417');
    newRaw = newRaw.replace(/#3d3565/gi, '#15a13c');

    if (newRaw !== raw) {
        fs.writeFileSync(f, newRaw);
        updated++;
    }
});
console.log('Updated ' + updated + ' files successfully.');

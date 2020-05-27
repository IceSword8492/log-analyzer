import fs from 'fs'

const list = fs.readdirSync('./logs', {withFileTypes: true});

list.forEach(f => {
    if (f.isDirectory()) {
        const l = fs.readdirSync(`./logs/${f.name}`);
        l.forEach(f2 => {
            if (f2 === 'memo.txt') {
                console.log(`---${f.name}---`);
                console.log(fs.readFileSync(`./logs/${f.name}/${f2}`, 'utf8'));
            }
        });
    }
});

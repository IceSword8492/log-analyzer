import fs from 'fs'

const list = fs.readdirSync('./logs', {withFileTypes: true});

list.forEach(f => {
    if (f.isDirectory()) {
        const l = fs.readdirSync(`./logs/${f.name}`);
        l.forEach(f2 => {
            if (/\.png/gm.test(f2)) {
                try {
                    fs.mkdirSync(`./imgs/${f.name}`);
                } catch {}
                fs.writeFileSync(`./imgs/${f.name}/${f2}`, fs.readFileSync(`./logs/${f.name}/${f2}`));
            }
        });
    }
});

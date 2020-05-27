import fs from 'fs'
import path from 'path'

const logList = fs.readdirSync('./logs', {withFileTypes: true});

for (let logDir of logList) {
    if (logDir.isDirectory()) {
        if (process.argv[2]) {
            if (!new RegExp(process.argv[2]).test(logDir.name)) {
                continue;
            }
        }
        console.log(`processing (${logDir.name})`);

        const dir = `${path.dirname(new URL(import.meta.url).pathname).slice(1)}/logs/${logDir.name}`;
        const log = fs.readFileSync(`${dir}/adb.log`, 'utf8');

        const extracted = log.match(/.*sharo.*/gm);

        fs.writeFileSync(`${dir}/extracted.log`, extracted.join('\n') + '\n');

        const timeLogArray = [];

        extracted.forEach(line => {
            const time = line.match(/\d{2}:\d{2}:\d{2}\.\d{3}/gm)[0];
            const log = line.match(/(?<=\: ).*/gm)[0];
            timeLogArray.push({time, log});
        });

        fs.writeFileSync(`${dir}/timeLog.log`, JSON.stringify(timeLogArray, null, 4));

        const base64Texts = (extracted.join('\n') + '\n').match(/(?<=bitmap -> ).*/gm) || [];

        base64Texts.forEach((base64, i) => {
            const buf = Buffer.from(base64, 'base64');
            fs.writeFileSync(`${dir}/img${i}.png`, buf);
        });
    }
}

console.log('done');

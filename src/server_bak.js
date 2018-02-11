const util = require('util');
const exec = util.promisify(require('child_process').exec);
const csvjson = require('csvjson');

async function getGPUData() {
    const command = 'nvidia-smi --query-gpu=index,power.draw,fan.speed,temperature.gpu --format=csv';
    const {stdout, stderr} = await exec(command);
    console.log('err', stderr);
    console.log('res', stdout);
    console.log('formatted', csvjson.toObject(stdout));
    return stdout;
}

async function controlGPUFan() {

    const {stdout, stderr} = await exec(command);
    console.log('err', stderr);
    console.log('res', stdout);
    console.log('formatted', csvjson(stdout));
    return stdout;
}

const main = () => {
    getGPUData();
    //controlGPUFan();
}
main();

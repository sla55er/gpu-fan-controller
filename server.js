const GPUController = require('./src/GPUController');
const controlInterval = 30 * 1000;

(function main(){
    const gpuController = new GPUController();

    setInterval(() => {
        gpuController.monitorGPUData();
        console.log('@');
        console.log('@');
        console.log('@');
    }, controlInterval)

}());
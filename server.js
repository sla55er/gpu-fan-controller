const GPUController = require('./src/GPUController');
const controlInterval = 5 * 1000;

(function main(){
    const gpuController = new GPUController();

    setInterval(() => {
        gpuController.controlGPUFan();
        console.log('@');
        console.log('@');
        console.log('@');
    }, controlInterval)

}());
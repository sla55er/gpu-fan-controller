const GPUController = require('./src/GPUController');

(function main() {
  const gpuController = new GPUController();

  gpuController.monitorGPUData();

}());
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const csvjson = require('csvjson');
const config = require('../config/gpu-fan-config');

class GPUController {
  constructor() {
    this.config = config;
  }

  async controlGPUFan() {
    const gpusData = await this.getGPUData();
    const changes = [];
    let result;

    gpusData.forEach(gpuData => {
      const gpuIndex = parseInt(gpuData['index'], 10);
      const gpuTemp = parseInt(gpuData['temperature.gpu'], 10);
      const gpuWattage = parseFloat(gpuData['power.draw [W]']);
      const gpuFanSpeed = parseInt(gpuData['fan.speed [%]'], 10);

      console.log('--------------------------------------------------')
      console.log(`Index: ${gpuIndex}, Wattage: ${gpuWattage}, Temp: ${gpuTemp}, FanSpeed: ${gpuFanSpeed}`);

      // const gpuTempRange = this.config.find(range => gpuTemp >= range.from && gpuTemp < range.to);
      // if (gpuFanSpeed != gpuTempRange.fanSpeed) {
      //     this.setGPUFan(gpuIndex, gpuTempRange.fanSpeed);
      // }
    })
  }

  async setGPUFan(gpuIndex, fanSpeed) {
    const command = `DISPLAY=:0 XAUTHORITY=/var/run/lightdm/root/:0 nvidia-settings -a [fan:${gpuIndex}]/GPUTargetFanSpeed=${fanSpeed}`;

    console.log('Change')
    console.log(`Setting - Index: ${gpuIndex}, FanSpeed: ${fanSpeed}`);
    console.log('--------------------------------------------------')
    const {stdout, stderr} = await exec(command);
    return stdout;
  }

  async getGPUData() {
    const command = 'nvidia-smi --query-gpu=index,power.draw,temperature.gpu,fan.speed --format=csv';
    const {stdout, stderr} = await exec(command);
    console.log('executed')
    const stats = csvjson.toObject(stdout, {delimiter: ', '});
    return stats;
  }

  monitorGPUData() {
    setInterval(async () => {
      const data = await this.getGPUData();
      data.forEach(gpuData => {
        const gpuIndex = parseInt(gpuData['index'], 10);
        const gpuTemp = parseInt(gpuData['temperature.gpu'], 10);
        const gpuWattage = parseFloat(gpuData['power.draw [W]']);
        const gpuFanSpeed = parseInt(gpuData['fan.speed [%]'], 10);

        console.log('--------------------------------------------------')
        console.log(`Index: ${gpuIndex}, Wattage: ${gpuWattage}, Temp: ${gpuTemp}, FanSpeed: ${gpuFanSpeed}`);
      }, this.config.monitorInterval)

    })
  }
}

module.exports = GPUController;
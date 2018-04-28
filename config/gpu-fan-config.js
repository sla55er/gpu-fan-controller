const controllConfig = [
  {
    "from": 1,
    "to": 40,
    "fanSpeed": 20
  },
  {
    "from": 40,
    "to": 45,
    "fanSpeed": 45
  },
  {
    "from": 45,
    "to": 50,
    "fanSpeed": 50
  },
  {
    "from": 50,
    "to": 55,
    "fanSpeed": 55
  },
  {
    "from": 55,
    "to": 60,
    "fanSpeed": 65
  },
  {
    "from": 60,
    "to": 65,
    "fanSpeed": 80
  },
  {
    "from": 65,
    "to": 70,
    "fanSpeed": 85
  },
  {
    "from": 70,
    "to": 75,
    "fanSpeed": 90
  },
  {
    "from": 80,
    "to": Number.MAX_VALUE,
    "fanSpeed": 100
  }
];

const monitorInterval = 10 * 1000;

module.exports = {
  controllConfig,
  monitorInterval
};

require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const{ PRIVATE_KEY,ALCHEMY_API_KEY,MUMBAI_KEY} = process.env||""


module.exports = {
  defaultNetwork: 'hardhat',
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      polygonMumbai: MUMBAI_KEY,
    },
  },
  networks: {
    hardhat: {},
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.25',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
}

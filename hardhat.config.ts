import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [    //可指定多个sol版本
      {version: "0.8.19"},
    ],
  },  
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      chainId: 80001,
      url: process.env.API_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};

export default config;






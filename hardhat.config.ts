import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const POLYGON_MUMBAI_PRIVATE_KEY = "4a176cf43917707a501fec6950a5b3602ba057cfde5223f82524281ee30a92bb";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [    //可指定多个sol版本
      {version: "0.8.19"},
      {version: "0.6.11"},
    ]   
  },  
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      chainId: 80001,
      url: 'https://polygon-mumbai.g.alchemy.com/v2/msaJegrQLaLoy3szqaYUebeTejvKLeJO',
      accounts: [POLYGON_MUMBAI_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: {
      mumbai: "msaJegrQLaLoy3szqaYUebeTejvKLeJO",
    }
  },
};

export default config;






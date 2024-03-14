import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const secret = require("./secret");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
	sepolia: {
		url: `https://sepolia.infura.io/v3/00e69497300347a38e75c3287621cb16`,
		accounts: [secret.MMENOMIC],
	}
  }
};

export default config;

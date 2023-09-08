// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const {ethers} = require("hardhat");
const hre = require("hardhat");

const network_configs = {
    mumbai: {
    }, ethereum: {
    },
}

let config;

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the Assets contract to deploy

    if (hre.network.name === "mumbai") {
        config = network_configs.mumbai
    } else {
        config = network_configs.ethereum
    }

    console.log("Network:", hre.network.name);

    let [addr] = await ethers.getSigners();

    const name_1 = "name";
    const symbol = "symbol"

    // IERC6551Registry deploy
    const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
    const erc6551Registry = await ERC6551Registry.deploy();
    await erc6551Registry.waitForDeployment();
    const erc6551RegistryAddress = await erc6551Registry.getAddress();
    console.log("Registry deployed:", erc6551RegistryAddress);

    // IERC6551Registry deploy
    const ERC6551Account = await ethers.getContractFactory("ERC6551Account");
    const erc6551Account = await ERC6551Account.deploy();
    await erc6551Account.waitForDeployment();
    const erc6551AccountAddress = await erc6551Account.getAddress();
    console.log("Account deployed:", erc6551AccountAddress);

    // erc6551AccountImplementation = ethers.Wallet.createRandom().address; // Just a random address for testing
    const ERC6551NFT = await ethers.getContractFactory("ERC6551NFT");
    const erc6551NFT = await ERC6551NFT.deploy(name_1, symbol, erc6551RegistryAddress, erc6551AccountAddress);
    await erc6551NFT.waitForDeployment();
    const erc6551NFTAddress = await erc6551NFT.getAddress();
    console.log("NFT deployed");

    // verify the contracts
    await hre.run("verify:verify", {
        address: erc6551NFTAddress,
        constructorArguments: [name_1, symbol, erc6551RegistryAddress, erc6551AccountAddress],
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
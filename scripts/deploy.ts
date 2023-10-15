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

    const name_1 = "pocket";
    const symbol = "ERC721-token"

    // ERC6551Registry deploy
    //const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
    //const erc6551Registry = await ERC6551Registry.deploy();
    //await erc6551Registry.waitForDeployment();
    //const erc6551RegistryAddress = await erc6551Registry.getAddress();
    //console.log("Registry deployed:", erc6551RegistryAddress);

    // Pocket account deploy
    const PocketAccount = await ethers.getContractFactory("VIPCardAccount");
    const pocketAccount = await PocketAccount.deploy();
    await pocketAccount.waitForDeployment();
    const pocketAccountAddress = await pocketAccount.getAddress();
    console.log("pocket account deployed:", pocketAccountAddress);

    // Pocket deploy
    //const Pocket = await ethers.getContractFactory("Pocket");
    //const pocket = await Pocket.deploy(name_1, symbol, erc6551RegistryAddress, pocketAccountAddress);
    //await pocket.waitForDeployment();
    //const pocketAddress = await pocket.getAddress();
    //console.log("pocket deployed:", pocketAddress);

    // verify the contracts
    //await hre.run("verify:verify", {
    //    address: pocketAddress,
    //    constructorArguments: [name_1, symbol, erc6551RegistryAddress, pocketAccountAddress],
    //});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC6551NFT", function () {
    let ERC6551NFT, erc6551NFT, addr1, addr2;
    let ERC6551Registry, erc6551Registry, ERC6551Account, erc6551Account;
    let IERC6551Registry, ierc6551Registry;
    let name_1, symbol;

    beforeEach(async function () {
        name_1 = "name";
        symbol = "symbol"

        // IERC6551Registry deploy
        ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
        erc6551Registry = await ERC6551Registry.deploy();
        await erc6551Registry.waitForDeployment();
        const erc6551RegistryAddress = await erc6551Registry.getAddress();
        console.log("Registry deployed:", erc6551RegistryAddress);

        // IERC6551Registry deploy
        ERC6551Account = await ethers.getContractFactory("ERC6551Account");
        erc6551Account = await ERC6551Account.deploy();
        await erc6551Account.waitForDeployment();
        const erc6551AccountAddress = await erc6551Account.getAddress();
        console.log("Account deployed:", erc6551AccountAddress);

        // erc6551AccountImplementation = ethers.Wallet.createRandom().address; // Just a random address for testing
        ERC6551NFT = await ethers.getContractFactory("ERC6551NFT");
        erc6551NFT = await ERC6551NFT.deploy(name_1, symbol, erc6551RegistryAddress, erc6551AccountAddress);
        await erc6551NFT.waitForDeployment();
        console.log("NFT deployed");

        [addr1, addr2] = await ethers.getSigners();
    });

    describe("mintWithAccount", function () {
        it("Should mint a new NFT and create an ERC6551 account", async function () {
            await expect(erc6551NFT.mintWithAccount(addr1.getAddress()))
                .to.emit(erc6551NFT, 'AccountCreated')
                .withArgs(1);
            expect(await erc6551NFT.ownerOf(1)).to.equal(addr1.getAddress());
        });
    });
});


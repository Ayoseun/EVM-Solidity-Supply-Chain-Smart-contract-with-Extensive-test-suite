// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("SwearITFactory", () => {
//   let swearITFactory;
//   let owner;
//   let contractName
//   let swearITContract;

//   beforeEach(async () => {
//     owner = await ethers.getSigners();
//     // Deploy the swearITFactory contract
//     const SwearITFactory = await ethers.getContractFactory("SwearITFactory");
//     swearITFactory = await SwearITFactory.deploy();
//   });




//   it("should create a new SwearIT contract", async () => {
//     // Create a new SwearIT contract
//      contractName = "Wines1840";
//     await swearITFactory.createSwearITContract(contractName);

//     // Verify that the contract was created
//      swearITContract = await swearITFactory.getSwearITContractByName(
//       contractName
//     );

//     expect(swearITContract.address).to.not.equal(0);
//     expect(swearITContract.address).to.equal();
//   });




//   it("should retrieve all deployed SwearIT contracts", async () => {
//     // Create multiple SwearIT contracts
//     await swearITFactory.createSwearITContract("Contract1");
//     await swearITFactory.createSwearITContract("Contract2");
//     await swearITFactory.createSwearITContract("Contract3");

//     // Retrieve all deployed SwearIT contracts
//     const { names, addresses } = await swearITFactory.getAllSwearITContracts();

//     // Verify that the retrieved data matches the created contracts
//     expect(names.length).to.equal(3);
//     expect(addresses.length).to.equal(3);
//     expect(names).to.include("Contract1");
//     expect(names).to.include("Contract2");
//     expect(names).to.include("Contract3");
//     expect(addresses[0]).to.not.equal(0);
//     expect(addresses[1]).to.not.equal(0);
//     expect(addresses[2]).to.not.equal(0);
//   });

//   it("should revert when getting a non-existent SwearIT contract", async () => {
//     // Try to retrieve a non-existent SwearIT contract
//     await expect(
//       swearITFactory.getSwearITContractByName("NonExistentContract")
//     ).to.be.revertedWith("Contract not found for the given name");
//   });
// });

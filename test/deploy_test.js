// Importing the necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describing the test suite for the SwearIT contract
describe("SwearIT Deploy Test", () => {
  // Declaring variables to hold the SwearIT contract instance, owner, and user
  let swearIT;
  let owner;
  let user;
  let contractName;
  let swearITContract;

  // Setting up the test environment before each test case
  beforeEach(async () => {
    // Getting the contract signers (owner and user)
    [owner, user] = await ethers.getSigners();

    // Deploying the SwearIT contract
    swearITContract = await ethers.getContractFactory("SwearIT");
    contractName = "Wines";
    swearIT = await swearITContract.deploy(contractName);
  });

  // Test case to check the SwearIT contract details
  it("should get SwearIT Wine contract details", async () => {
    // Getting the contract address, owner, and name
    const swearITAddress = await swearIT.target;
    const swearITOwner = await swearIT.connect(owner).owner();
    const swearITName = await swearIT.connect(owner).orgName();

    // Asserting the contract details
    expect(swearITAddress).to.not.equal(0);
    expect(swearITName).to.equal(contractName);
    expect(swearITOwner).to.equal(owner);
  });

  it("should allow the owner to transfer ownership", async function () {
    // Transfer ownership to user
    expect(await swearIT.connect(owner).transferOwnership(user.address))
      .to.emit(swearIT, "TransferredOwnership")
      .withArgs(owner, user);

   
    await expect(
      swearIT.connect(owner).transferOwnership(user.address)
    ).to.be.revertedWith("Only the current owner can perform this action");


    expect(await swearIT.connect(user).transferOwnership(owner.address))
      .to.emit(swearIT, "TransferredOwnership")
      .withArgs(owner, user);
  });
});

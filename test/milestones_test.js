// Importing the necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describing the test suite for the SwearIT contract
describe("SwearIT Product Milestone Test", () => {
  // Declaring variables to hold the SwearIT contract instance, owner, and user
  let swearIT;
  let owner;
  let user;
  let contractName;
  let swearITContract;

  //Product
  let product;
  const productId = 1;
  const productName = "Louis Roederer Collection 243";
  const createdAt = ethers.encodeBytes32String("2024-04-19T12:23:00Z");
  const organizationId = 1;
  const organizationName = "Louis Roederer";
  const productUrl = "https://www.louis-roederer.com/en/wine/collection";

  let milestone;
  const milestoneId = 1;
  const milestoneName = "Fetched Grapes";
  const milestoneCreatedAt = ethers.encodeBytes32String("2024-11-19T12:23:00Z");

  const milestone2Id = 2;
  const milestone2Name = "Used Sparkling Water";
  const milestone2CreatedAt = ethers.encodeBytes32String(
    "2025-01-29T02:53:10Z"
  );

  // Setting up the test environment before each test case
  beforeEach(async () => {
    // Getting the contract signers (owner and user)
    [owner, user] = await ethers.getSigners();

    // Deploying the SwearIT contract
    swearITContract = await ethers.getContractFactory("SwearIT");
    contractName = "Wines";
    swearIT = await swearITContract.deploy(contractName);
  });

  // Test case to check the saving of a new product
  it("should create a milestone for a product", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    // Getting the saved product using the getProductById function
    await expect(
      swearIT.createMilestone(
        productId,
        milestoneId,
        milestoneName,
        milestoneCreatedAt,
     
        1
      )
    )
      .to.emit(swearIT, "MilestoneCreated")
      .withArgs(
        productId,
        milestoneId,
        milestoneName,
        milestoneCreatedAt,
        1,
     
      );
  });

  it("should create multiple milestone for a product", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    // Getting the saved product using the getProductById function
    await expect(
      swearIT.createMilestone(
        productId,
        milestoneId,
        milestoneName,
        milestoneCreatedAt,
        1
      )
    )
      .to.emit(swearIT, "MilestoneCreated")
      .withArgs(
        productId,
        milestoneId,
        milestoneName,
        milestoneCreatedAt,
        1,
    
      );

    // Getting the saved product using the getProductById function
    await expect(
      swearIT.createMilestone(
        productId,
        milestone2Id,
        milestone2Name,
        milestone2CreatedAt,
        2
      )
    )
      .to.emit(swearIT, "MilestoneCreated")
      .withArgs(
        productId,
        milestone2Id,
        milestone2Name,
        milestone2CreatedAt,
        2,
       
      );
  });

  // Test case to check the saving of a new product
  it("should get a milestone by id", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );

    // Getting the saved product using the getProductById function
    product = await swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    // Getting the saved product using the getProductById function
    milestone = await swearIT.getMilestoneById(milestoneId);
    // Asserting the product details
    expect(milestone.productId).to.equal(productId);
    expect(milestone.milestoneName).to.equal(milestoneName);
    expect(milestone.createdAt).to.equal(milestoneCreatedAt);
  });

  // Test case to check the saving of a new product
  it("should get all product milestone by productId", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    // Getting the saved product using the getProductById function
    await swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    // Getting the saved product using the getProductById function
    await swearIT.createMilestone(
      productId,
      milestone2Id,
      milestone2Name,
      milestone2CreatedAt,
      2
    );
    // // Getting the saved product using the getProductById function
    productMilestone = await swearIT.getProductMilestones(productId);

    expect(productMilestone.length).to.equal(2);
    //Asserting the product details
    expect(productMilestone[0].milestoneName).to.equal(milestoneName);
    expect(productMilestone[1].milestoneName).to.equal(milestone2Name);
    expect(productMilestone[1].createdAt).to.equal(milestone2CreatedAt);
  });


    // Test case to check the saving of a new product
  it("should get all product milestone by productId", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    // Getting the saved product using the getProductById function
    await swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    // Getting the saved product using the getProductById function
    await swearIT.createMilestone(
      productId,
      milestone2Id,
      milestone2Name,
      milestone2CreatedAt,
      2
    );
 

    await swearIT.setMilestoneCompletedById(milestoneId);

       // // Getting the saved product using the getProductById function
       productMilestone = await swearIT.getProductMilestones(productId);

       expect(productMilestone.length).to.equal(2);
    //Asserting the product details
    expect(productMilestone[0].milestoneName).to.equal(milestoneName);
    expect(productMilestone[1].milestoneName).to.equal(milestone2Name);
    expect(productMilestone[1].createdAt).to.equal(milestone2CreatedAt);
    expect(productMilestone[0].completed).to.equal(true);
    await expect(swearIT.setMilestoneCompletedById(milestoneId)).to.be.revertedWith("Milestone already set to completed");
  });


});

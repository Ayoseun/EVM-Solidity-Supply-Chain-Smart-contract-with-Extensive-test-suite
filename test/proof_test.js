// Importing the necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describing the test suite for the SwearIT contract
describe("SwearIT Milestone Proof Test", () => {
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

  let proofs;
  const proofId = 1;
  const proofName = "I was there";
  const evidences = '["pasdfasdf", "asdfasdfosi"]';
  const conditions =
    '[{ "type":"Temperatura", "value":"32", "unit":"ºC" }, { "type":"Tiempo", "value":"27", "unit":"segundos"}]';
  const proofCreatedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");
  const userId = 1;

  const proof2Id = 2;
  const proof2Name = "We did not use cocacola as water";
  const evidences2 = '["very good", "very good"]';
  const conditions2 =
    '[{ "type":"Temperatura", "value":"32", "unit":"ºC" }, { "type":"Tiempo", "value":"27", "unit":"segundos"}]';
  const proof2CreatedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");
  const user2Id = 2;

  let validation;
  const status = "OK";
  const verifierId = 1;
  const verifierName = "Julie Alvero Munsad";
  const verifiedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");

  const status2 = "OK";
  const verifier2Id = 1;
  const verifier2Name = "Luis Alvero Munsad";
  const verifiedAt2 = ethers.encodeBytes32String("2024-06-29T12:23:00Z");

  // Setting up the test environment before each test case
  beforeEach(async () => {
    // Getting the contract signers (owner and user)
    [owner, user] = await ethers.getSigners();

    // Deploying the SwearIT contract
    swearITContract = await ethers.getContractFactory("SwearIT");
    contractName = "Wines";
    swearIT = await swearITContract.deploy(contractName);
  });

  /**
   * @dev This test case is for testing that a proof is been succesfully created for a milestone
   * 
   */
  it("should create a proof for a milestone", async function () {
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

    swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    // Getting the saved product using the getProductById function
    await expect(
      swearIT.createProof(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      );
  });

  it("should create multiple proof for a milestone", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    await expect(
      swearIT.createProof(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      );

    await expect(
      swearIT.createProof(
        proof2Id,
        milestoneId,
        proof2Name,
        organizationId,
        evidences2,
        conditions2,
        proof2CreatedAt,
        user2Id
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proof2Id,
        milestoneId,
        proof2Name,
        organizationId,
        evidences2,
        conditions2,
        proof2CreatedAt,
        user2Id
      );
  });

  it("should create multiple proof for multiple milestone of a single product", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );
    swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    swearIT.createMilestone(
      productId,
      milestone2Id,
      milestone2Name,
      milestone2CreatedAt,
      2
    );

    await expect(
      swearIT.createProof(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      );

    await expect(
      swearIT.createProof(
        proof2Id,
        milestoneId,
        proof2Name,
        organizationId,
        evidences2,
        conditions2,
        proof2CreatedAt,
        user2Id
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proof2Id,
        milestoneId,
        proof2Name,
        organizationId,
        evidences2,
        conditions2,
        proof2CreatedAt,
        user2Id
      );

    await expect(
      swearIT.createProof(
        proofId,
        milestone2Id,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      )
    )
      .to.emit(swearIT, "ProofCreated")
      .withArgs(
        proofId,
        milestone2Id,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      );
  });

  // Test case to check the saving of a new product
  it("should get all proofs of a milestone", async function () {
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

    await swearIT.createProof(
      proofId,
      milestoneId,
      proofName,
      organizationId,
      evidences,
      conditions,
      proofCreatedAt,
      userId
    );

    await swearIT.createProof(
      proof2Id,
      milestoneId,
      proof2Name,
      organizationId,
      evidences2,
      conditions2,
      proof2CreatedAt,
      user2Id
    );
    // Getting the saved product using the getProductById function
    proofs = await swearIT.getAllMilestoneProofsById(milestoneId);

    expect;
  });

  // Test case to check the saving of a new product
  it("should get a product total proof counts", async function () {
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

    await swearIT.createProof(
      proofId,
      milestoneId,
      proofName,
      organizationId,
      evidences,
      conditions,
      proofCreatedAt,
      userId
    );

    await swearIT.createProof(
      proof2Id,
      milestoneId,
      proof2Name,
      organizationId,
      evidences2,
      conditions2,
      proof2CreatedAt,
      user2Id
    );
    // Getting the saved product using the getProductById function
    product = await swearIT.getProductById(productId);
    expect(product.proofCount).to.equal(2);
  });

  // Test case to check the saving of a new product
  it("should get a single milestone total proof counts", async function () {
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

    await swearIT.createProof(
      proofId,
      milestoneId,
      proofName,
      organizationId,
      evidences,
      conditions,
      proofCreatedAt,
      userId
    );

    await swearIT.createProof(
      proof2Id,
      milestoneId,
      proof2Name,
      organizationId,
      evidences2,
      conditions2,
      proof2CreatedAt,
      user2Id
    );
    // Getting the saved product using the getProductById function
    milestone = await swearIT.getMilestoneById(milestoneId);
    expect(milestone.proofCount).to.equal(2);
  });

  // Test case to check the saving of a new product
  it("should create a proof validation for a milestone", async function () {
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

    swearIT.createMilestone(
      productId,
      milestoneId,
      milestoneName,
      milestoneCreatedAt,
      1
    );

    // Getting the saved product using the getProductById function
    await swearIT.createProof(
      proofId,
      milestoneId,
      proofName,
      organizationId,
      evidences,
      conditions,
      proofCreatedAt,
      userId
    );

    await expect(
      swearIT.validateProof(
        proofId,
        productId,
        status,
        verifierId,
        verifierName,
        verifiedAt,
        userId
      )
    )
      .to.emit(swearIT, "ProofValidated")
      .withArgs(
        proofId,
        productId,
        status,
        verifierId,
        verifierName,
        verifiedAt,
        userId
      );
  });

  // Test case to check the saving of a new product
  it("should get a product total proof validations counts", async function () {
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

    await swearIT.createProof(
      proofId,
      milestoneId,
      proofName,
      organizationId,
      evidences,
      conditions,
      proofCreatedAt,
      userId
    );

    await swearIT.createProof(
      proof2Id,
      milestoneId,
      proof2Name,
      organizationId,
      evidences2,
      conditions2,
      proof2CreatedAt,
      user2Id
    );
    await swearIT.validateProof(
      proofId,
      productId,
      status,
      verifierId,
      verifierName,
      verifiedAt,
      userId
    );
    await swearIT.validateProof(
      proofId,
      productId,
      status2,
      verifier2Id,
      verifier2Name,
      verifiedAt2,
      userId
    );
    // Getting the saved product using the getProductById function
    product = await swearIT.getProductById(productId);
    expect(product.validatedProofsCount).to.equal(2);
  });

    // Test case to check the saving of a new product
    it("should get a milestone total proof validations counts", async function () {
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
  
      await swearIT.createProof(
        proofId,
        milestoneId,
        proofName,
        organizationId,
        evidences,
        conditions,
        proofCreatedAt,
        userId
      );
  
      await swearIT.createProof(
        proof2Id,
        milestoneId,
        proof2Name,
        organizationId,
        evidences2,
        conditions2,
        proof2CreatedAt,
        user2Id
      );
      await swearIT.validateProof(
        proofId,
        productId,
        status,
        verifierId,
        verifierName,
        verifiedAt,
        userId
      );
      await swearIT.validateProof(
        proofId,
        productId,
        status2,
        verifier2Id,
        verifier2Name,
        verifiedAt2,
        userId
      );
      // Getting the saved product using the getProductById function
      milestone = await swearIT.getMilestoneById(milestoneId);
      expect(milestone.proofCount).to.equal(2);
    });


    
});

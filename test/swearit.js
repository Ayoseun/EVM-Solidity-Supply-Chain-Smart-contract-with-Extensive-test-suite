// // Importing the necessary dependencies
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// // Describing the test suite for the SwearIT contract
// describe("SwearIT Test", () => {
//   // Declaring variables to hold the SwearIT contract instance, owner, and user
//   let swearIT;
//   let owner;
//   let user;
//   let contractName;
//   let swearITContract;

//   //Product
//   let product;

//   // Setting up the test environment before each test case
//   beforeEach(async () => {
//     // Getting the contract signers (owner and user)
//     [owner, user] = await ethers.getSigners();

//     // Deploying the SwearIT contract
//     swearITContract = await ethers.getContractFactory("SwearIT");
//     contractName = "Wines";
//     swearIT = await swearITContract.deploy(contractName);
//   });

//   // Test case to check the SwearIT contract details
//   it("should get SwearIT Wine contract details", async () => {
//     // Getting the contract address, owner, and name
//     const swearITAddress = await swearIT.address;
//     const swearITOwner = await swearIT.owner();
//     const swearITName = await swearIT.name();
//     console.log(`contract name is: ${swearITName}`);
//     // Asserting the contract details
//     expect(swearITAddress).to.not.equal(0);
//     expect(swearITName).to.equal(contractName);
//     expect(swearITOwner).to.equal(owner);
//   });

//   // Test case to check the saving of a new product
//   it("should save a new product", async function () {
//     // Defining the product details
//     const productId = 1;
//     const productName = "Test Product";
//     const createdAt = ethers.encodeBytes32String("2023-04-08");
//     const organizationId = 1;
//     const organizationName = "Test Organization";
//     const productUrl = "https://example.com/test-product";
//     const userId = 1;

//     // Saving the product using the saveProduct function
//     await swearIT.saveProduct(
//       productId,
//       productName,
//       createdAt,
//       organizationId,
//       organizationName,
//       productUrl,
//       userId
//     );

//     // Getting the saved product using the getProductById function
//     product = await swearIT.getProductById(productId);
//     console.log(product);
//     // Asserting the product details
//     expect(product.productId).to.equal(productId);
//     expect(product.productName).to.equal(productName);
//     expect(product.createdAt).to.equal(createdAt);
//     expect(product.organizationId).to.equal(organizationId);
//     expect(product.organizationName).to.equal(organizationName);
//     expect(product.productUrl).to.equal(productUrl);
//     expect(product.userId).to.equal(userId);
//   });

//   it("it should get all public variables", async () => {
//     const productCount = await swearIT.productCount();
//     const lotCount = await swearIT.lotCount();
//     const milestoneCount = await swearIT.milestoneCount();
//     const proofCount = await swearIT.proofCount();
//     console.log(productCount);
//   });

//   it("it should transfer contract ownership", async () => {
//     await swearIT.connect(owner).transferOwnership(user);
//     const swearITOwner = await swearIT.owner();
//     expect(swearITOwner).to.equal(user);
//   });
//   // Test case to check the saving of a new milestone
//   it("should save a new milestone", async function () {
//     // Defining the product details
//     const productId = 1;
//     const milestoneId = ethers.encodeBytes32String("2023-04-10");
//     const milestoneName = "Test Milestone";
//     const createdAt = ethers.encodeBytes32String("2023-04-10");
//     const userId = 1;

//     // First, we need to save a product before we can save a milestone
//     await swearIT.saveProduct(
//       productId,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     // Saving the milestone using the saveMilestone function
//     await swearIT.saveMilestone(
//       productId,
//       milestoneId,
//       milestoneName,
//       createdAt,
//       userId
//     );

//     // Getting the saved milestone using the getMilestoneById function
//     const milestone = await swearIT.getMilestoneById(milestoneId);

//     // Asserting the milestone details
//     expect(milestone.productId).to.equal(productId);
//     expect(milestone.milestoneId).to.equal(milestoneId);
//     expect(milestone.milestoneName).to.equal(milestoneName);
//     expect(milestone.createdAt).to.equal(createdAt);
//     expect(milestone.userId).to.equal(userId);
//   });

//   // Test case to check the saving of a new proof
//   it("should save a new proof", async function () {
//     // Defining the proof details
//     const proofId = 1;
//     const proofName = "Test Proof";
//     const productId = 1;
//     const organizationId = 1;
//     const evidences = [
//       "https://example.com/evidence1",
//       "https://example.com/evidence2",
//     ];
//     const conditions = "Test conditions";
//     const milestoneId = ethers.encodeBytes32String("2023-04-10");
//     const createdAt = ethers.encodeBytes32String("2023-04-10");
//     const userId = 1;

//     // First, we need to save a product and a milestone before we can save a proof
//     await swearIT.saveProduct(
//       productId,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     await swearIT.saveMilestone(
//       productId,
//       milestoneId,
//       "Test Milestone",
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     // Saving the proof using the saveProof function
//     await swearIT.saveProof(
//       proofId,
//       proofName,
//       productId,
//       organizationId,
//       evidences,
//       conditions,
//       milestoneId,
//       createdAt,
//       userId
//     );

//     // Getting the saved proof using the getProofById function
//     const proof = await swearIT.getProofById(proofId);

//     // Asserting the proof details
//     expect(proof.proofId).to.equal(proofId);
//     expect(proof.proofName).to.equal(proofName);
//     expect(proof.productId).to.equal(productId);
//     expect(proof.organizationId).to.equal(organizationId);
//     expect(proof.evidences).to.eql(evidences);
//     expect(proof.conditions).to.equal(conditions);
//     expect(proof.milestoneId).to.equal(milestoneId);
//     expect(proof.createdAt).to.equal(createdAt);
//     expect(proof.userId).to.equal(userId);
//   });

//   // Test case to check the saving of a new proof validation
//   it("should save a new proof validation", async function () {
//     // Defining the proof details
//     const proofId = 1;
//     const verifierId = 1;
//     const verifierName = "Test Verifier";
//     const verifiedAt = ethers.encodeBytes32String("2023-04-11");
//     const userId = 1;

//     // First, we need to save a product, milestone, and proof before we can save a proof validation
//     await swearIT.saveProduct(
//       1,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     await swearIT.saveMilestone(
//       1,
//       ethers.encodeBytes32String("2023-04-10"),
//       "Test Milestone",
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     await swearIT.saveProof(
//       proofId,
//       "Test Proof",
//       1,
//       1,
//       ["https://example.com/evidence1", "https://example.com/evidence2"],
//       "Test conditions",
//       ethers.encodeBytes32String("2023-04-10"),
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     // Saving the proof validation using the saveProofValidation function
//     await swearIT.saveProofValidation(
//       proofId,
//       verifierId,
//       verifierName,
//       verifiedAt,
//       userId
//     );

//     // Getting the saved proof validation using the getProofHistory function
//     const proofValidationHistory = await swearIT.getProofHistory(proofId);

//     // Asserting the proof validation details
//     expect(proofValidationHistory.length).to.equal(1);
//     expect(proofValidationHistory[0].verifierId).to.equal(verifierId);
//     expect(proofValidationHistory[0].verifierName).to.equal(verifierName);
//     expect(proofValidationHistory[0].verifiedAt).to.equal(verifiedAt);
//     expect(proofValidationHistory[0].userId).to.equal(userId);
//   });

//   // Test case to check the retrieval of a product by ID
//   it("should get a product by ID", async () => {
//     // Defining the product details
//     const productId = 1;
//     const productName = "Test Product";
//     const createdAt = ethers.encodeBytes32String("2023-04-08");
//     const organizationId = 1;
//     const organizationName = "Test Organization";
//     const productUrl = "https://example.com/test-product";
//     const userId = 1;

//     // Saving the product
//     await swearIT.saveProduct(
//       productId,
//       productName,
//       createdAt,
//       organizationId,
//       organizationName,
//       productUrl,
//       userId
//     );

//     // Getting the product by ID
//     const product = await swearIT.getProductById(productId);

//     // Asserting the product details
//     expect(product.productId).to.equal(productId);
//     expect(product.productName).to.equal(productName);
//     expect(product.createdAt).to.equal(createdAt);
//     expect(product.organizationId).to.equal(organizationId);
//     expect(product.organizationName).to.equal(organizationName);
//     expect(product.productUrl).to.equal(productUrl);
//     expect(product.userId).to.equal(userId);
//   });

//   // Test case to check the retrieval of a lot by ID
//   it("should get a lot by ID", async () => {
//     // Defining the product and lot details
//     const productId = 1;
//     const productLotId = ethers.encodeBytes32String("2023-04-09");
//     const productLotName = "Test Lot";
//     const createdAt = ethers.encodeBytes32String("2023-04-09");
//     const userId = 1;

//     // First, save a product
//     await swearIT.saveProduct(
//       productId,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     // Save the lot
//     await swearIT.saveLot(
//       productId,
//       productLotId,
//       productLotName,
//       createdAt,
//       userId
//     );

//     // Get the lot by ID
//     const lot = await swearIT.getLotById(productLotId);

//     // Asserting the lot details
//     expect(lot.productId).to.equal(productId);
//     expect(lot.productLotId).to.equal(productLotId);
//     expect(lot.productLotName).to.equal(productLotName);
//     expect(lot.createdAt).to.equal(createdAt);
//     expect(lot.userId).to.equal(userId);
//   });

//   // Test case to check the retrieval of a milestone by ID
//   it("should get a milestone by ID", async () => {
//     // Defining the product and milestone details
//     const productId = 1;
//     const milestoneId = ethers.encodeBytes32String("2023-04-10");
//     const milestoneName = "Test Milestone";
//     const createdAt = ethers.encodeBytes32String("2023-04-10");
//     const userId = 1;

//     // First, save a product
//     await swearIT.saveProduct(
//       productId,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     // Save the milestone
//     await swearIT.saveMilestone(
//       productId,
//       milestoneId,
//       milestoneName,
//       createdAt,
//       userId
//     );

//     // Get the milestone by ID
//     const milestone = await swearIT.getMilestoneById(milestoneId);

//     // Asserting the milestone details
//     expect(milestone.productId).to.equal(productId);
//     expect(milestone.milestoneId).to.equal(milestoneId);
//     expect(milestone.milestoneName).to.equal(milestoneName);
//     expect(milestone.createdAt).to.equal(createdAt);
//     expect(milestone.userId).to.equal(userId);
//   });

//   // Test case to check the retrieval of a proof by ID
//   it("should get a proof by ID", async () => {
//     // Defining the proof details
//     const proofId = 1;
//     const proofName = "Test Proof";
//     const productId = 1;
//     const organizationId = 1;
//     const evidences = [
//       "https://example.com/evidence1",
//       "https://example.com/evidence2",
//     ];
//     const conditions = "Test conditions";
//     const milestoneId = ethers.encodeBytes32String("2023-04-10");
//     const createdAt = ethers.encodeBytes32String("2023-04-10");
//     const userId = 1;

//     // First, save a product and a milestone
//     await swearIT.saveProduct(
//       productId,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     await swearIT.saveMilestone(
//       productId,
//       milestoneId,
//       "Test Milestone",
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     // Save the proof
//     await swearIT.saveProof(
//       proofId,
//       proofName,
//       productId,
//       organizationId,
//       evidences,
//       conditions,
//       milestoneId,
//       createdAt,
//       userId
//     );

//     // Get the proof by ID
//     const proof = await swearIT.getProofById(proofId);

//     // Asserting the proof details
//     expect(proof.proofId).to.equal(proofId);
//     expect(proof.proofName).to.equal(proofName);
//     expect(proof.productId).to.equal(productId);
//     expect(proof.organizationId).to.equal(organizationId);
//     expect(proof.evidences).to.eql(evidences);
//     expect(proof.conditions).to.equal(conditions);
//     expect(proof.milestoneId).to.equal(milestoneId);
//     expect(proof.createdAt).to.equal(createdAt);
//     expect(proof.userId).to.equal(userId);
//   });

//   // Test case to check the retrieval of the proof history
//   it("should get the proof history", async () => {
//     // Defining the proof and validation details
//     const proofId = 1;
//     const verifierId1 = 1;
//     const verifierName1 = "Test Verifier 1";
//     const verifiedAt1 = ethers.encodeBytes32String("2023-04-11");
//     const userId1 = 1;

//     const verifierId2 = 2;
//     const verifierName2 = "Test Verifier 2";
//     const verifiedAt2 = ethers.encodeBytes32String("2023-04-12");
//     const userId2 = 2;

//     // First, save a product, milestone, and proof
//     await swearIT.saveProduct(
//       1,
//       "Test Product",
//       ethers.encodeBytes32String("2023-04-08"),
//       1,
//       "Test Organization",
//       "https://example.com/test-product",
//       1
//     );

//     await swearIT.saveMilestone(
//       1,
//       ethers.encodeBytes32String("2023-04-10"),
//       "Test Milestone",
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     await swearIT.saveProof(
//       proofId,
//       "Test Proof",
//       1,
//       1,
//       ["https://example.com/evidence1", "https://example.com/evidence2"],
//       "Test conditions",
//       ethers.encodeBytes32String("2023-04-10"),
//       ethers.encodeBytes32String("2023-04-10"),
//       1
//     );

//     // Save the proof validations
//     await swearIT.saveProofValidation(
//       proofId,
//       verifierId1,
//       verifierName1,
//       verifiedAt1,
//       userId1
//     );

//     await swearIT.saveProofValidation(
//       proofId,
//       verifierId2,
//       verifierName2,
//       verifiedAt2,
//       userId2
//     );

//     // Get the proof history
//     const proofHistory = await swearIT.getProofHistory(proofId);

//     // Asserting the proof history
//     expect(proofHistory.length).to.equal(2);
//     expect(proofHistory[0].verifierId).to.equal(verifierId1);
//     expect(proofHistory[0].verifierName).to.equal(verifierName1);
//     expect(proofHistory[0].verifiedAt).to.equal(verifiedAt1);
//     expect(proofHistory[0].userId).to.equal(userId1);
//     expect(proofHistory[1].verifierId).to.equal(verifierId2);
//     expect(proofHistory[1].verifierName).to.equal(verifierName2);
//     expect(proofHistory[1].verifiedAt).to.equal(verifiedAt2);
//     expect(proofHistory[1].userId).to.equal(userId2);
//   });
// });

// Importing the necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

// Describing the test suite for the SwearIT contract
describe("SwearIT Products Test", () => {
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

  const product2Id = 2;
  const product2Name = "Chateau Pignon";
  const createdAt2 = ethers.encodeBytes32String("2024-25-19T16:23:00Z");
  const organization2Id = 1;
  const organization2Name = "Borie-Manoux";
  const product2Url =
    "https://www.borie-manoux.com/les-vins/#Les%20exclusivit%C3%A9s%20Borie-Manoux";

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
  it("should create a new product", async function () {
    await expect(
      swearIT.createProduct(
        productId,
        productName,
        createdAt,
        organizationId,
        organizationName,
        productUrl
      )
    )
      .to.emit(swearIT, "ProductCreated")
      .withArgs(
        productId,
        productName,
        createdAt,
        organizationId,
        organizationName,
        productUrl
      );
  });

  it("should create multiple products", async function () {
    // Saving the product using the saveProduct function
    await expect( swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    ) ).to.emit(swearIT, "ProductCreated")
    .withArgs(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );

    await expect( swearIT.createProduct(
      product2Id,
      product2Name,
      createdAt2,
      organization2Id,
      organization2Name,
      product2Url
    )).to.emit(swearIT, "ProductCreated")
    .withArgs(
      product2Id,
      product2Name,
      createdAt2,
      organization2Id,
      organization2Name,
      product2Url
    );


  });

  it("should get products by product id", async function () {
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
    product = await swearIT.getProductById(productId);
    // Asserting the product details
    expect(product.productId).to.equal(productId);
    expect(product.productName).to.equal(productName);
    expect(product.createdAt).to.equal(createdAt);
    expect(product.organizationId).to.equal(organizationId);
    expect(product.organizationName).to.equal(organizationName);
    expect(product.productUrl).to.equal(productUrl);
  });

  it("should revert if product id is wrong", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    );

    // Asserting the product details
    await expect(swearIT.getProductById(2)).to.be.revertedWith(
      "Product does not exist"
    );
  });

  it("should get all products", async function () {
    // Saving the product using the saveProduct function
    await swearIT.createProduct(
      productId,
      productName,
      createdAt,
      organizationId,
      organizationName,
      productUrl
    ) ;

    await  swearIT.createProduct(
      product2Id,
      product2Name,
      createdAt2,
      organization2Id,
      organization2Name,
      product2Url
    );

    // Getting the saved product using the getProductById function
    product = await swearIT.getAllProducts();
    // Asserting the product details
    expect(product[0].productId).to.equal(productId);
    expect(product[0].productName).to.equal(productName);
    expect(product[0].createdAt).to.equal(createdAt);
    expect(product[0].organizationId).to.equal(organizationId);
    expect(product[0].organizationName).to.equal(organizationName);
    expect(product[0].productUrl).to.equal(productUrl);

    // Asserting the product details
    expect(product[1].productId).to.equal(product2Id);
    expect(product[1].productName).to.equal(product2Name);
    expect(product[1].createdAt).to.equal(createdAt2);
    expect(product[1].organizationId).to.equal(organization2Id);
    expect(product[1].organizationName).to.equal(organization2Name);
    expect(product[1].productUrl).to.equal(product2Url);
  });
});

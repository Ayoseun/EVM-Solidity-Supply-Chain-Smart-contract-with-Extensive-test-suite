# EVM-Solidity-Supply-Chain-Smart-contract-with-Extensive-test-suite
This repo is a supply chain smart contract written in solidity with an extensive test suite to cover, product creation, milestones, proof points and proof validtaions. Battle tested and production ready for you to integrate.



## Contracts

The main contract file is `contracts/swearit.sol`, which is a supply chain validation contract implemented using Solidity. It inherits from a custom `ISWEARIT` interface that provides additional functionalities, it uses factoty .

## Hardhat Configuration

The Hardhat configuration file is `hardhat.config.js`. It includes settings for the Solidity compiler, networks, and any additional plugins used in the project. Environment variables are managed using the `dotenv` package.

## Setup

1. **Install Dependencies:**

   ``` bash
   npm install

   ```

## Create Environment Variables:

Create a .env file in the project root with the following content:

```bash
PRIVATE_KEY="your private key "
ALCHEMY_API_KEY="your Alchemy API key here"
```
Replace the placeholder values with your actual Ethereum wallet mnemonic and Infura API key.

## Compile Contracts:

```bash
npx hardhat compile
```

## Run test

```bash
npx hardhat test
```

## Deployment
To deploy the Answerly token contract:

```bash
 npx hardhat run scripts/deploy.js --network amoy
```
Make sure you have the Hardhat node running (npx hardhat node) if deploying to the local network.

To verify run this command

```shell
npx hardhat verify --network amoy  <Contract Address>
```

this comand takes the nertwork, contract address and the time of deployment.


# Technical Documentation From ChainCode

## Overview
This technical documentation provides a comprehensive overview of a Hyperledger Fabric chaincode implemented in the Go programming language. The chaincode facilitates the management of products, lots, milestones, proofs, and their validations on a blockchain network.

## Data Structures
- **Product**: Represents a product entity with attributes such as ProductID, ProductName, OrganizationID, OrganizationName, etc.
- **Lot**: Defines a lot associated with a product, containing attributes such as ProductID, ProductName, ProductLotID, etc.
- **Milestone**: Represents a milestone achieved by a product, containing attributes like ProductID, MilestoneID, MilestoneName, etc.
- **ProofCondition**: Describes conditions associated with a proof, including Type, Value, and Unit.
- **Proof**: Represents a proof associated with a product, containing attributes like ProofID, OrganizationID, ProductID, Evidences, Conditions, etc.
- **ProofValidation**: Represents the validation of a proof, containing attributes like ProofID, Status, VerifiedAt, etc.
- **LotValidationQuery**: Defines a query structure for retrieving lot validations by ProductID and ProductLotID.
- **ProofTrx**: Represents a proof along with its transaction ID.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

// This is an interface for the SwearIT contract, which provides functions for managing products, lots, milestones, and proofs.
interface ISwearIT {
    // This struct represents a product, which has the following properties:
    // - productId: a unique identifier for the product
    // - productName: the name of the product
    // - createdAt: the timestamp when the product was created
    // - organizationId: the ID of the organization that created the product
    // - organizationName: the name of the organization that created the product
    // - productUrl: a URL for the product
    // - userId: the ID of the user who created the product
    struct Product {
        uint256 productId;
        string productName;
        bytes32 createdAt;
        uint256 organizationId;
        string organizationName;
        string productUrl;
        uint256 userId;
    }

    // This struct represents a lot, which has the following properties:
    // - productId: the ID of the product the lot is associated with
    // - productLotId: a unique identifier for the lot
    // - productLotName: the name of the lot
    // - createdAt: the timestamp when the lot was created
    // - userId: the ID of the user who created the lot
    struct Lot {
        uint productId;
        bytes32 productLotId;
        string productLotName;
        bytes32 createdAt;
        uint userId;
    }

    // This struct represents a milestone, which has the following properties:
    // - productId: the ID of the product the milestone is associated with
    // - milestoneId: a unique identifier for the milestone
    // - milestoneName: the name of the milestone
    // - createdAt: the timestamp when the milestone was created
    // - userId: the ID of the user who created the milestone
    struct Milestone {
        uint productId;
        bytes32 milestoneId;
        string milestoneName;
        bytes32 createdAt;
        uint userId;
    }

    // This struct represents a proof, which has the following properties:
    // - proofId: a unique identifier for the proof
    // - proofName: the name of the proof
    // - productId: the ID of the product the proof is associated with
    // - organizationId: the ID of the organization that created the proof
    // - evidences: an array of evidence files associated with the proof
    // - conditions: the conditions under which the proof is valid
    // - milestoneId: the ID of the milestone the proof is associated with
    // - createdAt: the timestamp when the proof was created
    // - userId: the ID of the user who created the proof
    // - validations: a mapping of verifier IDs to proof validations
    // - validationCount: the number of validations for the proof
    struct Proof {
        uint proofId;
        string proofName;
        uint productId;
        uint organizationId;
        string[] evidences;
        string conditions;
        uint milestoneId;
        bytes32 createdAt;
        uint userId;
        mapping(uint => ProofValidation) validations;
        uint validationCount;
    }

    // This struct represents a proof validation, which has the following properties:
    // - verifierId: the ID of the verifier who validated the proof
    // - verifierName: the name of the verifier
    // - verifiedAt: the timestamp when the proof was verified
    // - userId: the ID of the user who created the proof validation
    struct ProofValidation {
        uint verifierId;
        string verifierName;
        bytes32 verifiedAt;
        uint userId;
    }

    // This event is emitted when a new product is saved.
    event ProductSaved(
        uint indexed productId,
        string productName,
        bytes32 createdAt,
        uint organizationId,
        string organizationName,
        string productUrl,
        uint userId
    );

    // This event is emitted when a new lot is saved.
    event LotSaved(
        uint indexed productId,
        bytes32 productLotId,
        string productLotName,
        bytes32 createdAt,
        uint userId
    );

    // This event is emitted when a new milestone is saved.
    event MilestoneSaved(
        uint indexed productId,
        bytes32 milestoneId,
        string milestoneName,
        bytes32 createdAt,
        uint userId
    );

    // This event is emitted when a new proof is saved.
    event ProofSaved(
        uint indexed proofId,
        string proofName,
        uint productId,
        uint organizationId,
        string[] evidences,
        string conditions,
        uint milestoneId,
        bytes32 createdAt,
        uint userId
    );

    // This event is emitted when a new proof validation is saved.
    event ProofValidationSaved(
        uint indexed proofId,
        uint validationIndex,
        uint verifierId,
        string verifierName,
        bytes32 verifiedAt,
        uint userId
    );
}
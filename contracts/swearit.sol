// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SwearIT {
    struct Product {
        uint256 productId;
        string productName;
        bytes32 createdAt;
        uint256 organizationId;
        string organizationName;
        string productUrl;
        uint256 milestoneCount;
        uint256 proofCount;
        uint256 validatedProofsCount;
    }

    struct Milestone {
        uint256 productId;
        uint256 milestoneId;
        string milestoneName;
        bytes32 createdAt;
        uint256 userId;
        bool completed;
        uint256 proofCount;
    }

    struct Proof {
        uint256 proofId;
        uint256 milestoneId;
        string proofName;
        uint256 organizationId;
        string evidences;
        string conditions;
        bytes32 createdAt;
        uint256 userId;
        uint256 validationsCount;
    }

    struct ProofValidation {
        uint256 proofId;
        uint256 productId;
        string status;
        uint256 verifierId;
        string verifierName;
        bytes32 verifiedAt;
        uint256 userId;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => Proof) public proofs;
    mapping(uint256 => ProofValidation) public proofValidations;

    address public owner;
    string public orgName;

    // Add an array to keep track of product IDs
    uint256[] public productIds;
    uint256[] public milestoneIds;
    uint256[] public proofIds;

    //EVENTS
    event TransferredOwnership(address owner, address newOwner);
    event ProductCreated(
        uint indexed productId,
        string productName,
        bytes32 createdAt,
        uint organizationId,
        string organizationName,
        string productUrl
    );

    // This event is emitted when a new milestone is saved.
    event MilestoneCreated(
        uint indexed productId,
        uint256 milestoneId,
        string milestoneName,
        bytes32 createdAt,
        uint userId
    );

    event ProofCreated(
        uint256 indexed proofId,
        uint256 milestoneId,
        string proofName,
        uint256 organizationId,
        string evidences,
        string conditions,
        bytes32 createdAt,
        uint256 userId
    );
    event ProofValidated(
        uint256 indexed proofId,
        uint256 productId,
        string status,
        uint256 verifierId,
        string verifierName,
        bytes32 verifiedAt,
        uint256 userId
    );

    constructor(string memory _name) {
        owner = msg.sender;
        orgName = _name;
    }

    modifier transferOwner() {
        require(
            owner == msg.sender,
            "Only the current owner can perform this action"
        );
        _;
    }

    function createProduct(
        uint256 _productId,
        string memory _productName,
        bytes32 _createdAt,
        uint256 _organizationId,
        string memory _organizationName,
        string memory _productUrl
    ) public {
        products[_productId] = Product(
            _productId,
            _productName,
            _createdAt,
            _organizationId,
            _organizationName,
            _productUrl,
            0,
            0,
            0
        );

        // Add product ID to the array
        productIds.push(_productId);

        emit ProductCreated(
            _productId,
            _productName,
            _createdAt,
            _organizationId,
            _organizationName,
            _productUrl
        );
    }

    function createMilestone(
        uint256 _productId,
        uint256 _milestoneId,
        string memory _milestoneName,
        bytes32 _createdAt,
        uint256 _userId
    ) public {
        require(
            products[_productId].productId == _productId,
            "Product does not exist"
        );

        milestones[_milestoneId] = Milestone(
            _productId,
            _milestoneId,
            _milestoneName,
            _createdAt,
            _userId,
            false,
            0
        );
        milestoneIds.push(_milestoneId);
        emit MilestoneCreated(
            _productId,
            _milestoneId,
            _milestoneName,
            _createdAt,
            _userId
        );
    }

    function createProof(
        uint256 _proofId,
        uint256 _milestoneId,
        string memory _proofName,
        uint256 _organizationId,
        string memory _evidences,
        string memory _conditions,
        bytes32 _createdAt,
        uint256 _userId
    ) public {
        require(
            milestones[_milestoneId].milestoneId == _milestoneId,
            "Milestone does not exist"
        );
       
        proofs[_proofId] = Proof(
            _proofId,
            _milestoneId,
            _proofName,
            _organizationId,
            _evidences,
            _conditions,
            _createdAt,
            _userId,
            0
        );
        proofs[_proofId].validationsCount++;
        proofIds.push(_proofId);
        products[milestones[_milestoneId].productId].proofCount++;
        milestones[_milestoneId].proofCount++;

        emit ProofCreated(
            _proofId,
            _milestoneId,
            _proofName,
            _organizationId,
            _evidences,
            _conditions,
            _createdAt,
            _userId
        );
    }

    function validateProof(
        uint256 _proofId,
        uint256 _productId,
        string memory _status,
        uint256 _verifierId,
        string memory _verifierName,
        bytes32 _verifiedAt,
        uint256 _userId
    ) public {
        require(proofs[_proofId].proofId == _proofId, "Proof does not exist");

        proofValidations[_proofId] = ProofValidation(
            _proofId,
            _productId,
            _status,
            _verifierId,
            _verifierName,
            _verifiedAt,
            _userId
        );

        if (keccak256(bytes(_status)) == keccak256(bytes("OK"))) {
            products[_productId].validatedProofsCount++;
            proofs[_proofId].validationsCount++;
        }

        emit ProofValidated(
            _proofId,
            _productId,
            _status,
            _verifierId,
            _verifierName,
            _verifiedAt,
            _userId
        );
    }

    function getProductById(
        uint256 _productId
    ) public view returns (Product memory) {
        require(
            products[_productId].productId == _productId,
            "Product does not exist"
        );

        return products[_productId];
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productIds.length);

        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }

        return allProducts;
    }

    function getMilestoneById(
        uint256 _milestoneId
    ) public view returns (Milestone memory) {
        require(
            milestones[_milestoneId].milestoneId == _milestoneId,
            "Milestone does not exist"
        );
        return milestones[_milestoneId];
    }

    function setMilestoneCompletedById(
        uint256 _milestoneId
    ) public returns (Milestone memory) {
        require(
            milestones[_milestoneId].milestoneId == _milestoneId,
            "Milestone does not exist"
        );
        require(
            milestones[_milestoneId].completed==false,
            "Milestone already set to completed"
        );
        milestones[_milestoneId].completed=true;
        return milestones[_milestoneId];
    }

    function getProductMilestones(
        uint256 _productId
    ) public view returns (Milestone[] memory) {
        require(
            products[_productId].productId == _productId,
            "Product does not exist"
        );

        Milestone[] memory productMilestones = new Milestone[](
            milestoneIds.length
        );
        uint256 count = 0;

        for (uint256 i = 0; i < milestoneIds.length; i++) {
            if (milestones[milestoneIds[i]].productId == _productId) {
                productMilestones[count] = milestones[milestoneIds[i]];
                count++;
            }
        }

        // Create a new array with the correct size
        Milestone[] memory result = new Milestone[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = productMilestones[i];
        }

        return result;
    }

    function getAllMilestoneProofsById(
        uint256 _milestoneId
    ) public view returns (Proof[] memory) {
        require(
            milestones[_milestoneId].milestoneId == _milestoneId,
            "Milestone does not exist"
        );

        Proof[] memory milestonesProof = new Proof[](
            proofIds.length
        );
        uint256 count = 0;

        for (uint256 i = 0; i < proofIds.length; i++) {
            if (proofs[proofIds[i]].milestoneId == _milestoneId) {
                milestonesProof[count] = proofs[proofIds[i]];
                count++;
            }
        }

        // Create a new array with the correct size
        Proof[] memory result = new Proof[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = milestonesProof[i];
        }

        return result;
    }

    function getMilestoneProofById(
        uint256 _proofId
    ) public view returns (Proof memory) {
        require(
            proofs[_proofId].proofId == _proofId,
            "Milestone does not exist"
        );
        return proofs[_proofId];
    }

    function transferOwnership(address _newOwner) public transferOwner {
        owner = _newOwner;

        emit TransferredOwnership(owner, _newOwner);
    }
}

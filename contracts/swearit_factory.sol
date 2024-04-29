// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./swearit.sol";

/**
 * @title FactorySwearIT
 * @dev A contract that manages the creation and retrieval of SwearIT contracts.
 */
contract SwearITFactory {
    // Mapping to store the relationship between contract names and their addresses
    mapping(string => address) private _swearITContracts;

    // Array to store the names of the deployed SwearIT contracts
    string[] private _contractNames;

    constructor(){
        
    }

    /**
     * @dev Creates a new SwearIT contract and adds it to the _swearITContracts mapping.
     * @param name The name of the new SwearIT contract.
     * @return newSwearITContract The newly created SwearIT contract instance.
     */
    function createSwearITContract(
        string memory name
    ) public returns (SwearIT newSwearITContract) {
        // Deploy a new SwearIT contract
        newSwearITContract = new SwearIT(name);

        // Add the new contract to the _swearITContracts mapping
        _swearITContracts[name] = address(newSwearITContract);

        // Add the contract name to the _contractNames array
        _contractNames.push(name);
    }

    /**
     * @dev Retrieves the SwearIT contract instance by name.
     * @param name The name of the SwearIT contract to retrieve.
     * @return The SwearIT contract instance with the specified name.
     */
    function getSwearITContractByName(
        string memory name
    ) public view returns (SwearIT) {
        // Retrieve the contract address from the _swearITContracts mapping
        address contractAddress = _swearITContracts[name];

        // Ensure the contract address is valid
        require(
            contractAddress != address(0),
            "Contract not found for the given name"
        );

        // Return the SwearIT contract instance with the specified name
        return SwearIT(contractAddress);
    }

    /**
     * @dev Retrieves the names and addresses of all deployed SwearIT contracts.
     * @return names The array of SwearIT contract names.
     * @return addresses The array of SwearIT contract addresses.
     */
    function getAllSwearITContracts()
        public
        view
        returns (string[] memory names, address[] memory addresses)
    {
        // Get the number of deployed SwearIT contracts
        uint256 length = _contractNames.length;

        // Initialize the names and addresses arrays
        names = new string[](length);
        addresses = new address[](length);

        // Iterate through the _contractNames array and populate the names and addresses arrays
        for (uint256 i = 0; i < length; i++) {
            string memory name = _contractNames[i];
            names[i] = name;
            addresses[i] = _swearITContracts[name];
        }

        // Return the names and addresses arrays
        return (names, addresses);
    }
}
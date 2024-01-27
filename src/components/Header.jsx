import React, { useEffect, useState } from "react";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import Web3 from 'web3';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [web3, setweb3] = useState(null);
  const [contract, setContract] = useState(null);

  const toggleExpanded = () =>
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);

  const [WalletAddress, setWalletAddress] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  /*  const handleClick = async () => {
     if (window.ethereum) {
       console.log("detected");
 
       try {
         const accounts = await window.ethereum.request({
           method: "eth_requestAccounts",
         });
         setWalletAddress(accounts[0]);
         console.log("accounts[0]", accounts[0]);
       } catch (error) {
         console.log("Error connecting...");
       }
     } else {
       alert("Meta Mask not detected");
     }
   }; */
  const handleClick = async () => {
    if (window.ethereum) {
      const newWeb3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // Request account access
      setweb3(newWeb3);

      const accounts = await newWeb3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      console.log("Dfcsdfcd", accounts[0])
      // Replace 'YourContractABI' and 'YourContractAddress' with actual values
      const contractAddress = "0xbC7D7244ea7AFd47C049fA459902eC002b5409FA"; // Use the actual contract address
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "userName",
              "type": "string"
            }
          ],
          "name": "addUserProfile",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            }
          ],
          "name": "getUserProfile",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "userName",
                  "type": "string"
                }
              ],
              "internalType": "struct UserProfileContract.UserProfile",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "userProfiles",
          "outputs": [
            {
              "internalType": "string",
              "name": "userName",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      var newContract = new newWeb3.eth.Contract(contractABI, "0xe191f8A600EcdA5eEA95c8eF3bc4e8090e44fe19");
      setContract(newContract);

      try {
        // Call the getUserProfile function from the smart contract
        console.log('newContract', newContract);
        const result = await newContract.methods.getUserProfile("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4").call();

        // Update the state with the fetched user profile
        setUserProfile(result);
        const userName = result[0];
        console.log('User Name:', userName);

        console.log('User Profile:', result);

      } catch (error) {
        console.log('Error fetching user profile:', error);
      }



    } else {
      console.error('Web3 not found. Please install a wallet like MetaMask.');
    }
  };

  /*  useEffect(() => {
     console.log("newContract", contract)
     const result = contract.methods.getUserProfile(WalletAddress).call();
 
     // Update the state with the fetched user profile
     setUserProfile(result);
     console.log('User Profile:', result);
   }, [contract]) */


  return (
    <>
      <div className="header-container">
        <div className="logo">TOKSWAP</div>
        <div className="menu">
          <div className="menu-links">
            <a href="/">App</a>
            <a href="/">Products</a>
            <a href="/">Build</a>
            <a href="/">Careers</a>
            <a href="/">About</a>
          </div>
        </div>
        {WalletAddress == null ? (
          <div className="wallet-btn">
            <button className="btn btn-primary btn-sm" onClick={handleClick}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="wallet-btn">
            <button className="btn btn-info" onClick={handleClick}>
              Your Address {WalletAddress.substring(0, 7)}...
            </button>
          </div>
        )}


        <button className="hamburger" onClick={toggleExpanded}>
          <MenuIcon />
        </button>
      </div>
      {isExpanded && (
        <div className="menu-overlay">
          <div className="menu-links">
            <a href="/">App</a>
            <a href="/">Products</a>
            <a href="/">Build</a>
            <a href="/">Careers</a>
            <a href="/">About</a>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;

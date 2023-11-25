import React, { useEffect, useState} from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress  } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractAbi, signer);

  console.log(
    provider,
    signer,
    transactionsContract
  )

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")


    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""})

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))

    }

    const checkIfWalletisConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({method: "eth_accounts"});


    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
    
                // get all Transactions
            }else {
                console.log("No accounts Found")
            }

        }catch(error){
            throw new Error("No ethreum Object")

        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            setCurrentAccount(accounts[0]);

        }catch(error) {
            console.log(error);
            throw new Error('No ethereum object');
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return(alert("Please Install Metamask"));

            const {  addressTo, amount, keyword, message} = formData;
            getEthereumContract();
        }catch(error) {
           console.log(error);

            
        }
    }
    useEffect(() => {
        checkIfWalletisConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider >
    );
}




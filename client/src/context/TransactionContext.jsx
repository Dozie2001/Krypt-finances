import React, { useEffect, useState} from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress  } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractAbi, signer);

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""})

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))

    }
    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please Install metamask")
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        }catch (error) {
            console.log(error);
        }
    }
    const checkIfWalletisConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({method: "eth_accounts"});


    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
    
                getAllTransactions();
            }else {
                console.log("No accounts Found")
            }

        }catch(error){
            throw new Error("No ethreum Object")

        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionsContract = getEthereumContract();
            const transactionsCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionsCount);
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object');

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
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex,
                }],
            });
            // Change this line in sendTransaction function
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);


            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const transactionsCount = await transactionsContract.getTransactionCount();

            setTransactionCount(transactionsCount.toNumber());

            window.reload();

        }catch(error) {
           console.log(error);

           throw new Error("No Ethereum object");
            
        }
    }
    useEffect(() => {
        checkIfWalletisConnected();
        checkIfTransactionsExist();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider >
    );
}




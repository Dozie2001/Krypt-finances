import React, { useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractAbi, contractAddress  } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi)

    console.log({
        provider,
        signer,
        transactionContract
    }
    );
}

export const TransactionProvider = ({children}) => {
    return (
        <TransactionContext.Provider value={{}}>
            {children}
        </TransactionContext.Provider >
    );
}




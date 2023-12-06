import React, { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';

import { shortenAddress } from '../utils/shortenAddress';

const TransactionCard = ({addressTo, addressFrom, timeStamp, message, keyword, amount, url}) => {
    return (
        <div className='bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px]'>

        </div>
    );
}

const Transactions = () => {
    const { currentAccount } =  useContext(TransactionContext);
    return (
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className='flex flex-col md:p-12 py-12 px-14'>
            {currentAccount ? (
                <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
            ): (
                <h3 className="text-white text-3xl text-center my-2">Connect Account to Latest Changes</h3>
            )}
            <div className='flex flex-wrap justify-center items-center mt-10'>
                {dummyData.reverse().map((transaction, i) => (
                       <TransactionCard key={i} {...transaction} />
                ))}

            </div>
        </div>
      </div>
    )
}

export default Transactions; 
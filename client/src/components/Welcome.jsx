import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Welcome = () => {
    const connectWallet = () => {

    }
    return (
     <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start  items-start flex-col mf:mr-10">
                <h1 className="text-3xl sm:text-5xl text-white gradient py-1">
                    Send Crypto <br /> Everywhere
                </h1>
                <p className="text-white mt-5 text-left font-light md:w-9/12 w-11/12 text-base">
                Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                </p>
            </div>
            <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={connectWallet}>
                <p className="text-white text-base font-semibold">
                    Connect Wallet
                </p>

            </button>
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${commonStyles}`}>
                    Reliability
                </div>
                <div className={`${commonStyles}`}>
                    Security
                </div>
                <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                    Etherium
                </div>
                <div className={`sm:rounded-bl-2xl  ${commonStyles}`}>
                    Web 3.0
                </div>
                <div className={commonStyles}>
                    ECNCapital
                </div>
                <div className={`rounded-br-2xl ${commonStyles}`}>
                    BlockChain
                </div>
            </div>

            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">

                </div>

            </div>
        </div>
       </div>
    )
}


export default Welcome;
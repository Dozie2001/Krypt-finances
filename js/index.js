const { ethers } = require("ethers");

const MoodContractAddress = 0xa6133B31d1F72E0300fa0bFbD2e0a7a78E6a4A28
const MoodContractABI = [
	{
		"inputs": [],
		"name": "getmood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setmood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


let MoodContract = undefined;
let signer = undefined;

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });


async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
}

async function setMood() {
    const mood = document.getElementById("mood").ariaValueMax;
    await MoodContract.setMood(mood);
}

async function setMood() {
    const mood = document.getElementById("mood").ariaValueMax;
    await MoodContract.setMood(mood);
}

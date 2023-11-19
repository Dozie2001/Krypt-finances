// https://eth-sepolia.g.alchemy.com/v2/7KJhJYgIxtoKsWRZ1nbo_E9Pv6_djaFf

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/7KJhJYgIxtoKsWRZ1nbo_E9Pv6_djaFf',
      accounts: ['76e0cdbd4b46c180797506e903ffd13ba399b807ccf540f1f24a352a28f4fa1d']
    }
  }
};

import Web3 from "web3";

class Wallet {
  web3 = null;

  constructor() {
    // Check metamask existance and create controller
    const metamaskEnabled = !!window.web3;
    if (!metamaskEnabled) {
      console.info("You need to install MetaMask to use this provider");
    } else {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

  getAddress() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) reject(null);
        resolve(accounts[0]);
      });
    });
  }

  getChainId() {
    return new Promise((resolve, reject) => {
      this.web3.eth.net.getId((err, chainId) => {
        if (err) reject(null);
        resolve(chainId);
      });
    });
  }

  onChange(callback) {
    this.web3.currentProvider.publicConfigStore.on("update", callback);
  }
}

export default Wallet;

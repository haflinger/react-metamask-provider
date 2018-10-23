class Wallet {
  web3 = null;

  constructor() {
    // Check metamask existance and create controller
    const metamaskEnabled = !!window.web3;
    if (!metamaskEnabled) {
      console.info("You need to install MetaMask to use this provider");
    } else {
      this.web3 = window.web3;
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

  onAddressChange(callback) {
    this.web3.currentProvider.publicConfigStore.on("update", event => {
      if (
        event.selectedAddress.toLowerCase() !==
        this.web3.eth.defaultAccount.toLowerCase()
      ) {
        this.web3.eth.defaultAccount = event.selectedAddress;
        callback(event.selectedAddress);
      }
    });
  }
}

export default Wallet;

import React, { PureComponent } from "react";
import Wallet from "./Wallet";

const { Provider, Consumer } = React.createContext();

class WalletProvider extends PureComponent {
  state = {
    accounts: [],
    address: null,
    loading: false,
    loggedIn: false,
    error: null
  };

  wallet = null;

  constructor() {
    super();
    this.wallet = new Wallet();
  }

  async componentDidMount() {
    this.updateState();
    // If wallet address change
    this.wallet.onChange(() => this.updateState());
  }

  async updateState() {
    this.setState({
      address: await this.wallet.getAddress(),
      chainId: await this.wallet.getChainId()
    });
  }

  login() {
    const { eth } = this.wallet.web3;
    eth.sign("Login", this.state.address, (err, result) => {
      console.log(err, result);
      this.setState({ loggedIn: err ? false : true });
    });
  }

  render() {
    const { personal } = this.wallet.web3;

    const values = {
      ...this.state,
      login: () => this.login(),
      sign: (data, callback) =>
        personal.sign(data, this.state.address, callback)
    };

    return <Provider value={values}>{this.props.children}</Provider>;
  }
}

export { WalletProvider, Consumer as WalletConsumer };

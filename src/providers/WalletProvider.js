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

  componentDidMount() {
    this.wallet.getAddress().then(address => {
      this.setState({ address });
    });

    // If wallet address change
    this.wallet.onAddressChange(address => {
      this.setState({ address });
    });
  }

  login() {
    const { personal } = this.wallet.web3;
    personal.sign("Login", this.state.address, err => {
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

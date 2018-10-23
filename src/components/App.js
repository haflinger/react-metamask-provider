import React, { Fragment } from "react";

import { WalletProvider, WalletConsumer } from "../providers/WalletProvider";

const App = props => {
  return (
    <Fragment>
      <WalletProvider>
        <WalletConsumer>
          {({ accounts, address, chainId, login, loggedIn }) => (
            <div>
              <div>Current Address : {address}</div>
              <div>Current chainId: {chainId} </div>
              <div>{loggedIn ? `Logged in` : `Not logged in`}</div>
              <div>
                <button onClick={() => login()} disabled={!address}>
                  Login
                </button>
              </div>
            </div>
          )}
        </WalletConsumer>
      </WalletProvider>
    </Fragment>
  );
};

export default App;

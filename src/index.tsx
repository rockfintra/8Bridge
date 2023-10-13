import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EthereumClient } from "@web3modal/ethereum";
import "./index.scss";
import App from "./App";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { wagmiClient, chains, projectId } from "./wagmi";
const ethereumClient = new EthereumClient(wagmiClient, chains)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <WagmiConfig client={wagmiClient}>
        <App />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient}  />
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);

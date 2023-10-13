import React, { useState, useEffect } from "react";
import BNBIcon from "../../assets/images/bnb.png"; // New BNB Icon path
import ETHIcon from "../../assets/images/eth.png"; // New ETH Icon path
import bg from "./background.mp4";
import Rotate from "../../assets/images/rotate.png";
import "./Hero.scss";
import { useTransactionStore } from "../../store/transactionStore";
import Dropdown from "../Dropdown";
import Balance from "../Balance";
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { formatAddress } from "../../utils/Connectors/formatters";
import { useWeb3Modal } from "@web3modal/react";
import Config from "../../config.json";
import tokenABI from "../../utils/abi/tokenABI.json";
import routerABI from "../../utils/abi/routerABI.json";
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const Hero: React.FC = () => {
  const [tokenAmt, setTokenAmt] = useState(0);
  const { chain } = useNetwork();
  const { chains, isLoading, switchNetwork } = useSwitchNetwork();

  const [sourceChainIcon, setSourceChainIcon] = useState(ETHIcon);
  const [destinationChainIcon, setDestinationChainIcon] = useState(BNBIcon);
  const [sourceChain, setSourceChain] = useState<string>("Ethereum");
  const [destinationChain, setDestinationChain] = useState<string>("Binance");
  const [isFocused, setIsFocused] = useState(false);
  const setTransactionStatus = useTransactionStore((store) => store.setTransactionStatus);
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [isApproved, setIsApproved] = useState(false);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // console.log(chains,chain);
    // console.log("error",error);
    let wrongNetwork = chains.find((c) => c.id === chain?.id);
    console.log("wrong network", wrongNetwork);
    if (wrongNetwork === undefined) {
      // setNetworkError("Wrong Network");
      switchNetwork?.(chains[0]?.id);
    } else {
      if (chain?.id === Config.homeChainId) {
        setSourceChain("Ethereum");
        setDestinationChain("Binance");
        setSourceChainIcon(ETHIcon);
        setDestinationChainIcon(BNBIcon);
      } else {
        setSourceChain("Binance");
        setDestinationChain("Ethereum");
        setSourceChainIcon(BNBIcon);
        setDestinationChainIcon(ETHIcon);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    // console.log(chains,chain);
    // console.log("error",error);
    let wrongNetwork = chains.find((c) => c.id === chain?.id);
    console.log("wrong network", wrongNetwork);
    if (wrongNetwork === undefined) {
      // setNetworkError("Wrong Network");
      switchNetwork?.(chains[0]?.id);
    } else {
      if (chain?.id === Config.homeChainId) {
        setSourceChain("Ethereum");
        setDestinationChain("Binance");
        setSourceChainIcon(ETHIcon);
        setDestinationChainIcon(BNBIcon);
      } else {
        setSourceChain("Binance");
        setDestinationChain("Ethereum");
        setSourceChainIcon(BNBIcon);
        setDestinationChainIcon(ETHIcon);
      }
    }
  }, []);

  //Get Token Balance
  const {
    data: token1,
    isLoading: token1Loding,
    refetch: refetchBalance,
  } = useContractRead({
    address:
      chain?.id === Config.foreignChainId
        ? (Config.foreignTokenUnderlyingContract as any)
        : Config.homeTokenUnderlyingContract,
    abi: tokenABI,
    chainId: chain?.id,
    functionName: "balanceOf",
    args: [address],
  });

  // const { data: token2, isLoading: token2Loding } = useContractRead({
  //   address: Config.homeTokenUnderlyingContract as any,
  //   abi: tokenABI,
  //   chainId: Config.homeChainId,
  //   functionName: "balanceOf",
  //   args: [address],
  // });

  // Get Allowance

  const { data: tokenAllowance, isLoading: tokenAllowanceLoding } = useContractRead({
    address: (chain?.id === Config.foreignChainId
      ? Config.foreignTokenUnderlyingContract
      : Config.homeTokenUnderlyingContract) as any,
    abi: tokenABI,
    functionName: "allowance",
    args: [
      address,
      chain?.id === Config.foreignChainId
        ? Config.foreignRouterContract
        : Config.homeRouterContract,
    ],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: (chain?.id === Config.foreignChainId
      ? Config.foreignTokenUnderlyingContract
      : Config.homeTokenUnderlyingContract) as any,
    abi: tokenABI,
    functionName: "approve",
    args: [
      chain?.id === Config.foreignChainId
        ? Config.foreignRouterContract
        : Config.homeRouterContract,
      (tokenAmt * 1e18).toLocaleString("fullwide", { useGrouping: false }),
    ],
  });

  const { data: approveData, write: approve } = useContractWrite(approveConfig);

  const {
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    isError: isApproveError,
  } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const {
    data: swapData,
    write: swap,
    reset,
    isError: isSwapError,
    isLoading: isSwapLoading,
  } = useContractWrite({
    address: (chain?.id === Config.homeChainId
      ? Config.homeRouterContract
      : Config.foreignRouterContract) as any,
    abi: routerABI,
    functionName: "SwapOutUnderlying",
    mode: "recklesslyUnprepared",
  });
  const { isSuccess: isSwapSuccess } = useWaitForTransaction({
    hash: swapData?.hash,
  });

  useEffect(() => {
    if (isSwapLoading) {
      setTransactionStatus({
        status: "PENDING",
        title: "Transfer",
        message: "Transaction is on pending. please wait",
      });
    }
    if (isSwapError) {
      setTransactionStatus({
        status: "ERROR",
        title: "Transfer",
        message: "Error while transferring.please try again",
      });

      setTimeout(() => {
        setTransactionStatus(null);
      }, 3000);
    }
    if (isSwapSuccess) {
      // swapData?.wait();
      console.log(chain?.id, swapData?.hash);
      let clock: any;
      clearInterval(clock);
      clock = setInterval(() => {
        fetch(`${Config.serverUrl}/tx?chainId=${chain?.id}&txHash=${swapData?.hash}`)
          .then((d) => d.json())
          .then((res) => {
            console.log("res:", res);
            if (res.data?.status === 1) {
              clearInterval(clock);
              setTransactionStatus({
                status: "SUCCESS",
                title: "Transfer",
                message: "Transaction confirmed",
              });
            } else if (res.data?.status === 0) {
              setTransactionStatus({
                status: "PENDING",
                title: "Transfer",
                message: "Transaction procesing by validator. please wait..",
              });
            } else {
              setTransactionStatus({
                status: "PENDING",
                title: "Transfer",
                message: "Transaction indexing please wait..",
              });
            }
          })
          .catch((e) => {
            clearInterval(clock);
            console.log("Error:", e);
          });
      }, 20000);

      setTimeout(() => {
        setTransactionStatus(null);
      }, 3000);
    }
  }, [isSwapLoading, isSwapError, isSwapSuccess]);

  useEffect(() => {
    if (isApproveLoading) {
      setTransactionStatus({
        status: "PENDING",
        title: "Approve",
        message: "Transaction is on pending. please wait",
      });
    }
    if (isApproveError) {
      setTransactionStatus({
        status: "ERROR",
        title: "Approve",
        message: "Error while transferring.please try again",
      });

      setTimeout(() => {
        setTransactionStatus(null);
      }, 3000);
    }
    if (isApproveSuccess) {
      setTransactionStatus({
        status: "SUCCESS",
        title: "Approve",
        message: "Token Apporved Click on Transfer button to get your Token completely",
      });
      setIsCached(true);
      setIsApproved(true);
      setTimeout(() => {
        setIsApproved(true);
        refetchBalance();
        reset();
        const tempAmt = tokenAmt;
        setTokenAmt((s) => s - s);
        setTokenAmt((s) => s + tempAmt);
        setTransactionStatus(null);
      }, 3000);
    }
  }, [isApproveSuccess, isApproveLoading, isApproveError]);

  useEffect(() => {
    if (!isCached) {
      if (Number(tokenAllowance) / 1e18 > 0 && Number(tokenAllowance) / 1e18 >= tokenAmt) {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    }
  }, [tokenAmt, tokenAllowance, tokenAllowanceLoding, isCached]);
  console.log(isApproved);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleRotate = () => {
    const tempSourceChain = sourceChain;
    const tempSourceIcon = sourceChainIcon;

    setSourceChain(destinationChain);
    setDestinationChain(tempSourceChain);

    setSourceChainIcon(destinationChainIcon);
    setDestinationChainIcon(tempSourceIcon);
    switchNetwork?.(
      chain?.id === Config.foreignChainId ? Config.homeChainId : Config.foreignChainId
    );
  };

  const handleSelectSourceChain = (selectedChain: string) => {
    setSourceChain(selectedChain);
    handleRotate();
  };

  const handleSelectDestinationChain = (selectedChain: string) => {
    setDestinationChain(selectedChain);
    handleRotate();
  };

  const handleApprove = async () => {
    approve?.();

    setTransactionStatus({
      status: "PENDING",
      title: "Approve Token",
      message: "Your transaction is processing. Please wait!",
    });

    await sleep(3000);

    setTransactionStatus({
      status: "SUCCESS",
      title: "Approve Token",
      message: "Your transaction is completed successfully.",
    });

    await sleep(3000);

    setTransactionStatus({
      status: "ERROR",
      title: "Approve Token",
      message: "Your transaction has failed. Please try again later.",
    });

    await sleep(3000);

    setTransactionStatus(null);
  };

  const handleTransfer = async () => {
    setTransactionStatus({
      status: "PENDING",
      title: "Transfer",
      message: "Your transaction is processing. Please wait!",
    });

    swap({
      recklesslySetUnpreparedArgs: [
        chain?.id === Config.homeChainId ? Config.homeTokenContract : Config.foreignTokenContract,
        address,
        (tokenAmt * 1e18).toLocaleString("fullwide", { useGrouping: false }),
        chain?.id === Config.homeChainId ? Config.foreignChainId : Config.homeChainId,
      ],
    });
  };

  return (
    <div className="hero-wrapper">
      <div className="mx">
        <div className="box-wrapper">
          <video autoPlay loop muted className="video-background">
            <source src={bg} type="video/mp4" />
          </video>
        </div>
        <div className="maindiv">
          <h1 className="innerhead">
            Seamlessly Connecting BSC, <br />
            Ethereum, and <span style={{ color: "#ececec" }}>8Bit Chain</span>
          </h1>
          <div className="fullset">
            <div className="fullset1">
              <div className="fullset2">
                <div className="numbers">1</div>
                <p className="confirm">Source Chain</p>
                <hr />
                <div className="chainmain">
                  <div className="chainimg">
                    <img src={sourceChainIcon} alt={sourceChain} />
                  </div>
                </div>
                <Dropdown
  options={["Ethereum", "Binance","8Bit Chain ( Coming Soon )"]}
  value={sourceChain}
  onChange={handleSelectSourceChain}
/>
                {address ? (
                  <button className="proceed" style={{ marginTop: "20px" }} onClick={() => open()}>
                    connected to {formatAddress(address)}
                  </button>
                ) : (
                  <button className="proceed" style={{ marginTop: "20px" }} onClick={() => open()}>
                    Connect Wallet
                  </button>
                )}
              </div>
              <div className="rotation"></div>
              <div className="fullset2 mobiletransition">
                <div className="numbers">2</div>
                <p className="confirm">Destination Chain</p>
                <hr />
                <div className="chainmain">
                  <div className="chainimg">
                    <img src={destinationChainIcon} alt={destinationChain} />
                  </div>
                </div>
                <Dropdown
  options={["Ethereum", "Binance","8Bit Chain ( Coming Soon )"]}
  value={destinationChain}
  onChange={handleSelectDestinationChain}
/>
                {/* {address ? (
                  <button className="proceed" style={{ marginTop: "20px" }} onClick={() => open()}>
                    connected to {formatAddress(address)}
                  </button>
                ) : (
                  <button className="proceed" style={{ marginTop: "20px" }} onClick={() => open()}>
                    Connect Wallet
                  </button>
                )} */}
              </div>
            </div>
            <div className="fullset2">
              <div className="numbers">3</div>
              <p className="confirm">Confirm Bridging</p>
              <hr />
              <div className="nameblock">
                <h3>From</h3>
                <div className="chain-icon sm border ethereum">
                  <img src={sourceChainIcon} alt={sourceChain} />
                </div>
              </div>
              <div className={`searbarh flex-item ${isFocused ? "focus-within" : ""}`}>
                <input
                  type="amount"
                  placeholder="Amount"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={tokenAmt}
                  onChange={(e) => setTokenAmt((e.target as any).value)}
                />
                <div className="searchBar-icons" onClick={()=>setTokenAmt(Number(token1)/1e18)}>MAX</div>
              </div>
              <Balance
                address={address}
                chainId={chain?.id}
                tokenAddress={
                  chain?.id === Config.foreignChainId
                    ? Config.foreignTokenUnderlyingContract
                    : Config.homeTokenUnderlyingContract
                }
              />
              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "#0c1318",
                    borderRadius: 10,
                  }}
                  onClick={handleRotate}
                >
                  <img src={Rotate} style={{ height: 15 }} />{" "}
                </button>
              </div>
              <div className="nameblock" style={{ marginTop: "20px" }}>
                <h3>To</h3>
                <div className="chain-icon sm border ethereum">
                  <img src={destinationChainIcon} alt={destinationChain} />
                </div>
              </div>
              <div className={`searbarh flex-item ${isFocused ? "focus-within" : ""}`}>
                <input
                  type="amount2"
                  placeholder=""
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={tokenAmt - 5 > 0 ? tokenAmt - 5 : 0}
                />
              </div>
              <Balance
                address={address}
                chainId={
                  chain?.id === Config.foreignChainId ? Config.homeChainId : Config.foreignChainId
                }
                tokenAddress={
                  chain?.id === Config.foreignChainId
                    ? Config.homeTokenUnderlyingContract
                    : Config.foreignTokenUnderlyingContract
                }
              />
              <br />
              <div className="reminders">
                <dl className="list">
                  <dt>
                    <p style={{ marginTop: "5px", fontSize: "13px" }}>
                      Reminder:{" "}
                      <span style={{ color: "#fff" }}>
                        Estimated Time of Crosschain Arrival is 10-30 min
                      </span>{" "}
                    </p>
                  </dt>
                  <dt>
                    <p style={{ marginTop: "5px", fontSize: "13px" }}>
                      Minimum swap Amount :
                      <span style={{ color: "#fff" }}>
                        {" "}
                        {Config.foreignChainId === chain?.id
                          ? Config?.minimumSwapAmount?.foreign
                          : Config?.minimumSwapAmount?.home}{" "}
                        w8Bit{" "}
                      </span>
                    </p>
                  </dt>
                  <dt>
                    <p style={{ marginTop: "5px", fontSize: "13px" }}>
                      Fee :{" "}
                      <span style={{ color: "#fff" }}>
                        {" "}
                        {Config.foreignChainId === chain?.id
                          ? Config?.swapFee?.foreign
                          : Config?.swapFee?.home}{" "}
                        w8Bit
                      </span>
                    </p>
                  </dt>
                </dl>
              </div>
              {!isApproved ? (
                <button
                  className="proceed"
                  onClick={() => approve?.()}
                  disabled={
                    isApproveLoading ||
                    !approve ||
                    tokenAmt < 50 ||
                    Number(token1) / 1e18 < tokenAmt
                  }
                >
                  {!isApproveLoading
                    ? tokenAmt >= 50
                      ? Number(token1) / 1e18 >= tokenAmt
                        ? "Approve"
                        : "Insufficient Fund!"
                      : "Min Swap 50 w8Bit"
                    : "Approving... "}
                </button>
              ) : (
                <button
                  className="proceed"
                  onClick={() => {
                    if (tokenAmt >= 50) handleTransfer();
                    else alert("minimum 50 Tokens swap!");
                  }}
                  disabled={isSwapLoading || tokenAmt < 50 || Number(token1) / 1e18 < tokenAmt}
                >
                  Transfer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

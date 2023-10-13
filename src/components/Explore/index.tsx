import React, { useState, useEffect } from "react";
import bg from "./background.mp4";
import ProfileImg from "../../assets/images/LogoImg.png";
import Config from "../../config.json";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "./Hero.scss";
import "./PairsList.scss";
const Hero: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setTData] = useState<[]>([]);
  const [search ,setSearch] = useState("");
  useEffect(() => {
    if((search as String).trim().length===0) {
    setIsLoading(true);
    fetch(`${Config.serverUrl}/swap-history?page=${page}&limit=${limit}`)
      .then((d) => d.json())
      .then((d) => {
        setIsLoading(false);
        setTData(d?.data);
      })
      .catch((e) => {
        console.log("error:", e);
        setIsLoading(false);
      });
    }
  }, [page, limit,search]);
  useEffect(()=>{
    setIsLoading(true);
    fetch(`${Config.serverUrl}/search-tx?txHash=${search}`)
      .then((d) => d.json())
      .then((d) => {
        setIsLoading(false);
        setTData(d?.data);
      })
      .catch((e) => {
        console.log("error:", e);
        setIsLoading(false);
      });
  },[search]);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const [isFlickering, setIsFlickering] = useState(false);

  useEffect(() => {
    // Toggle isFlickering every second
    const interval = setInterval(() => {
      setIsFlickering((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="hero-wrapper">
      <div className="mx">
        <div className="box-wrappers">
          <video autoPlay loop muted className="video-backgrounds">
            <source src={bg} type="video/mp4" />
          </video>
        </div>
        <div className="maindivs">
          <h1
            className="innerhead"
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "30px",
            }}
          >
            Explore Swaps
          </h1>

          {/* <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <div
              className={`searbarh flex-item ${
                isFocused ? "focus-within" : ""
              }`}
              style={{ maxWidth: "700px" }}
            >
              <input
                type="search"
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={search}
                onChange={e=>setSearch(((e.target) as any)?.value)}
              />
              <div className="searchBar-icon">
                <SearchIcon />
              </div>
            </div>
          </div> */}
          <div style={{ width: "100%" }}>
            <div>
              <div className="table-main">
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th className="tabstart">
                          <span>S.No</span>
                        </th>
                        <th>
                          <span>Coin</span>
                        </th>
                        <th>
                          <span>Value</span>
                        </th>
                        <th>
                          <span>From</span>
                        </th>
                        <th>
                          <span>To</span>
                        </th>
                        <th>
                          <span>Date</span>
                        </th>
                        <th className="tabend">
                          <span>Status</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map(
                        (
                          {
                            fromChainId,
                            toChainId,
                            fromTxHash,
                            toTxHash,
                            fromAmount,
                            toAmount,
                            status,
                            fromChainTimestamp,
                            toChainTimestamp,
                          },
                          i
                        ) => (
                          <tr key={i.toString()}>
                            <td>
                              <div className="blockno">{i + 1}</div>
                            </td>
                            <td>
                              <div className="flex row-header">
                                <img src={ProfileImg} alt="" />
                                <div className="flex-column">
                                  <h4>8Bit</h4>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <span>Sent:</span> {Number(fromAmount) / 1e18}
                              </div>
                              <div>
                                <span>Recieve:</span> {Number(toAmount) / 1e18}
                              </div>
                            </td>
                            <td>
                              <div>{(Config[fromChainId] as any)?.name}</div>
                              <div>
                                <a
                                  href={
                                    (Config[fromChainId] as any)?.explorer_url +
                                    "/tx/" +
                                    fromTxHash
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {(fromTxHash as String).substring(0, 5)}...
                                  {(fromTxHash as String).slice(-5)}
                                </a>
                              </div>
                            </td>
                            <td>
                              <div>{(Config[toChainId] as any)?.name}</div>
                              <div>
                                <a
                                  href={
                                    (Config[toChainId] as any)?.explorer_url +
                                    "/tx/" +
                                    fromTxHash
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {(toTxHash as String).substring(0, 5)}...
                                  {(toTxHash as String).slice(-5)}
                                </a>
                              </div>
                            </td>
                            <td>
                              {status === 1
                                ? new Date(
                                    toChainTimestamp * 1000
                                  ).toLocaleString()
                                : new Date(
                                    fromChainTimestamp * 1000
                                  ).toLocaleString()}
                            </td>
                            <td>
                              {status === 1 ? (
                                <span style={{ color: "green" }}>Success</span>
                              ) : (
                                <span style={{ color: "gray" }}>Pending</span>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

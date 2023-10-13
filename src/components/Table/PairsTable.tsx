import React, { useEffect, useState } from "react";
import ProfileImg from "../../assets/images/LogoImg.png";
import { useNavigate } from "react-router-dom";
import Config from "../../config.json";

const PairsTable: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setTData] = useState([]);
  useEffect(() => {
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
  }, [page, limit]);
  return (
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
              <th className="tabend">
                <span>Value</span>
              </th>
              <th className="tabend">
                <span>From</span>
              </th>
              <th className="tabend">
                <span>To</span>
              </th>
              <th className="tabend">
                <span>Date</span>
              </th>
              <th className="tabend">
                <span>Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
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
                      ? new Date(toChainTimestamp * 1000).toLocaleString()
                      : new Date(fromChainTimestamp * 1000).toLocaleString()}
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
  );
};

export default PairsTable;

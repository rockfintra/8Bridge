
import { useContractRead } from 'wagmi'
import tokenABI from "../../utils/abi/tokenABI.json";

function Balance(props:any) {
    const { data: tokenAmt,error, isLoading: isLoding } = useContractRead({
        address: props.tokenAddress,
        abi: tokenABI,
        chainId: props.chainId,
        functionName: 'balanceOf',
        args: [props.address],
    });
    console.log(props.address,props.tokenAddress,props.chainId,error)
    return (
        <p style={{ fontSize: "13px", marginTop: "10px" }}>
         Balance: <span style={{ color: "#fff" }}>{isLoding?"loading...":(Number(tokenAmt)/1e18)?.toString()} w8Bit</span>
       </p>
    )
}
export default Balance;
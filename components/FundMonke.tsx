import { GET_FUNDINGS } from "@/constants/subgraphQueries";
import networkMapping from "@/constants/networkMapping.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery } from "@apollo/client";
import { ConnectButton } from "web3uikit";
import GoFundMeAbi from "@/constants/abi/GoFundMe.json";
import { ethers } from "ethers";

type NetworkMapping = {
  [key: string]: {
    GoFundMe: string[];
  };
};

export default function FundMonke() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const goFundMeAddress = (networkMapping as NetworkMapping)[chainString]
    .GoFundMe[0];
  const { data, runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: GoFundMeAbi,
    contractAddress: goFundMeAddress,
    functionName: "contribute",
    msgValue: ethers.utils.parseEther("0.000000000000000001").toString(),
    params: {
      campaignId: 0,
    },
  });

  const { loading, error, data: fundings } = useQuery(GET_FUNDINGS);
  //   console.log(fundings.campaignFundeds[0].amountRaised);

  return (
    <div>
      <div className="content-center">
      {fundings && `${fundings.campaignFundeds[0].amountRaised} / ${fundings.campaignFundeds[0].goal} raised`} 
      </div>
      <button
        onClick={() => {
          runContractFunction();
        }}
      >
      Fund Monke Button
      </button>
    </div>
  );
}

import Image from 'next/image'
import { GET_FUNDINGS } from '@/constants/subgraphQueries'
import networkMapping from "@/constants/networkMapping.json"
import { useMoralis } from "react-moralis"
import { MoralisProvider } from "react-moralis" 
import { useQuery } from '@apollo/client';
import {ConnectButton} from 'web3uikit'

type NetworkMapping = {
  [key: string]: {
    GoFundMe: string[]
  }
}

export default function Header() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const goFundMeAddress = (networkMapping as NetworkMapping)[chainString].GoFundMe[0]

    const { loading, error, data: fundings } = useQuery(GET_FUNDINGS);
    console.log(fundings)
    console.log(goFundMeAddress )
    console.log("hello")

  return (
    <div>
        <ConnectButton/>
    </div>
  )
}
"use client";
import Image from "next/image";
import { GET_FUNDINGS } from "@/constants/subgraphQueries";
import networkMapping from "../constants/networkMapping.json";
import { useMoralis } from "react-moralis";
import { MoralisProvider } from "react-moralis";
import { Toaster, toast } from "sonner";
import Header from "@/components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import FundMonke from "@/components/FundMonke";

type NetworkMapping = {
  [key: string]: {
    GoFundMe: string[];
  };
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/52670/gofundme/version/latest",
});

export default function Home() {
  // const { isWeb3Enabled, chainId } = useMoralis()
  // const chainString = chainId ? parseInt(chainId).toString() : "31337"
  // const marketplaceAddress = (networkMapping as NetworkMapping)[chainString].GoFundMe[0]

  // console.log(marketplaceAddress)

  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <main className="flex flex-col items-center justify-between pt-48 ">
          <Header />
          <div onClick={() => toast.success("we're back")}>
            <h5 className="">GoFundMonke</h5>
            <Toaster />
          </div>
          <Image
            src="https://media.tenor.com/FImWp5JfDq4AAAAC/dying-monkey-dying.gif"
            alt="monkey"
            width="500"
            height="500"
          />
          <FundMonke />
          <div className="h-screen"></div>
        </main>
      </ApolloProvider>
    </MoralisProvider>
  );
}

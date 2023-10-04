import { gql } from "@apollo/client";

export const GET_ACTIVE_ITEMS = gql`
  {
    activeItems(
      first: 5
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

export const GET_SOLD_ITEMS = (address) => {
  const query = gql`
  {
    itemBoughts(
      first: 5
      where: { buyer: "${address}" }
    ) {
      id
      buyer
      nftAddress
      tokenId
    }
  }`;
  return query;
};

export const GET_FUNDINGS = gql`
  {
    campaignFundeds(orderBy: amountRaised, orderDirection: desc) {
      id
      campaignId
      amountRaised
      goal
    }
  }
`;

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

console.log("Network", Network);

export default async function handler(request, response) {
  try {
    const { address } = request.query;
    const { tokenBalances } = await alchemy.core.getTokenBalances(address);
    const tokenMetadataPromises = [];

    // remove tokens with 0 balance
    const filteredTokenBalances = tokenBalances.filter(
      (token) => BigInt(token.tokenBalance) !== 0n
    );

    filteredTokenBalances.forEach((token) => {
      const tokenMetadataPromise = alchemy.core.getTokenMetadata(
        token.contractAddress
      );
      tokenMetadataPromises.push(tokenMetadataPromise);
    });

    const tokenMetadata = await Promise.all(tokenMetadataPromises);
    const tokenData = filteredTokenBalances.map((tokenBalance, idx) => {
      return {
        ...tokenBalance,
        ...tokenMetadata[idx],
      };
    });

    const { ownedNfts } = await alchemy.nft.getNftsForOwner(address);

    const nftData = ownedNfts.filter((nft) => !nft.metadataError);

    const account = {
      address,
      tokenData,
      nftData,
    };

    response.status(200).json(account);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: err });
  }
}

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export default async function handler(request, response) {
  try {
    const { address } = request.query;

    const data = await alchemy.core.getTokenBalances(address);

    const tokenMetadataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenMetadataPromise = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenMetadataPromises.push(tokenMetadataPromise);
    }

    const tokenMetadata = await Promise.all(tokenMetadataPromises);

    const tokenData = data.tokenBalances.map((token, idx) => {
      return {
        ...token,
        ...tokenMetadata[idx],
      };
    });

    const nftData = await alchemy.nft.getNftsForOwner(address);

    const account = {
      address: data.address,
      tokenData,
      nftData: nftData.ownedNfts,
    };

    response.status(200).json(account);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: err });
  }
}

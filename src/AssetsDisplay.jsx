// prettier-ignore
import { Box, Flex, Heading, Image, SimpleGrid, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Skeleton } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import { useState } from "react";

export default function AssetsDispay({ hasQueried, accountData, error }) {
  const { address, tokenData, nftData } = accountData;

  return (
    <Box p={12}>
      {hasQueried && !error ? (
        <>
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 1, "2xl": 2 }} spacing={8}>
            <Box>
              <Heading my={6}>tokens</Heading>
              <TableContainer>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Logo</Th>
                      <Th>Name</Th>
                      <Th>Symbol</Th>
                      <Th>Quantity</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tokenData.map((token, idx) => {
                      return (
                        <Tr key={token.contractAddress}>
                          <Td>
                            <ImageWithFallback small src={token?.logo} />
                          </Td>
                          <Td>{token?.name}&nbsp;</Td>
                          <Td> ${token?.symbol}&nbsp;</Td>
                          <Td>
                            {Utils.formatUnits(
                              token.tokenBalance,
                              token.decimals
                            )}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box>
              <Heading my={6}>nfts</Heading>

              {nftData.map((nft, idx) => {
                return (
                  <Flex key={idx} gap="6" mb={5}>
                    <Box>
                      <ImageWithFallback src={nft.rawMetadata.image} />
                    </Box>
                    <Box pt={4}>
                      <Heading as="h6" fontSize={22}>
                        Collection
                      </Heading>
                      <Text wordBreak="break-word">{nft.contract.name}</Text>
                      <Heading as="h6" fontSize={22}>
                        Token ID
                      </Heading>
                      <Text wordBreak="break-word">#{nft.tokenId}</Text>
                      <Heading as="h6" fontSize={22}>
                        address
                      </Heading>
                      <Text
                        wordBreak="break-word"
                        color="blue.400"
                        as="a"
                        href={`https://etherscan.io/address/${nft?.contract?.address}`}
                      >
                        {nft?.contract?.address}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </SimpleGrid>
        </>
      ) : (
        <Box mt={24}>
          <Text textAlign="center">
            {error
              ? error + ". Please enter a valid address or ens name"
              : "All ERC-20 token balances and NFTs for a given account address will display here!"}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function ImageWithFallback(props) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  let height = 250;
  let width = 250;
  if (props.small) {
    height = 50;
    width = 50;
  }

  if (imageError || !props.src) {
    return (
      <Skeleton height={height} width={width} borderRadius={18}></Skeleton>
    );
  }

  // Convert IPFS URI to HTTPS URL
  let imageUrl = props.src;
  if (props.src.startsWith("ipfs://")) {
    const ipfsHash = props.src.replace("ipfs://", "");
    imageUrl = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;
  }

  return (
    <Image
      width="100%"
      maxW={width}
      borderRadius={18}
      src={imageUrl}
      onError={handleError}
      alt={props.alt}
    />
  );
}

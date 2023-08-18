// prettier-ignore
import { Box, Flex, Heading,  SimpleGrid, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Skeleton } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import ImageWithFallback from "./ImageWithFallback";
import TokenDisplay from "./TokenDisplay";

export default function NftDisplay({ nftData }) {
  return (
    <Box>
      <Box>
        <Box>
          <Heading
            my={6}
            bgColor="swell.900"
            color="white"
            w={300}
            textAlign="center"
            p={2}
            borderRadius={10}
          >
            NFTS
          </Heading>
        </Box>

        <SimpleGrid columns={{ sm: 1, md: 1, lg: 1, "2xl": 2 }} spacing={8}>
          {nftData.map((nft, idx) => {
            return (
              <Flex
                key={idx}
                gap="6"
                mb={5}
                flexDirection={{ base: "column", md: "row" }}
              >
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
        </SimpleGrid>
      </Box>
    </Box>
  );
}

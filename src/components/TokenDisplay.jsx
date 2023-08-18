import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { shortenAddress } from "../utils/helpers";
import { Utils } from "alchemy-sdk";
import ImageWithFallback from "./ImageWithFallback";

export default function TokenDisplay({ tokenData }) {
  return (
    <Box mb={10}>
      <Heading
        mb={6}
        bgColor="swell.900"
        color="white"
        w={300}
        textAlign="center"
        p={2}
        borderRadius={10}
      >
        ERC20s
      </Heading>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Logo</Th>
              <Th>Name</Th>
              <Th>Symbol</Th>
              <Th>Quantity</Th>
              <Th>Contract</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokenData.map((token, idx) => {
              return (
                <Tr key={token.contractAddress}>
                  <Td>
                    <ImageWithFallback small src={token?.logo} />
                  </Td>
                  <Td>{token?.name}</Td>
                  <Td>{token?.symbol}</Td>
                  <Td>
                    {Utils.formatUnits(token.tokenBalance, token.decimals)}
                  </Td>
                  <Td>
                    <Text
                      as="a"
                      color="blue.400"
                      href={`https://etherscan.io/address/${token.contractAddress}`}
                    >
                      {shortenAddress(token.contractAddress)}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

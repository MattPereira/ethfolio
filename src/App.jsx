//prettier-ignore
import { Box, Button, Center, Flex, Heading, Input, Text, Spinner, FormControl, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import axios from "axios";

import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import AssetsDisplay from "./AssetsDisplay";

export default function App() {
  const [accountData, setAccountData] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
      return accounts[0];
    } catch (err) {
      console.log("error", err);
      return null;
    }
  }

  async function handleFormSubmit(event, address) {
    console.log("event", event);
    if (event) {
      event.preventDefault();
    }
    setIsLoading(true);

    try {
      if (userAddress.length) {
        address = userAddress;
      }
      const response = await axios.get(`/api/alchemy?address=${address}`);
      const { data } = response;
      console.log("DATA", data);

      setAccountData(data);
      setHasQueried(true);
      setIsLoading(false);
      setUserAddress("");
    } catch (error) {
      console.log("HELLO ERROR", error);
      setIsLoading(false);
      setError(error.response.data.error.reason);
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgColor="swell.300"
        color="white"
        py={2}
        px={8}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Connect browser wallet or search by address or ens name</Text>
        {window.ethereum && window.ethereum.selectedAddress ? (
          <Text>{shortenAddress(window.ethereum.selectedAddress)}</Text>
        ) : (
          <Button
            variant="outline"
            color="white"
            _hover={{ color: "swell.300", bgColor: "white" }}
            fontSize={20}
            onClick={() => {
              connectWallet().then((address) => {
                handleFormSubmit(null, address);
              });
            }}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
      <Box bgColor="swell.900" color="white" pt={20} pb={24} px={5} h={500}>
        <Center>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <Heading
              variant="xl"
              as="h1"
              mb={14}
              fontSize={{ base: 50, sm: 60, md: 75, lg: 100 }}
              textAlign="center"
            >
              Ethfolio
            </Heading>
          </Flex>
        </Center>

        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <form
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            onSubmit={handleFormSubmit}
          >
            <FormControl
              w={{ sm: "100%", md: "85%", lg: "70%", xl: "60%", "2xl": "50%" }}
            >
              <Flex>
                <InputGroup size="md">
                  <Input
                    onChange={(e) => setUserAddress(e.target.value)}
                    color="black"
                    w="100%"
                    textAlign="start"
                    p={6}
                    bgColor="white"
                    fontSize={24}
                    value={userAddress}
                    placeholder="Enter address or ens name"
                    required
                  />
                  <InputRightElement w={75} h="100%">
                    <IconButton
                      w={"100%"}
                      h={"100%"}
                      type="submit"
                      _hover={{ color: "black", backgroundColor: "gray.200" }}
                      backgroundColor="swell.300"
                      isLoading={isLoading}
                      color="white"
                      aria-label="Search database"
                      icon={<SearchIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </FormControl>
          </form>
        </Flex>
        {hasQueried && (
          <Text fontWeight="bold" mt={20} textAlign="center" fontSize={22}>
            Address: {accountData.address}
          </Text>
        )}
      </Box>
      {isLoading ? (
        <Flex
          w="100%"
          h={72}
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <AssetsDisplay
          hasQueried={hasQueried}
          accountData={accountData}
          error={error}
        />
      )}
    </ChakraProvider>
  );
}

function shortenAddress(address) {
  if (!address) return "";

  const start = address.slice(0, 5);
  const end = address.slice(-3);

  return `${start}...${end}`;
}

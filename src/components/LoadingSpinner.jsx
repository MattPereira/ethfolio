import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
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
  );
}

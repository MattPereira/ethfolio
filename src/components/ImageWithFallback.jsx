import { useState } from "react";
import { Image, Skeleton } from "@chakra-ui/react";

export default function ImageWithFallback(props) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  let height = 250;
  let width = 250;
  if (props.small) {
    height = 35;
    width = 35;
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
  // Convert Arweave URI to HTTPS URL
  else if (props.src.startsWith("ar://")) {
    const arweaveHash = props.src.replace("ar://", "");
    imageUrl = `https://arweave.net/${arweaveHash}`;
  }

  return (
    <Image
      width={width}
      height={height}
      objectFit="cover"
      maxW={width}
      borderRadius={18}
      src={imageUrl}
      onError={handleError}
      alt={props.alt}
    />
  );
}

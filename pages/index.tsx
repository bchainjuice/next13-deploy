import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS } from "../const/addresses";
import Image from "next/image"

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract: ERC721Contract
  } = useContract(ERC721_CONTRACT_ADDRESS);
  const {
    data: ERC721ContractMetadata,
    isLoading: ERC721ContractMetadataIsLoading
  } = useContractMetadata(ERC721Contract);

  const {
    data: ERC721ClaimCondition,
    isLoading: ERC721ClaimConditionIsLoading
  } = useActiveClaimCondition(ERC721Contract);

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <div>
          <h3>
            <span className={styles.gradientText0}>
              ALPHA[ KEY ]
            </span>
            </h3>
          <p>Unlock [CONTRACTS]</p>
          <h3>[Price]: {ERC721ClaimCondition?.currencyMetadata.displayValue} {ERC721ClaimCondition?.currencyMetadata.symbol}</h3>
          {address ? (
            <Web3Button
              contractAddress={ERC721_CONTRACT_ADDRESS}
              action={(contract) => contract.erc721.claim(1)}
              theme="dark"
              onSuccess={() => alert("Claimed NFT")}
            >[CLAIM]</Web3Button>
          ) : (
            <p>Connect to claim!</p>
          )}
        </div>
        <div className={styles.heroImageContainer}>
          {!ERC721ContractMetadataIsLoading ? (
            <div className={styles.heroImage}>
              <MediaRenderer
                src={ERC721ContractMetadata?.image}
                height="70%"
                width="70%"
              />
              <p>{ERC721ContractMetadata?.name}</p>
            </div>
          ) : (
            <p><Image src="/icons/loading.gif" alt="" width={50} height={50}/>HODL...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

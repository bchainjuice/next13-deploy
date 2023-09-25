import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS } from "../const/addresses";

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
          <h1>
            <span className={styles.gradientText0}>
                Alpha-KEY
            </span>
            </h1>
          <p>Alpha-KEY holders will be eligible to stake and earn tokens.</p>
          <p>Cost: {ERC721ClaimCondition?.currencyMetadata.displayValue} {ERC721ClaimCondition?.currencyMetadata.symbol}</p>
          {address ? (
            <Web3Button
              contractAddress={ERC721_CONTRACT_ADDRESS}
              action={(contract) => contract.erc721.claim(1)}
              onSuccess={() => alert("Claimed NFT")}
            >Claim</Web3Button>
          ) : (
            <p>Sign-in to claim</p>
          )}
        </div>
        <div className={styles.heroImageContainer}>
          {!ERC721ContractMetadataIsLoading ? (
            <div className={styles.heroImage}>
              <MediaRenderer
                src={ERC721ContractMetadata?.image}
                height="auto"
                width="100%"
              />
              <p>{ERC721ContractMetadata?.name}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

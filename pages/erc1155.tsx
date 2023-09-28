import { MediaRenderer, Web3Button, useActiveClaimCondition, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { ERC1155_CONTRACT_ADDRESS } from "../const/addresses";
import styles from "../styles/Home.module.css";
import Image from "next/image"

export default function ERC1155() {
    const address = useAddress();

    const {
        contract: ERC1155Contract
    } = useContract(ERC1155_CONTRACT_ADDRESS, "edition-drop");

    const {
        data: ERC1155ContractMetadata,
        isLoading: ERC1155ContractMetadataIsLoading
    } = useContractMetadata(ERC1155Contract);

    const {
        data: ERC1155ClaimCondition
    } = useActiveClaimCondition(ERC1155Contract, 0);


    return (
        <div className={styles.container}>
            <div className={styles.heroContainer}>
                <div>
                <h3>
                <span className={styles.gradientText0}>
                [ PASS ]
            </span>
            </h3>
                <p>CHECKPOINT</p>
                <h3>[Price]: 0.003 BNB{ERC1155ClaimCondition?.currencyMetadata.displayValue} {ERC1155ClaimCondition?.currencyMetadata.symbol}</h3>
                {address ? (
                    <Web3Button
                    contractAddress={ERC1155_CONTRACT_ADDRESS}
                    action={(contract) => contract.erc1155.claim(0, 1)}

                    onSuccess={() => alert("Claimed NFT")}
                    >[CLAIM]</Web3Button>
                ) : (
                    <p>Connect to claim!</p>
                )}
                </div>
                <div className={styles.heroImageContainer}>
                {!ERC1155ContractMetadataIsLoading ? (
                    <div className={styles.heroImage}>
                    <MediaRenderer
                        src={ERC1155ContractMetadata?.image}
                        height="90%"
                        width="90%"
                    />
                    <p>{ERC1155ContractMetadata?.name}</p>
                    </div>
                ) : (
                    <p><Image src="/icons/loading.gif" alt="" width={50} height={50}></Image>HODL...</p>
                )}
                </div>
            </div>
        </div>
    );
};
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
    } = useActiveClaimCondition(ERC1155Contract, 1);


    return (
        <div className={styles.container}>
            <div className={styles.heroContainer}>
                <div>
                
                <h3>
                <span className={styles.gradientText1}>
                
            </span>
            </h3>
                <h4></h4>
                
                <h3>
                <span className={styles.gradientText1}>
                
            </span>
            
            <p><Image src="/icons/front.png" alt="" width={155} height={155}></Image></p>
            <p><Image src="/icons/Access.png" alt="" width={155} height={155}></Image></p>
            </h3>
                <h4>COST : {ERC1155ClaimCondition?.currencyMetadata.displayValue} {ERC1155ClaimCondition?.currencyMetadata.symbol}</h4>
                <h3>
                <span className={styles.gradientText3}>
            
            </span>
            </h3>
                {address ? (
                    <Web3Button
                    contractAddress={ERC1155_CONTRACT_ADDRESS}
                    action={(contract) => contract.erc1155.claim(1, 1)}
                    onSuccess={() => alert("Membership Pass Claimed")}
                    >
                    C L A I M
                    </Web3Button>
                    
                    
                ) : (
                    <h3>      
                </h3>
                    
                )}
                </div>
                <div className={styles.heroImageContainer}>
                {!ERC1155ContractMetadataIsLoading ? (
                    <div className={styles.heroImage}>
                    <MediaRenderer
                        src={ERC1155ContractMetadata?.image}
                        height="80%"
                        width="80%"
                    />
                    <p>{ERC1155ContractMetadata?.name}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                </div>
            </div>
            
        </div>
    );
};

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
                
                <Image src="/icons/cube.gif" alt="drop" width={180} height={180} />
                <h3>
                <span className={styles.gradientText1}>
                -M-I-S-S-I-O-N-
            </span>
            </h3>
                <p>MEMBERSHIP PASS</p>
                <h3>
                <span className={styles.gradientText1}>
                
            </span>
            </h3>
                <p>COST:{ERC1155ClaimCondition?.currencyMetadata.displayValue} {ERC1155ClaimCondition?.currencyMetadata.symbol}</p>
                <h3>
                <span className={styles.gradientText1}>
            
            </span>
            </h3>
                {address ? (
                    <Web3Button
                    contractAddress={ERC1155_CONTRACT_ADDRESS}
                    action={(contract) => contract.erc1155.claim(0, 1)}
                    onSuccess={() => alert("Membership Pass Claimed")}
                    >
                    C L A I M
                    </Web3Button>
                    
                ) : (
                    <h3>
                    <span className={styles.gradientText1}>     
                    C-O-N-N-E-C-T
                </span>
                </h3>
                    
                )}
                </div>
                <p><Image src="/icons/pro.jpg" alt="" width={200} height={200}/> </p>
                <div className={styles.heroImageContainer}>
                {!ERC1155ContractMetadataIsLoading ? (
                    <div className={styles.heroImage}>
                    <MediaRenderer
                        src={ERC1155ContractMetadata?.image}
                        height="85%"
                        width="85%"
                    />
                    <p>{ERC1155ContractMetadata?.name}</p>
                    </div>
                ) : (
                    <p><Image src="/icons/loading.gif" alt="" width={100} height={100}></Image></p>
                )}
                </div>
            </div>
            
       <p><Image src="/icons/arb.png" alt="" width={150} height={150}/> </p>
        </div>
    );
};

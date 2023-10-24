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
                
                <Image src="/icons/cube.gif" alt="drop" width={150} height={150} />
                <h3>
                <span className={styles.gradientText1}>
                =M_I_S_S_I_O_N=
            </span>
            </h3>
                <h4>MEMBERSHIP-PASS</h4>
                <h3>
                <span className={styles.gradientText1}>
                
            </span>
            </h3>
                <h4>COST : {ERC1155ClaimCondition?.currencyMetadata.displayValue} {ERC1155ClaimCondition?.currencyMetadata.symbol}</h4>
                <h3>
                <span className={styles.gradientText3}>
            
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
                    
                </h3>
                    
                )}
                </div>
                <p><Image src="/icons/pro.jpg" alt="" width={180} height={180}/> </p>
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
            
        </div>
    );
};

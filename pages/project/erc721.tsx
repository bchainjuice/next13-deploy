import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import { ERC721_CONTRACT_ADDRESS } from "../../const/addresses";
import Image from "next/image"

export default function ERC721Project() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading,
    } = useContractMetadata(contract);

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading,
    } = useTotalCount(contract);

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading,
    } = useClaimedNFTSupply(contract);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading,
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                     isLoading={contractMetadataIsLoading}
                     title={contractMetadata?.name!}
                     description={contractMetadata?.description!}
                     image={contractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                          <h3>HODL[KEY]</h3>
                          <p>Earn FEG20 tokens.</p>
                          <Web3Button
                              contractAddress={ERC721_CONTRACT_ADDRESS}
                              action={(contract) => contract.erc721.claim(1)}
                              theme='dark'
                              onSuccess={() => alert("NFT Claimed!")}
                          >[CLAIM]</Web3Button>
                    </div>
                    <div className={styles.componentCard}>
                          <h3>[ STATS ]</h3>
                          <p>
                            [TOTAL SUPPLY]:
                            {totalSupplyIsLoading ? (
                                "Loading.."
                            ) : (
                                  `${totalSupply?.toNumber()}`
                            )}
                          </p>
                          <p>
                            [TOTAL CLAIMED]:
                            {totalClaimedSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                `${totalClaimedSupply?.toNumber()}`  
                            )}
                          </p>
                    </div>
                    <div className={styles.componentCard}>
                           <h3>[ NFTs ]</h3>
                           <p>
                            [TOTAL OWNED]:
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                `${ownedNFTs?.length}`  
                            )}
                          </p>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2>[ My NFTs ]</h2>
                    <div className={styles.grid} style={{justifyContent: "flex-start"}}>
                        {ownedNFTsIsLoading ? (
                               <p><Image src="/icons/loading.gif" alt="drop" width={50} height={50} /></p>
                            ) : (
                                ownedNFTs?.map((nft) => (
                              <div className={styles.card} key={nft.metadata.id}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                />
                                <div className={styles.cardText}>
                                    <h2>{nft.metadata.name}</h2>
                                </div>
                                <Link href={`/projects/stake`}>
                                    <button 
                                       className={styles.matchButton}
                                       style={{
                                            width: "100%",
                                            borderRadius: "0 0 10px 10px",
                                       }}
                                       
                                    >STAKE[NFT]</button>
                                </Link>

                           
                              </div>
                           ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
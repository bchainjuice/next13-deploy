import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import { ERC721_CONTRACT_ADDRESS } from "../../const/addresses";

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
                          <h3>[ Stake Alpha-key ]</h3>
                          <p>Earn FEG20 tokens.</p>
                          <Web3Button
                              contractAddress={ERC721_CONTRACT_ADDRESS}
                              action={(contract) => contract.erc721.claim(1)}
                              onSuccess={() => alert("NFT Claimed!")}
                          >Claim</Web3Button>
                    </div>
                    <div className={styles.componentCard}>
                          <h3>[ Stats ]</h3>
                          <p>
                            Total Supply:
                            {totalSupplyIsLoading ? (
                                "Loading.."
                            ) : (
                                  `${totalSupply?.toNumber()}`
                            )}
                          </p>
                          <p>
                            Total Claimed:
                            {totalClaimedSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                `${totalClaimedSupply?.toNumber()}`  
                            )}
                          </p>
                    </div>
                    <div className={styles.componentCard}>
                           <h3>[ Your NFTs ]</h3>
                           <p>
                            Total Owned:
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
                               <p>Loading...</p>
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
                                       
                                    >Stake NFT</button>
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
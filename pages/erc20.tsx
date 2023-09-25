import { ContractMetadata, Web3Button, useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply } from "@thirdweb-dev/react";
import HeroCard from "../components/hero-card";
import styles from '../styles/Home.module.css';
import { ERC20_CONTRACT_ADDRESS } from "../const/addresses";
import Link from 'next/link';

export default function ERC20Project() {
    const address =useAddress();

    const {
        contract
    } = useContract(ERC20_CONTRACT_ADDRESS, "token");

    const {
        data: contractMetadata,
        isLoading: contractMetaDataLoading,
    } = useContractMetadata(contract);

    const {
        data: tokenSupply,
        isLoading: tokenSupplyIsLoading,
    } = useTokenSupply(contract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading,
    } = useTokenBalance(contract, address);
    
    return (
        <div className= {styles.container}>
            <HeroCard
                 isLoading={contractMetaDataLoading}
                 title={contractMetadata?.name!}
                 description={contractMetadata?.description!}
                 image={contractMetadata?.image!}
            /> 
            <div className={styles.grid}>
                 <div className={styles.componentCard}>
                      <h3>[ Stats ]</h3>
                      {tokenSupplyIsLoading ? (
                           <p>Loading supply...</p>
                      ) : (
                           <p>Total supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                      )}
                 </div>
                 <div className={styles.componentCard}>
                       <h3>[ Balance ]</h3>
                       {tokenBalanceIsLoading ? (
                            <p>Loading balance...</p>
                      ) : (
                            <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                      )}
                      <Web3Button
                             contractAddress={ERC20_CONTRACT_ADDRESS}
                             action={(contract) => contract.erc20.burn(100)}
                             theme="dark"
                      >
                         Burn 100 Tokens
                      </Web3Button>
                 </div>
                 <div className={styles.componentCard}>
                        <h3>[ Earn FEG20 Tokens ]</h3>
                        <p>Stake-To-Earn.</p>
                 </div>
                       <Link href='/stake'>
                            <button className={styles.matchButton}>
                              Stake NFT
                              </button>
                       </Link>
                       <Link href='/project/erc721'>
                            <button className={styles.matchButton}>
                              Claim NFT
                              </button> 
                       </Link>
            </div>
        </div>
    )
}
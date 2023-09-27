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
                       <h3>| Balance |</h3>
                       {tokenBalanceIsLoading ? (
                            <p>Loading balance..</p>
                      ) : (
                            <p>{tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                      )}
                      <Web3Button
                             contractAddress={ERC20_CONTRACT_ADDRESS}
                             action={(contract) => contract.erc20.burn(100)}
                             theme="dark"
                      >
                         BURN
                      </Web3Button>
                 </div>
                       <Link href='/stake'>
                            <button className={styles.matchButton}>
                              Stake now
                              </button>
                       </Link>
                       <Link href='/project/erc721'>
                            <button className={styles.matchButton}>
                              Claim now
                              </button> 
                       </Link>
            </div>
        </div>
    )
}
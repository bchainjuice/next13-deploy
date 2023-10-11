import { ContractMetadata, Web3Button, useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply } from "@thirdweb-dev/react";
import HeroCard from "../components/hero-card";
import styles from '../styles/Home.module.css';
import { ERC20_CONTRACT_ADDRESS } from "../const/addresses";
import Link from 'next/link';
import Image from "next/image";


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
       <Image src="/icons/coming soon.gif" alt="" width={600} height={600}/>
            <div className={styles.grid}>
                 <div className={styles.componentCard}>
                      {tokenSupplyIsLoading ? (
                           <p></p>
                      ) : (
                           <p></p>
                      )}
                 </div>
                 <div className={styles.componentCard}>
                       {tokenBalanceIsLoading ? (
                            <p></p>
                      ) : (
                            <p></p>
                      )}
                </div>
                       <Image src="/icons/chains.png" alt="" width={550} height={400}/>
            </div>
        </div>
    )
}

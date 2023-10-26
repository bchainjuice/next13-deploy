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
       <Image src="/icons/chains.gif" alt="" width={500} height={500}/>
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
                
       <p><Image src="/icons/arb.png" alt="" width={150} height={150}/> </p>
            </div>
        </div>
    )
}

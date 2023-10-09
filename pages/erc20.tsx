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
            <HeroCard
                 isLoading={contractMetaDataLoading}
                 title={contractMetadata?.name!}
                 description={contractMetadata?.description!}
                 image={contractMetadata?.image!}
            /> 
            <div className={styles.grid}>
                 <div className={styles.componentCard}>
                      <p>[Supply]</p>
                      {tokenSupplyIsLoading ? (
                           <p><Image src="/icons/loading.gif" alt="" width={50} height={50} /></p>
                      ) : (
                           <p>[T]: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                      )}
                 </div>
                 <div className={styles.componentCard}>
                       {tokenBalanceIsLoading ? (
                            <p><Image src="/icons/loading.gif" alt="" width={50} height={50}/></p>
                      ) : (
                            <p>{tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                      )}
                </div>
                       <Image src="/icons/zksync.gif" alt="" width={150} height={150}/>
            </div>
        </div>
    )
}
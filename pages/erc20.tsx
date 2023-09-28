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
                      <h3>[SUPPLY]</h3>
                      {tokenSupplyIsLoading ? (
                           <p><Image src="/icons/loading.gif" alt="" width={50} height={50} /></p>
                      ) : (
                           <p>[T-SPLY]: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                      )}
                 </div>
                 <div className={styles.componentCard}>
                       <h3>[BALANCE]</h3>
                       {tokenBalanceIsLoading ? (
                            <p><Image src="/icons/loading.gif" alt="" width={50} height={50} /></p>
                      ) : (
                            <p>[T-BAL]: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                      )}
                </div>
                       <Link href='/stake'>
                       <Image src="/icons/stake.png" alt="" width={200} height={200} />
          <h5 className={styles.selectBoxTitle}>STAKE[NFT]</h5>
                       </Link>
                       <Link href='/project/erc721'>
                       <Image src="/icons/claim.png" alt="" width={200} height={200} />
          <h5 className={styles.selectBoxTitle}>CLAIM[NFT]</h5>
                       </Link>
                       <Image src="/icons/bnb.gif" alt="" width={110} height={110}/>
            </div>
        </div>
    )
}
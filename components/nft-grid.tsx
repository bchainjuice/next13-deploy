import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import styles from "../styles/NFT.module.css";
import NFTCard from "./nft-card";
import Image from "next/image"

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    overrideOnclickBehavior?: (nft: NFTType) => void;
    emptyText?: string;
};

export default function NFTGrid({ 
    isLoading, 
    data, 
    overrideOnclickBehavior, 
    emptyText = "No NFTs"
}: Props) {
    return (
        <div className={styles.nftGridContainer}>
            {isLoading ? (
                [...Array(20)].map((_, index) => (
                    <div key={index} className={styles.nftContainer}>
                        <p><Image src="/icons/loading.gif" alt="" width={50} height={50}></Image></p>
                    </div>
                ))
            ) : data && data.length > 0 ? (
                data.map((nft, index) => (
                    <div key={index} className={styles.nftContainer}>
                        <NFTCard
                            nft={nft}
                        />
                    </div>
                ))
            ) : (
                <p>{emptyText}</p>
            )}
        </div>
    );
};
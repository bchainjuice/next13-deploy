import { Web3Button, useAddress, useContract, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import { ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from '../const/addresses';
import StakeNFTGrid from '../components/stake-nft-grid';
import StakedNFTContainer from '../components/staked-nft-container';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function Stake() {
    const address = useAddress();
    const [claimableReward, setClaimableReward] = useState<BigNumber>();

    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
    const {
        contract: StakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);
    const {
        contract: ERC20Contract
    } = useContract(ERC20_CONTRACT_ADDRESS);


    const {
        data: ownedERC721Tokens,
        isLoading: ownedERC721TokensIsLoading
    } = useOwnedNFTs(ERC721Contract, address);

    const {
        data: ERC20TokenBalance,
        isLoading: ERC20TokenBalanceIsLoading
    } = useTokenBalance(ERC20Contract, address);

    useEffect(() => {
        if (!address || !StakeContract) return;

        async function getClaimableReward() {
            const claimableReward = await StakeContract?.call(
                "getStakeInfo",
                [address]
            );

            setClaimableReward(claimableReward[1]);
        };

        getClaimableReward();
    }, [address, StakeContract]);
    

    return (
        <div className={styles.container}>
            <Image src="/icons/stake.gif" alt="" width={200} height={200}/>
            <h1>
            <span className={styles.gradientText0}>[THE-CHRONOGORILLAS]
            </span>
            </h1>
            <h5>In a world not so different from our own, where hunger and food scarcity were rampant issues, an extraordinary group of beings emerged to tackle the crisis—the Chronogorillas. These remarkable creatures possessed the unique ability to travel through time, and they used this gift to stop hunger from being a reality in their jungle home.

The story begins with a young Chronogorilla named Rama, who had a deep empathy for the suffering of creatures in the jungle. He witnessed firsthand how hunger and food shortages plagued his fellow animals, leading to a struggle for survival that sometimes resulted in territorial disputes and conflict.

Determined to make a difference, Rama sought the guidance of the elder Chronogorilla, Kumba, who had mastered the art of time travel. Kumba agreed to teach Rama the secrets of time manipulation, believing that with great power came great responsibility.

Under Kumba's tutelage, Rama learned how to navigate the intricate web of time and space. He discovered that the jungle had once been a lush and thriving ecosystem, but over the years, deforestation, climate change, and human encroachment had wreaked havoc on its delicate balance.

Rama realized that to stop hunger, he needed to change the course of history. He embarked on a series of temporal journeys, visiting different eras to observe the jungle's evolution. He carefully documented the periods when the ecosystem was at its most abundant and thriving.

Returning to the present, Rama shared his findings with the other Chronogorillas. They decided to take collective action to restore the jungle to its former glory. Using their time-traveling abilities, they transported seeds, saplings, and vital nutrients from the past into the present.

As the jungle began to flourish once more, the Chronogorillas observed a remarkable transformation. The rejuvenated ecosystem produced an abundance of fruits, nuts, and other resources, ending hunger for the animals living within it. The once-fragmented animal communities began to cooperate and share resources, fostering a spirit of unity and harmony.

Word of the Chronogorillas' miraculous efforts soon spread to the human world. Scientists, conservationists, and researchers flocked to the jungle to witness the incredible transformation. They, too, became inspired to take action to stop hunger and promote sustainable practices worldwide.

Together with the Chronogorillas, humans launched ambitious conservation initiatives, reforestation projects, and efforts to combat climate change. They recognized that by working together, they could create a world where hunger was no longer a pressing issue.

The story of Rama and the Chronogorillas became a symbol of hope, demonstrating that with the right combination of empathy, determination, and the willingness to learn from the past, even the most complex and persistent problems could be overcome. Hunger became a distant memory, replaced by a future where the natural world thrived, and all creatures, great and small, lived in abundance and harmony.</h5>
            <div className={styles.stakeRewardContainer}>
                <div className={styles.stakeRewardInfo}>
                    <h3>[REWARDS]</h3>
                    <p>[BALANCE]: {!ERC20TokenBalanceIsLoading ? (<>{ERC20TokenBalance?.displayValue}</>) : (<>0</>)}</p>
                </div>
                <div className={styles.stakeClaimableRewardInfo}>
                    <p>[CLAIMABLE REWARDS]</p>
                    <p className={styles.claimableRewards}>
                        {!claimableReward
                            ? "0"
                            : ethers.utils.formatEther(claimableReward)
                        }
                    </p>
                    <Web3Button
                        contractAddress={STAKING_CONTRACT_ADDRESS}
                        action={(contract) => contract.call("claimRewards")}
                        theme="dark"
                        onSuccess={() => {
                            alert("Claimed Rewards");
                            setClaimableReward(ethers.constants.Zero);
                        }}
                        isDisabled={!claimableReward || claimableReward.isZero()}
                    >
                        CLAIM
                        <Image src="/icons/FEG20.gif" alt="" width={30} height={30} />
                        </Web3Button>
                </div>
            </div>
            <div className={styles.stakeContainer}>
                <StakeNFTGrid
                    isLoading={ownedERC721TokensIsLoading}
                    data={ownedERC721Tokens}
                />
                <StakedNFTContainer />
            </div>
        </div>
    );
};
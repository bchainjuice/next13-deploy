import { MediaRenderer } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

type HeroCardProps = {
    isLoading: boolean;
    title: string;
    description: string;
    image: string;
};

export default function HeroCard(Props: HeroCardProps) {
    return (
        <>  
            {Props.isLoading ? (
                 <div className={styles.loadingText}>
                    <p>Loading....</p>
                 </div>
            ) : (
                <div className={styles.heroCardContainer}>
                    <MediaRenderer
                        src={Props.image}
                        width="100%"
                        height="100%"
                        className={styles.heroCardContractImage}
                    />
                    <div className={styles.heroCardContent}>
                        <h1 className={styles.gradientText1}>{Props.title}</h1>
                        <p>{Props.description}</p>
                    </div>
                </div>
            )}
        </>
    )
}
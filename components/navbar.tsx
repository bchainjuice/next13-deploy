import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import randomColor from '../util/randomColor';
import { useState } from 'react';
import Image from "next/image"

const [randomColor1, randomColor2] = [
    randomColor(),
    randomColor()
];

export default function Navbar() {
    const address = useAddress();
    const disconnect = useDisconnect();

    function truncateAddress(address: string) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <div className={styles.navbarContainer}>
            <Image src="/icons/FEG20.gif" alt="drop" width={100} height={100} />
            <Link href="/">
                <p className={styles.navbarLogo}><span className={styles.gradientText3}>[KEY]</span></p>
            </Link>
            <div className={styles.navbarLinks}>
                <Link
                    href={"/erc1155"}
                >
                    <h5><span className={styles.gradientText3}>[PASS]</span></h5>
                </Link>
                <Link 
                    href={"/stake"}
                >
                    <h5><span className={styles.gradientText3}>[STAKE]</span></h5>
                </Link>
                <Link
                    href={"/erc20"}
                >
                    <h5><span className={styles.gradientText3}>[FEG20]</span></h5>
                </Link>
            </div>
            <div>
                {address ? (
                    <>
                        <div
                            className={styles.profilePicture}
                            style={{
                                background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                            }}
                            onClick={() => {
                                setProfileMenuOpen(!profileMenuOpen);
                            }}
                        />
                        {profileMenuOpen && (
                            <div className={styles.profileMenu}>
                                <p className={styles.profileMenuAddress}>{truncateAddress(address)}</p>
                                <Link 
                                    href={`/profile/${address}`}
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                    }}
                                >
                                     <Image src="/icons/nft.gif" alt="" width={100} height={100} />
                                    <h3 className={styles.profileMenuLink}>[ TRAVELER ]</h3>
                                </Link>
                                <hr className={styles.divider}/>
                                <button
                                    className={styles.navbarSignOutButton}
                                    onClick={() => {
                                        disconnect();
                                        setProfileMenuOpen(false);
                                    }}
                                >[ -Disconnect- ]</button>
                            </div>
                        )}
                    </>
                ) : (
                    <ConnectWallet 
                        btnTitle='CONNECT'
                        modalTitle='Welcome Traveler'
                        theme="dark"
                        
                    />
                )}
            </div>
        </div>
        
    );
};
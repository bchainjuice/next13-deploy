import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import randomColor from '../util/randomColor';
import { useState } from 'react';

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
            <Link href="/">
                <p className={styles.navbarLogo}><span className={styles.gradientText1}>[ Alpha ]</span></p>
            </Link>
            <div className={styles.navbarLinks}>
                <Link
                    href={"/erc1155"}
                >
                    <p>  
                        <span className={styles.gradientText1}>
                    [ Feed-The-Gorillas ]
            </span>
                    </p>
                </Link>
                <Link 
                    href={"/stake"}
                >
                    <p>[ Stake ]</p>
                </Link>
                <Link
                    href={"/erc20"}
                >
                    <p>[ Token ]</p>
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
                                    <p className={styles.profileMenuLink}>Profile</p>
                                </Link>
                                <hr className={styles.divider}/>
                                <button
                                    className={styles.navbarSignOutButton}
                                    onClick={() => {
                                        disconnect();
                                        setProfileMenuOpen(false);
                                    }}
                                >Disconnect</button>
                            </div>
                        )}
                    </>
                ) : (
                    <ConnectWallet 
                        btnTitle='Sign in'
                        modalTitle='Connect'
                    />
                )}
            </div>
        </div>
    );
};
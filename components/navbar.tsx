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
            <Image src="/icons/eagle.gif" alt="drop" width={150} height={150} />
            <Link href='https://linktr.ee/eagleprotocol.xyz'>
          <h4 className={styles.selectBoxTitle}></h4>
                       </Link>
            <Link href="/erc20">
                <h1 className={styles.navbarLogo}></h1>
            </Link>
            <div className={styles.navbarLinks}>
                <Link
                    href={"https://medium.com/@eagleprotocol1"}
                >
                    <p>Medium</p>
                </Link>
                <Link 
                    href={"https://discord.gg/qAZKy8bKjY"}
                >
                    <p>Discord</p>
                </Link>
                <Link
                    href={"https://twitter.com/Eagleprotocol1"}
                >
                    <p>Twitter</p>
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
                                    <h3 className={styles.profileMenuLink}></h3>
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
                        btnTitle='CONNECT'
                        modalTitle='Connect your wallet to get started'
                        theme="dark"
                        
                    />
                    
                )}
            </div>
        </div>
        
    );
};
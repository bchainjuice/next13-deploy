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
        
            <Image src="/icons/eagle1.gif" alt="drop" width={95} height={95} />
            <Image src="/icons/eagle.png" alt="drop" width={150} height={150} />
            <Link href="/erc20">
          <h4 className={styles.selectBoxTitle}><Image src="/icons/swap.png" alt="drop" width={87} height={87} /></h4>
                       </Link>
            
            <div className={styles.navbarLinks}>
                <Link
                    href={"https://twitter.com/Eagleprotocol1"}
                >
                    <p><Image src="/icons/X.png" alt="drop" width={50} height={50} /></p>
                </Link>
                <Link 
                    href={"https://discord.gg/mMxkZaSgdh"}
                >
                    <p><Image src="/icons/discord.png" alt="drop" width={50} height={50} /></p>
                </Link>
                <Link
                    href={"https://medium.com/@eagleprotocol1"}
                >
                    <p><Image src="/icons/medium.png" alt="drop" width={50} height={50} /></p>
                </Link>
                <Link
                    href={"https://eagle-protocol.gitbook.io/eagle-protocol-litepaper/"}
                >
                    <p><Image src="/icons/docs.png" alt="drop" width={90} height={90} /></p>
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
                                >D I S C O N N E C T</button>
                                
                            </div>
                        )}
                    </>
                ) : (
                    <ConnectWallet 
                        btnTitle='C O N N E C T'
                        modalTitle='Early birds get the worm!'
                        
                    />
                    
                )}
            </div>
        </div>
        
    );
};

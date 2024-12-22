"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { GrTechnology } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import styles from './header.module.css';
import { useState } from "react";

interface NavbarProps {
    isAdmin: boolean
}

const Navbar = ({ isAdmin }: NavbarProps) => {
    const [toggle, setToggle] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div>
                <Link href="/" className={styles.logo}>
                    CLOUD 
                    <GrTechnology />
                    HOSTING
                </Link>
                <div className={styles.menu}>
                    {
                        toggle ? (<IoMdClose onClick={() => setToggle(!toggle)}/>) : (<AiOutlineMenu onClick={() => setToggle(!toggle)} />)
                    }
                    {/* prev => !prev */}
                </div>
            </div>
            <div style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""}}
                className={styles.navLinksWrapper}>
                <ul className={styles.navLinks}>
                    <Link onClick={()=> setToggle(false)} className={styles.navLink}href="/">Home</Link>
                    <Link onClick={()=> setToggle(false)} className={styles.navLink}href="/about">About</Link>
                    <Link onClick={()=> setToggle(false)} className={styles.navLink}href="/articles?pageNumber=1">Articles</Link>
                    {
                        isAdmin && (<Link onClick={()=> setToggle(false)} className={styles.navLink} href="/admin">Admin Dashboard</Link>)
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

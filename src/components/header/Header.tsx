import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import styles from './header.module.css';
import { verifyTokenForPage } from "@/utils/verifyToken";

const Header = async () => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    const userPayload = verifyTokenForPage(token);
    return (
        <header className={styles.header}>
            <Navbar isAdmin={userPayload?.isAdmin || false}/>
            <div className={styles.right}>
                {
                    userPayload ? (
                        <>
                            <strong className="text-blue-800 md:text-xl capitalize">{userPayload?.username}</strong>
                            {/* <Link className={styles.btn} href={`/profile/${userPayload.id}`}>
                                Profile
                            </Link> */}
                            <LogoutButton/>
                        </>
                    ) : (
                        <>
                            <Link className={styles.btn} href="/login">Login</Link>
                            <Link className={styles.btn} href="/register">Register</Link>
                        </>
                    )
                }
            </div>
        </header>
        
    )
}

export default Header

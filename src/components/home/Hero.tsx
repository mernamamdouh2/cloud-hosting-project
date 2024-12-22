import CloudImage from "../../../public/cloud-hosting.png"
import Image from "next/image"
import React from 'react'
import { TiTick } from 'react-icons/ti'
import styles from './hero.module.css'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroLeft}>
                <h1 className={styles.title}>Cloud Hosting</h1>
                <p className={styles.desc}>The best web hosting solution for your online success</p>
                <div className={styles.services}>
                    <div className={styles.serviceItem}>
                        <TiTick/> Easy To Use Control Panel
                    </div>
                    <div className={styles.serviceItem}>
                        <TiTick/> Secure Hosting
                    </div>
                    <div className={styles.serviceItem}>
                        <TiTick/> Website Maintenance
                    </div>
                </div>
            </div>
            <div>
                <Image src={CloudImage} alt="Cloud Image" 
                    width={500} height={500} priority />
            </div>
        </div>
    )
}

export default Hero
// priority for make loading for image in first before loading the another content, if I donn't want this remove this word (priority) from Image tag
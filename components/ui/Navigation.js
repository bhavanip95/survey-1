import styles from './Navigation.module.css'; // Import css modules stylesheet as styles
import Image from 'next/image'

const Navigation = () => {
    return (
        <div className={styles.header}>
            <a href="#default" className={styles.logo}>
                <Image src="/logo.svg" alt="logo" width="180" height="64" />
            </a>
            {/* <div className={styles.headerright}>
                <a className={styles.active} href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div> */}
        </div>
    )
}
export default Navigation;
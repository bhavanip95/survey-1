import { useRouter } from 'next/router'

import SocialLogin from "./SocialLogin";
import styles from './LoginScreen.module.css';
import Card from "../ui/Card";
import Button from "../ui/Button";
const LoginScreen = () => {
    const router = useRouter();
    const signupHandler = (event) => {
        event.preventDefault();
        router.push('signup');
    }

    const loginHandler = (event) => {
        event.preventDefault();
        router.push('dashboard');
    }
    return (
        <Card title="Login to Survey" className={styles.input}>
            <form className={styles.form}>
                <label htmlFor="username" >User Name</label>
                <input type="text" name="username"></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>
                <Button className={styles.loginButton} onClick={loginHandler}> Login</Button>
                <p className={styles.signupText}>Don't have an account?</p>
                <Button className={styles.signupButton} onClick={signupHandler}>Signup</Button>
            </form>
            <SocialLogin />
        </Card>
    );
}

export default LoginScreen;
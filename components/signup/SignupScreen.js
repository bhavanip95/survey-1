import Card from '../ui/Card';
import styles from './SignupScreen.module.css';
import Button from '../ui/Button';

const SignupScreen = (props) => {
    return (
        <Card className={styles.input} title="Signup">
            <form action="">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." />
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
                <label htmlFor="country">Country</label>
                <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>
                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>
                <Button type="submit">Signup</Button>
            </form>
        </Card>
    );
}
export default SignupScreen;
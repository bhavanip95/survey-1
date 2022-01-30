import styles from './Card.module.css';

const Card = (props) => {
    return (
        <div className={`${styles.card} ${props.className}` }>
            <div className={styles.container}>
                {props.title && <h3 className={styles.title}>{props.title}</h3>}
                {props.children}
            </div>
        </div>
    );
}

export default Card;
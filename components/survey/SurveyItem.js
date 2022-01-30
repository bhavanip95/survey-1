import Button from "../ui/Button";
import Card from "../ui/Card";
import styles from './SurveyItem.module.css';
import { useRouter } from "next/router";

const SurveyItem = (props) => {
    const router = useRouter();

    const editSurveyHandler = (event) =>{
        event.preventDefault();
        console.log("Editing Survey");
        router.push('survey/'+props.data.id);
    }

    const deleteSurveyHandler = (event) => {
        event.preventDefault();
        console.log("Delete Handler");
    }
    return(
        <Card title={props.data.title} className={styles.surveyItem}>
            <p>{props.data.description}</p>
            <span>{props.data.questions_count}</span>
            <Button onClick={editSurveyHandler}>Edit Survey</Button>
            <Button onClick={deleteSurveyHandler}>Delete Survey</Button>
        </Card>
    )
}
export default SurveyItem;
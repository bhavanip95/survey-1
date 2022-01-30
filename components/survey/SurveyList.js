import SurveyItem from "./SurveyItem";
import styles from './SurveyList.module.css';

const DATA = [
    {
        'id': '1',
        'title': 'Survey Title',
        'description': 'Survey Description',
        'questions_count': 10,
    }
];

const SurveyList = () => {
    return (
        <div className={styles.survey}>
            {
                DATA.map(survey => {
                    return <SurveyItem data={survey} key={survey.id} />;
                })
            }
        </div>
    );
}
export default SurveyList;
import React from 'react';

import AppBar from 'src/components/common/AppBar';
import BottomTabBar from 'src/components/common/BottomTabBar';

import Button from '@material-ui/core/Button';

import styles from './styles.scss'
import SubjectsApi from "../../api/subjects";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MemesApi from "../../api/memes";

const subjectsApi = new SubjectsApi();
const memesApi = new MemesApi();

class MemePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '5db4fad8c187fc405e45d1ea',
            subjects: null,
            subject: null,
            meme: null,
            progress: {
                score: 0,
                streak: 0,
                attempts: 0,
            }
        };

        this.switchRoute = this.switchRoute.bind(this);
        this.onSubjectSelected = this.onSubjectSelected.bind(this);
        this.onChooseResponse = this.onChooseResponse.bind(this);
        this.onShowDetails = this.onShowDetails.bind(this);
    }

    componentDidMount() {
        subjectsApi.listSubjects()
            .then(({ data }) => this.setState({ subjects: data.payload.subjects }))
            .catch(console.error)

    }

    switchRoute(route) {
        this.props.history.push('/' + route)
    };

    onSubjectSelected(event) {
        const targetSubject = this.state.subjects.find(s => s.id === event.target.value);
        const { userId } = this.state;

        memesApi.nextMeme(userId, targetSubject.id).then(({ data }) => {
            return this.setState({ meme: data.payload.meme });
        });

        this.setState({
            subject: targetSubject
        })
    }

    onChooseResponse(response) {
        const { meme, userId, subject } = this.state;
        memesApi
            .answer(meme.id, userId, null, response)
            .then(_ => memesApi.nextMeme(userId, subject.id).then(({ data }) => {
                return this.setState({ meme: data.payload.meme });
            }));
    }

    onShowDetails() {

    }

    render() {
        const { subject, subjects, meme } = this.state;

        let body = null;

        if (!subjects) {
            body = (<div>Loading subjects</div>);
        }

        if (subjects && !subject) {
            body = (
                <div className={styles.contentWrapper}>
                    <p>Choose a subject to begin learning fun...</p>
                    <Select
                        label={'Subject'}
                        value={subject ? subject.id : 'ns'}
                        onChange={this.onSubjectSelected}
                        displayEmpty
                        name="subjects"
                        className={styles.selectSubject}
                        variant={'outlined'}
                    >
                        <MenuItem value={'ns'}>not selected</MenuItem>
                        {
                            subjects.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)
                        }
                    </Select>
                </div>
            );
        }

        if (meme) {
            body = (
                <div>
                    <SessionStats
                        score={this.state.progress.score}
                        streak={this.state.progress.streak}
                        total={this.state.progress.attempts}
                        subject={subject.name}/>
                    <MemeRepr imageUrl={meme.url}/>
                    <AnswerButtons onCorrect={() => this.onChooseResponse('correct')}
                                   onIncorrect={() => this.onChooseResponse('incorrect')}
                    />
                </div>
            );
        }

        return (
            <div>
                <AppBar title={'Meme Flow'}/>
                <div className={styles.contentWrapper}>
                    {body}
                </div>
                <BottomTabBar value={'learn'} onTabChange={this.switchRoute}/>
            </div>
        );
    }

}

const SessionStats = ({ streak, score, total, subject }) => {

    return (
        <div>
            <div className={styles.subjectLabel}>{subject}</div>
            <div className={styles.scores}>
                <div>Score {score}/{total}</div>
                <div>Streak {streak}</div>
            </div>
        </div>
    );

};

const AnswerButtons = ({ onIncorrect, onInfo, onCorrect }) => {

    return (
        <div className={styles.answerButtons}>
            <Button variant="outlined" style={{ 'color': 'red' }} onClick={onIncorrect}>Incorrect</Button>
            <Button variant="outlined" style={{ 'color': 'gray' }} onClick={onInfo}>Info</Button>
            <Button variant="outlined" style={{ 'color': 'green' }} onClick={onCorrect}>Correct</Button>
        </div>
    );

};

const MemeRepr = ({ imageUrl }) => {

    return (
        <div className={styles.memeRepr}>
            <img src={imageUrl} alt='meme'/>
        </div>
    );

};

export default MemePage;
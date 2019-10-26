import React from 'react';

import AppBar from 'src/components/common/AppBar';
import BottomTabBar from 'src/components/common/BottomTabBar';

import Button from '@material-ui/core/Button';

import styles from './styles.scss'

class MemePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            route: null
        };

        this.switchRoute = this.switchRoute.bind(this)
    }

    switchRoute(route) {
        this.props.history.push('/' + route)
    };

    render() {
        const { route } = this.state;

        return (
            <div>
                <AppBar title={'Meme Flow'}/>
                <Swiper imageUrl={'https://memegen.link/_YWZyYWlkCWEvYQkJ.jpg'}/>
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

const Swiper = ({ imageUrl }) => {

    return (
        <div>
            <SessionStats score={8} streak={1} total={10} subject={'Chemistry'}/>
            <MemeRepr imageUrl={imageUrl}/>
            <AnswerButtons/>
        </div>
    );

};


export default MemePage;
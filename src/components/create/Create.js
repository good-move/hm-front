import React from 'react';

import AppBar from 'src/components/common/AppBar';
import BottomTabBar from 'src/components/common/BottomTabBar';

import SubjectsApi from "../../api/subjects";
import MemesApi from "../../api/memes";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const subjectsApi = new SubjectsApi();
const memesApi = new MemesApi();

import styles from './styles.scss'

export default class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            currentSubject: null,
            creating: false,
            generatedImage: null,
            summary: "",
        };

        this.switchRoute = this.switchRoute.bind(this);
        this.onSubjectSelected = this.onSubjectSelected.bind(this);
        this.generateMeme = this.generateMeme.bind(this);
        this.onApproveImage = this.onApproveImage.bind(this);
        this.onRejectImage = this.onRejectImage.bind(this);
        this.onSummaryChanged = this.onSummaryChanged.bind(this);
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
        this.setState({
            currentSubject: targetSubject
        })
    }

    generateMeme() {
        const self = this;

        const { currentSubject, summary } = this.state;
        if (!currentSubject) {
            console.log("Subject is not chosen");
            return;
        }

        self.setState({ creating: true }, () => {
            memesApi.generateMeme(currentSubject.id, summary)
                .then(({ data }) => {
                    console.log(data);
                    return this.setState({
                        creating: false,
                        generatedImage: data.payload.image,
                        currentSubject: null,
                        summary: "",
                    });
                })
                .catch(err => {
                    console.log(err);
                    self.setState({ creating: false });
                });
        });

    }

    onApproveImage(imageId) {
        this.decideOnImage(imageId, 'approve');
    }

    onRejectImage(imageId) {
        this.decideOnImage(imageId, 'reject');
    }

    decideOnImage(imageId, decision) {
        memesApi.validateGeneratedImage(imageId, decision)
            .then(_ => this.setState({ generatedImage: null }))
    }

    onSummaryChanged(event) {
        const sanitized = event.target.value;
        if (sanitized && sanitized.length > 0) {
            this.setState({ summary: sanitized })
        }
    }

    render() {

        const { subjects, currentSubject, creating, generatedImage, summary } = this.state;

        let body = (
            <div className={styles.contentWrapper}>
                <p>Generate a meme to augment students' learning experience</p>
                <p>Select a subject and we will do the rest...</p>

                <Select
                    label={'Subject'}
                    value={currentSubject ? currentSubject.id : 'ns'}
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
                <TextField onChange={this.onSummaryChanged} value={summary} variant={'outlined'} label={'Caption'}/>

                <div>
                    <Button onClick={this.generateMeme}>Generate</Button>
                </div>
            </div>
        );

        if (creating) {
            body = <div>Generating...</div>;
        }

        if (generatedImage) {
            body = (
                <div className={styles.contentWrapper} style={{'textAlign': 'center'}}>
                    <h4 style={{'marginTop':'24px'}}>Meme generated: both funny and educational. Students are gonna love it</h4>
                    <img src={generatedImage.url} className={styles.generatedImg}/>

                    <Button onClick={() => this.onApproveImage(generatedImage.id)}>Accept</Button>
                    <Button onClick={() => this.onRejectImage(generatedImage.id)}>Reject</Button>
                </div>
            );
        }

        return (
            <div>
                <AppBar title={'Upload a meme'}/>
                {body}
                <BottomTabBar value={'create'} onTabChange={this.switchRoute}/>
            </div>
        );

    }

}

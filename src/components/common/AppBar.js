import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        flexGrow: 1,
        'z-index': 100
    },
    title: {
        flexGrow: 1,
    },
}));

const ButtonAppBar = ({ title }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={1} style={{'backgroundColor': '#fff', 'color': '#000'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0
    },
});

const SimpleBottomNavigation = ({ value, onTabChange }) => {
    const classes = useStyles();

    return (
        <BottomNavigation
            value={value}
            onChange={(_, value) => onTabChange(value)}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Learn" icon={<ContactsRoundedIcon/>} value={'learn'}/>
            <BottomNavigationAction label="Create" icon={<AddCircleRoundedIcon/>} value={'create'}/>
            <BottomNavigationAction label="Favorites" icon={<FavoriteRoundedIcon/>} value={'favorites'}/>
            <BottomNavigationAction label="Profile" icon={<PersonRoundedIcon/>} value={'profile'}/>
        </BottomNavigation>
    );
};

export default SimpleBottomNavigation;
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {resetHobbiesAction} from '../actions/actions';

const ResetHobbiesInRedux = () => {
    const tempHobbiesArray = useSelector(state => state.hobbies);  // default hobbies coming from redux store
    const dispatch = useDispatch(); // to call actions which contains methods to access state inside reducers

    //reset checkbox ischecked to false
    let resetHobbies = [...tempHobbiesArray];
    resetHobbies.forEach( (val) => {
        val.ischecked = false;
    });
    dispatch(resetHobbiesAction(resetHobbies));
    //reset checkbox ischecked to false
};

export default ResetHobbiesInRedux;
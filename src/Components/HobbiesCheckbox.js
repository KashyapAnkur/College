import React from 'react';

function HobbiesCheckbox(props) {
    return (
        <>
            {props.value}<input {...props.register} className="checkbox" type="checkbox" id={props.id} checked={props.ischecked} value={props.value} onChange={props.isChecked} />&nbsp;
        </>
    )
}

export default HobbiesCheckbox;
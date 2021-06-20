import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import FormComponent from './FormComponent';
import {resetHobbiesAction, deleteUser as deleteUsr} from '../actions/actions';

function UserList() {
    const state = useSelector(state => state.users);
    const [isClose, setIsClose] = useState("none");
    const [editId,setEditId] = useState();
    const tempHobbiesArray = useSelector(state => state.hobbies);  // default hobbies coming from redux store
    const dispatch = useDispatch(); // to call actions which contains methods to access state inside reducers

    const toggleClose = (val,id=null) => {  // show or hide registration form
        //reset checkbox ischecked to false
        let resetHobbies = [...tempHobbiesArray];
        resetHobbies.forEach( (val) => {
            val.ischecked = false;
        });
        dispatch(resetHobbiesAction(resetHobbies));
        //reset checkbox ischecked to false
        setIsClose(val);
        setEditId(id);
    }

    const deleteUser = (maxId) => {
        dispatch(deleteUsr(maxId));
    }

    return (
        <center>
            <Header />
            <div className="editModal" style={{display: isClose}}>
                <div className="editContent">
                    <span className="close" onClick={() => toggleClose("none")}>&times;</span><br />
                    <FormComponent toggleClose={toggleClose} editId={editId}/>
                </div>
            </div>

            {state.length > 0 && <table className="usertable" border="2" cellPadding="2">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Birth Date</td>
                        <td>Address</td>
                        <td>Gender</td>
                        <td>College</td>
                        <td>Hobbies</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {state.map( (val) => {
                        return (
                            <tr key={val.maxId}>
                                <td>{val.name}</td>
                                <td>{val.date}</td>
                                <td>{val.address}</td>
                                <td>{val.radio}</td>
                                <td>{val.colleges}</td>
                                <td>{val.hobby.join(",")}</td>
                                <td>
                                    <button className="edit" onClick={() => toggleClose("block",val.maxId)}>Edit</button>&nbsp;&nbsp;
                                    <button className="delete" onClick={() => deleteUser(val.maxId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>}{state.length < 1 && <h2>No Data</h2>}
        </center>
    )
}

export default UserList;
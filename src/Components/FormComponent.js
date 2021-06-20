import React,{useEffect, useState} from 'react';
import HobbiesCheckbox from './HobbiesCheckbox';
import {useSelector, useDispatch} from 'react-redux';
import {setisChecked as ischck, updateUserData} from '../actions/actions';
import axios from 'axios';

function FormComponent({editId, toggleClose}) {
    //from redux
    const [isHobbyDisabled, setIsHobbyDisabled] = useState('none');
    const tempHobbiesArray = useSelector(state => state.hobbies);  // default hobbies coming from redux store
    const state = useSelector(state => state);
    //from redux
    const dispatch = useDispatch(); // to call actions which contains methods to access state inside reducers

    const [hobbies,setHobbies] = useState([]);
    const [colleges, setColleges] = useState([]);

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [date, setDate] = useState();
    const [gender, setGender] = useState();
    const [college, setCollege] = useState();
    const [hobby, setHobby] = useState([]);
    const [otherHobby, setOtherHobby] = useState([]);
    
    //edit user
        let editdata = state.users.filter( (data) => {
            return data.maxId === editId;
        });

        useEffect( () => {
            setName(editdata.length ? editdata[0].name : '');
            setAddress(editdata.length ? editdata[0].address : '');
            setDate(editdata.length ? editdata[0].date : '');
            setGender(editdata.length ? editdata[0].radio : '');
            setCollege(editdata.length ? editdata[0].colleges : '');
            setHobby(editdata.length ? editdata[0].hobby : '');
            
            //alter checkboxes on edit particular user
            let userHobbies = [...tempHobbiesArray];
            if(editdata.length){
                userHobbies.forEach( (val) => {
                    editdata[0].hobby.forEach( (val2) => { // user hobbies array
                        if(val.value === val2){
                            val.ischecked = true;
                        }
                    });
                });
                setHobbies(userHobbies);

                //identify whether otherhobby is present
                let t = [...userHobbies];
                let u = [];
                t.forEach((val) => {
                    u.push(val.value);
                }); // default hobbies array ["Reading","Gaming","Travelling","Drawing"]
                
                let oh = editdata[0].hobby.filter( (val) => {  // default hobbies
                    return !u.join(",").includes(val);
                });

                if(oh.length > 0){
                    setIsHobbyDisabled("block");
                    setOtherHobby(oh);  // if other hobby is there then assign it to setHobby state
                } else {
                    setIsHobbyDisabled("none");
                    setOtherHobby([]);
                }
                //identify whether otherhobby is present
            }
            //alter checkboxes on edit particular user
        }, [editId]);
    //edit user

    useEffect(() => {
        axios.get("http://universities.hipolabs.com/search?name=middle")
        .then( (res) => {
            setColleges(res.data);
        })
        .catch( (err) => {
            alert("Something went wrong");
        })
    }, []);

    const isChecked = (e) => {  // select & deselect hobbies checkboxes
        setName(e.target.name === 'name' ? e.target.value : name);
        setAddress(e.target.name === 'address' ? e.target.value : address);
        setDate(e.target.name === 'date' ? e.target.value : date);
        setGender(e.target.name === 'radio' ? e.target.value : gender);
        setCollege(e.target.name === 'colleges' ? e.target.value : college);
        setOtherHobby(e.target.name === 'otherhobby' ? e.target.value : otherHobby);
        let temp = tempHobbiesArray;
        temp.forEach( (hobby) => {
            if(e.target.value === hobby.value) {
                hobby.ischecked = hobby.ischecked ? false : true;
            }
        });
        setHobbies(temp);
        let tempHobbies = [...hobbies];   // hobbies consists of all 4 default hobbies

        let hob = [];
        tempHobbies.forEach( (val) => {
            if(val.ischecked === true) {
                hob.push(val.value);
            }
        });
        
        if(e.target.name === 'otherhobby' && e.target.value.length < 1) {
            setOtherHobby([]);
        }

        setHobby(hob);
        dispatch(ischck(temp));  // update redux and then it updates checkboxes
    }

    const addOtherHobby = () => {
        setIsHobbyDisabled(isHobbyDisabled === 'none' ? 'block' : 'none');
    }

    useEffect( () => {
        if(otherHobby.length > 0) {
            let uniqueChars = hobby.filter( (val, index) => { //remove duplicate hobbies
                return hobby.indexOf(val) === index;
            });
            setHobby(uniqueChars);
        }
    }, [otherHobby]);

    const saveData = () => {
        let uniqueChars = hobby.concat(otherHobby);
        let hobbies = uniqueChars.filter( (val, index) => { //remove duplicate hobbies
            return uniqueChars.indexOf(val) === index;
        });
        let updatedUserData = {
            name: name,
            address: address,
            colleges: college,
            date: date,
            hobby:[...hobbies],
            radio: gender,
            maxId: editId
        }
        dispatch(updateUserData(updatedUserData));
        toggleClose("none");
    }

    const checkUserData = () => {
        if(name.trim().length > 0 && address.trim().length > 0 && college.trim().length > 0 && date.trim().length > 0 && hobbies.length > 0 && gender.trim().length > 0) {
            if(isHobbyDisabled === 'block'){
                if(otherHobby.length > 0){
                    saveData();
                }
            } else {
                saveData();
            }
        }
    }

    return (
        <div className="registrationModalContent">
            <input value={name} onChange={isChecked} name="name" className="input" type="text"  placeholder="Enter name" /><br />
            {!name && <span className="editFormError">Enter name</span>}<br /><br />
            
            <input value={date} onChange={isChecked} name="date" className="input" type="date" /><br />
            {!date && <span className="editFormError">Enter date</span>}<br /><br />
            
            <textarea value={address} onChange={isChecked} name="address" className="textarea" placeholder="Enter address"></textarea><br />
            {!address && <span className="editFormError">Enter address</span>}<br /><br />
            
            Male<input checked={gender === 'male' ? 'checked' : ''} name="radio" onChange={isChecked} type="radio" className="radio" value="male"/>&nbsp;&nbsp;&nbsp;
            Female<input checked={gender === 'female' ? 'checked' : ''} name="radio" onChange={isChecked} type="radio" className="radio" value="female"/><br />
            {!gender && <span className="editFormError">Choose gender</span>}<br /><br />
            
            <select className="select" onChange={isChecked} name="colleges" value={college}>
                <option value="">--Select College--</option>
                {colleges.map( (e) => {
                    return (
                        <>
                            <option key={e.web_pages[0]} value={e.name}>{e.name}</option>
                        </>
                    )
                })}
            </select><br />
            {!college && <span className="editFormError">Select College</span>}<br /><br />
            

            <strong>Hobbies:</strong><br />
            {hobbies && hobbies.map( (hobby) => { // default checkbox values coming from redux
                return <HobbiesCheckbox key={hobby.id} isChecked={isChecked} {...hobby}/>
            })}<br />
            {hobby.length < 1 && <span className="editFormError">Choose hobbies</span>}<br /><br />
            
            
            <button name="otherhobby" className="otherhobbyButton" onClick={addOtherHobby}>Other hobby</button><br /><br />
            <input style={{display: isHobbyDisabled}} type="text" onChange={isChecked} placeholder="Enter your hobby" value={otherHobby} name="otherhobby"/><br />
            {isHobbyDisabled === 'block' && (otherHobby.length < 1 && <span className="editFormError">Enter hobby</span>)}<br /><br />
            <button onClick={checkUserData} className="addUser">Save user</button>
        </div>
    )
}

export default FormComponent;
import React,{useState, useEffect} from 'react';
import HobbiesCheckbox from './HobbiesCheckbox';
import {useSelector, useDispatch} from 'react-redux';
import {setisChecked as ischck, addUser as adUsr, resetHobbiesAction} from '../actions/actions';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Header from './Header';

function UserForm() {
    const [isHobbyDisabled, setIsHobbyDisabled] = useState('none');
    const tempHobbiesArray = useSelector(state => state.hobbies);  // default hobbies coming from redux store
    const state = useSelector(state => state);
    const [hobbies,setHobbies] = useState(tempHobbiesArray);
    const [colleges, setColleges] = useState([]);
    
    const dispatch = useDispatch(); // to call actions which contains methods to access state inside reducers
    const { reset, control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm();  // used react hook form for form data handling and validation

    const onSubmit = data => {
        if(data.hasOwnProperty("otherhobby")) {    // checking if otherhobby is present in data object
            data.hobby.push(data.otherhobby);      // if otherhobby is present in data object then push its value to hobby array
            delete data.otherhobby;                // after pushing otherhobby value to hobby array delete otherhobby
        }

        let maxId = 0;
        if(state.users.length) { // if one or more users are present in redux store
            let t = [];
            state.users.forEach( (val) => {
                t.push(val.maxId);     //generate unique id
            });
            maxId = Math.max(...t) + 1; // extract maximum id no from array and adds 1 to it and store new user with the later id in redux
            data.maxId = maxId;
        } else {
            data.maxId = maxId; //generate unique id
        }

        dispatch(adUsr(data));
        //reset checkbox ischecked to false
        let resetHobbies = [...tempHobbiesArray];
        resetHobbies.forEach( (val) => {
            val.ischecked = false;
        });
        dispatch(resetHobbiesAction(resetHobbies));
        //reset checkbox ischecked to false
        reset(); // reset form after submitting
    }

    useEffect(() => {
        axios.get("http://universities.hipolabs.com/search?name=middle")
        .then( (res) => {
            setColleges(res.data);
        })
        .catch( (err) => {
            console.log(err);
        })
    }, []);

    const isChecked = (e) => {  // select & deselect hobbies checkboxes
        let temp = tempHobbiesArray;
        temp.forEach( (hobby) => {
            if(e.target.value === hobby.value) {
                hobby.ischecked = hobby.ischecked ? false : true;
            }
        });
        setHobbies(temp);
        dispatch(ischck(temp));
    }

    const addOtherHobby = () => {
        control.unregister("otherhobby"); // when hide other hobby then unregister otherhobby from form data object
        setIsHobbyDisabled(isHobbyDisabled === 'none' ? 'block' : 'none');
    }

    useEffect(() => {})

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className="registrationModalContent">
                <input {...register("name", { required: true })} className="input" type="text" placeholder="Enter name" /><br />
                {errors.name && <span className="errors">This field is required</span>}<br /><br />

                <input {...register("date", { required: true })} className="input" type="date" /><br />
                {errors.date && <span className="errors">This field is required</span>}<br /><br />

                <textarea {...register("address", { required: true })} className="textarea" placeholder="Enter address"></textarea><br />
                {errors.address && <span className="errors">This field is required</span>}<br /><br />

                Male<input {...register("radio", { required: true })} type="radio" className="radio" value="male"/>&nbsp;&nbsp;&nbsp;
                Female<input {...register("radio", { required: true })} type="radio" className="radio" value="female"/><br />
                {errors.radio && <span className="errors">This field is required</span>}<br /><br />

                <select {...register("colleges", { required: true })} className="select">
                    <option value="">--Select College--</option>
                    {colleges.map( (e) => {
                        return (
                            <>
                                <option key={e.web_pages[0]} value={e.name}>{e.name}</option>
                            </>
                        )
                    })}
                </select><br />
                {errors.colleges && <span className="errors">This field is required</span>}<br /><br />

                <strong>Hobbies:</strong><br />
                {hobbies.map( (hobby) => { // default checkbox values coming from redux
                    return <HobbiesCheckbox key={hobby.id} register={isHobbyDisabled !== "block" ? register("hobby", { required: true }) : null} isChecked={isChecked} {...hobby}/>
                })}<br />
                {errors.hobby && <span className="errors">This field is required</span>}<br />
                
                <button name="otherhobby" className="otherhobbyButton" onClick={addOtherHobby}>Other hobby</button><br />
                {isHobbyDisabled === "block" ? <><input {...register("otherhobby", { required: true })} className="otherHobby" style={{display: isHobbyDisabled}} type="text" placeholder="Enter your hobby"/><br /></> : ""}
                {errors.otherhobby && <span className="errors">This field is required</span>}<br />
                <button className="addUser">Add user</button>
            </form>
        </>
    )
}

export default UserForm;
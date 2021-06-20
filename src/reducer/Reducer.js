const initialState = {
    hobbies: [
        {id:1,value:"Reading",ischecked:false},
        {id:2,value:"Gaming",ischecked:false},
        {id:3,value:"Travelling",ischecked:false},
        {id:4,value:"Drawing",ischecked:false}
    ],
    users: []
};

function Reducer(state = initialState, action) {
    switch(action.type) {
        case "setUnset" : {
            state.hobbies = [...action.hobbiesArray]; // spread operator so to avoid mutating state which cause problem in re-rendering
            return state;
        }
        case "addUser": {
            let temp = [...state.users];
            temp.push(action.user);
            state.users = [...temp.reverse()];    // reverse means the new user will be displayed on top
            return state;
        }
        case "resethobbies": {
            state.hobbies = [...action.hobbies]
            return state;
        }
        case "updateUserData": {
            let temp = state.users.filter( (val) => {
                return val.maxId !== action.updatedData.maxId;
            });
            temp.push(action.updatedData);
            state.users = [...temp.reverse()];
            return state;
        }
        case "deleteuser": {
            let restUsers = state.users.filter( (val) => {
                return val.maxId !== action.maxId
            });
            state.users = [...restUsers.reverse()];
            return state;
        }
        default: {
            return state;
        }
    }
}

export default Reducer;
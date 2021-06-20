const setisChecked = (hobbiesArray) => ({type: "setUnset", hobbiesArray: hobbiesArray});
const addUser = (user) => ({type: "addUser", user: user});
const resetHobbiesAction = (hobbies) => ({type:"resethobbies", hobbies: hobbies});
const updateUserData = (updatedData) => ({type:"updateUserData", updatedData: updatedData});
const deleteUser = (maxId) => ({type:"deleteuser", maxId: maxId});
export {setisChecked, addUser, resetHobbiesAction, updateUserData, deleteUser};
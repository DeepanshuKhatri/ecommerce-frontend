import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
    users:{
        name:"",
        email:"",
        role:"",
        number:"",
        uid:""
    }
};

export const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        addUser:(state, action)=>{
            state.users = action.payload
            state.isLoggedIn=true
            console.log(state.users);
        },
        removeUser:(state)=>{
            state.users = initialState.users;
        }
    }
})
export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
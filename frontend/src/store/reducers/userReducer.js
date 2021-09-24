const userReducer = (state="Sarah",action) => {
    switch(action.type){
        case "updateUser":
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
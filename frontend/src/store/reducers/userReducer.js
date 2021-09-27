const initState = {
    profile: null,
    error: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOAD_USER_DATA_SUCCESS":
            console.log('load user data success', action.payload)
            return {
                profile: action.payload,
                error: null
            }

        case "LOAD_USER_DATA_FAILED":
            return {
                ...state,
                error: "Could not fetch user's profile"
            }

        default:
            return state;
    }
}

export default userReducer;
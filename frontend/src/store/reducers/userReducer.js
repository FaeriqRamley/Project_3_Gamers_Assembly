const initState = {
    userProfile: null,
    loading: false,
    error: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOAD_USER_DATA":
            console.log('loading user data..')
            return {
                ...state,
                loading: true,
                error: null
            }

        case "LOAD_USER_DATA_SUCCESS":
            console.log('load user data success', action.payload)
            return {
                userProfile: action.payload,
                loading: false,
                error: null
            }

        case "LOAD_USER_DATA_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
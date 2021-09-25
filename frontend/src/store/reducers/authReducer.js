const initState = {
    user: null,
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_FAILURE":
            console.log('login failed', action.payload)
            return {
                ...state,
                authError: 'Login failed'
            }

        case "LOGIN_SUCCESS":
            console.log('login success');
            console.log(action.payload)
            return {
                user: action.payload,
                authError: null
            }

        case "LOGOUT_SUCCESS":
            console.log('logout success');
            return initState;
        
        case "SIGNUP_SUCCESS":
            console.log('signup success');
            return {
                user: action.payload,
                authError: null
            }
        case "SIGNUP_FAILED":
            console.log('signup failed');
            return {
                ...state,
                authError: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;
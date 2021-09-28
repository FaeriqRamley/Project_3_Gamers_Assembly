const initState = {
    user: null,
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_FAILED":
            console.log('login failed', action.payload)
            return {
                ...state,
                authError: action.payload
            }

        case "LOGIN_SUCCESS":
            console.log('login success');
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
            console.log('signup failed', action.payload);
            return {
                ...state,
                authError: action.payload
            }

        case "USER_AUTHORIZED":
            console.log('user authorized');
            return {
                user: action.payload,
                authError: null
            }
        case "USER_NOT_AUTHORIZED":
            console.log('user not authorized', action.payload);
            return {
                ...state,
                authError: null
            }
        
        case "CHANGE_PASSWORD_SUCCESS":
            console.log('change password success')
            return {
                user: action.payload,
                authError: null
            }
        
        case "CHANGE_PASSWORD_FAILED":
            console.log('change password failed')
            return {
                ...state,
                authError: "Change password failed"
            }

        case "UPDATE_PROFILE_SUCCESS":
            console.log('update profile success');
            return {
                user: action.payload,
                authError: null
            }

        case "UPDATE_PROFILE_FAILED":
            console.log('update profile failed');
            return {
                ...state,
                authError: "Could not update profile"
            }

        default:
            return state;
    }
}

export default authReducer;
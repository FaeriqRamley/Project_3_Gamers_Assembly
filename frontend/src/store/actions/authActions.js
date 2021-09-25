// user log in
export const logIn = (credentials) => {
    return async (dispatch, geStates) => {
        try {
            const res = await fetch("/login", { 
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            })

            const data = await res.json();

            if (res.status === 400) {
                console.log(data.errors)
                throw Error(data)
            }
            
            console.log('login user data', data)
            dispatch({ type: "LOGIN_SUCCESS", payload: data })
        } catch (err) {
            console.log('login error', err.data)
            dispatch({ type: "LOGIN_FAILED", payload: err.message })
        }
    }
}

// user log out
export const logOut = () => {
    return dispatch => {
        fetch("/logout", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application//json",
            }
        })
        .then(() => {
            dispatch({ type: "LOGOUT_SUCCESS" })
        })
    }
}

// user sign up/register
export const signUp = (credentials) => {
    console.log('signup actions')
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/signup", { 
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            })

            const data = await res.json();

            if (res.status === 400) {
                console.log(data.errors)
            }

            console.log('this is data', data)
            dispatch({ type: "SIGNUP_SUCCESS", payload: data })
        } catch (err) {
            dispatch({ type: "SIGNUP_FAILED", payload: err })
        }
    }
}

// check user
export const userAuth = () => {
    console.log('authenticating user');
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/auth/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json();
            
            // if token not found
            if (res.status === 401) {
                throw Error("Unauthorized: no token found")
            // if token has been tampered
            } else if (res.status === 403) {
                throw Error("Forbidden: invalid token")
            }
            
            console.log('authorized user data', data);
            dispatch({ type: "USER_AUTHORIZED", payload: data })
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "USER_NOT_AUTHORIZED", payload: err.message })
        }
    }
}
export const logIn = (credentials) => {
    return dispatch => {
        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
        .then(data => {
            dispatch({ type: "LOGIN_SUCCESS", payload: data })
        })
        .catch(err => {
            dispatch({ type: "LOGIN_ERROR", payload: err })
        })
    }
}

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
            console.log('this is data', data)
            dispatch({ type: "SIGNUP_SUCCESS", payload: data })
        } catch (err) {
            dispatch({ type: "SIGNUP_ERROR", payload: err })
        }
    }
}
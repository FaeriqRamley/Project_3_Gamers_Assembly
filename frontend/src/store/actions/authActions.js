// user log in
export const logIn = (credentials) => {
    return async (dispatch, geStates) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }

            console.log("login user data", data);
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILED", payload: err.message });
        }
    };
};

// user log out
export const logOut = () => {
    return async (dispatch, getState) => {
        console.log('log out action')
        try {
            const res = await fetch("/api/auth/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            dispatch({ type: "LOGOUT_SUCCESS" });
        } catch (err) {
            console.log(err);
        }
    };
};

// user sign up/register
export const signUp = (credentials) => {
    console.log("signup actions");
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }

            console.log("this is data", data);
            dispatch({ type: "SIGNUP_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "SIGNUP_FAILED", payload: err.message });
        }
    };
};

// check user
export const userAuth = () => {
    console.log("authenticating user");
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/api/auth/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            // if token not found
            if (res.status === 401) {
                throw Error("Unauthorized: no token found");
                // if token has been tampered
            } else if (res.status === 403) {
                throw Error("Forbidden: invalid token");
            }

            console.log("authorized user data", data);
            dispatch({ type: "USER_AUTHORIZED", payload: data });
        } catch (err) {
            console.log(err.message);
            dispatch({ type: "USER_NOT_AUTHORIZED", payload: err.message });
        }
    };
};

// change password
export const changePassword = (credentials) => {
    console.log("change password actions");
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/api/auth/changepassword", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.status === 500) {
                throw Error(data.errors);
            }

            console.log("this is data", data);
            dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "CHANGE_PASSWORD_FAILED", payload: err.message });
        }
    };
};

// update profile
export const updateProfile = (credentials) => {
    console.log("change password actions");
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/api/auth/updateprofile", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.status === 500) {
                throw Error(data.errors);
            }

            console.log("this is updated data", data);
            dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "UPDATE_PROFILE_FAILED", payload: err.message });
        }
    };
};

// update user
export const refreshUserData = () => {
    console.log("refreshing user data");
    return async (dispatch, getState) => {
        try {
            const res = await fetch("/api/auth/userupdates", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            // if token not found
            if (res.status === 401) {
                throw Error("Unauthorized: no token found");
                // if token has been tampered
            } else if (res.status === 403) {
                throw Error("Forbidden: invalid token");
            }

            console.log("refreshed user data", data);
            dispatch({ type: "USER_AUTHORIZED", payload: data });
        } catch (err) {
            console.log(err.message);
            dispatch({ type: "USER_NOT_AUTHORIZED", payload: err.message });
        }
    };
};
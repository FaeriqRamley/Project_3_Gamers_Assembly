export const getUserById = (id) => {
    return async (dispatch, getState) => {
        console.log('getUserByid', id)
        dispatch({ type: "LOAD_USER_DATA" })
        
        try {
            const res = await fetch(`/api/users/user/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.status === 404) {
                throw Error(data.msg);
            }

            console.log("user profile data", data);
            dispatch({ type: "LOAD_USER_DATA_SUCCESS", payload: data });
        } catch (err) {
            console.log('user action error', err.message)
            dispatch({ type: "LOAD_USER_DATA_FAILED", payload: err.message });
        }
    };
};

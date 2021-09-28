export const getUserById = (id) => {
    return async (dispatch, getState) => {
        console.log('getUserByid', id)
        try {
            const res = await fetch(`/api/users/user/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }

            console.log("user profile data", data);
            dispatch({ type: "LOAD_USER_DATA_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "LOAD_USER_DATA_FAILED", payload: err.message });
        }
    };
};

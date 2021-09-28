// get user schedule
export const getSchedule = () => {
    return async (dispatch, geStates) => {
        dispatch({ type: "GET_SCHEDULE" })
        try {
            const res = await fetch(`/api/schedule/populate/timeslot`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            console.log("user schedule data", data);
            dispatch({ type: "GET_SCHEDULE_SUCCESS", payload: data });
        } catch (err) {
            dispatch({ type: "GET_SCHEDULE_FAILED", payload: err.message });
        }
    };
};

function convertTime(values) {
    const timeStart = new Date(values.dateStart.format().split("T")[0]+"T"+values.duration[0].format().split("T")[1])
    const timeEnd = new Date(values.dateStart.format().split("T")[0]+"T"+values.duration[1].format().split("T")[1])
    const duration = timeEnd.getHours() - timeStart.getHours();

    return { timeStart, timeEnd, duration }
}

// add new timeslot
export const addTimeslot = (details) => {
    return async (dispatch, getState) => {
        dispatch({ type: "ADD_TIMESLOT" })
        try {
            const { timeStart, timeEnd, duration } = convertTime(details)

            const input = {
                ownerId: props.userData._id,
                timeStart,
                timeEnd,
                duration
            }

            const res = await fetch("/api/timeslot/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            const data = await res.json();

            console.log(data)
            dispatch({ type: "ADD_TIMESLOT_SUCCESS", payload: data})
        } catch (err) {
            console.log(err)
            dispatch({ type: "ADD_TIMESLOT_FAILED", payload: err.message })
        }
    } 
}

// edit timeslot
export const editTimeslot = (details) => {
    dispatch({ type: "EDIT_TIMESLOT" })
    try {
        const res = await fetch("/api/timeslot/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        const data = await res.json();

        console.log(data)
        dispatch({ type: "EDIT_TIMESLOT_SUCCESS", payload: data})
    } catch (err) {
        console.log(err)
        dispatch({ type: "EDIT_TIMESLOT_FAILED", payload: err.message })
    }
}

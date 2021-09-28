const initState = {
    timeslot:[],
    loading: false,
    error: null
}

const myScheduleReducer = (state=initState,action) => {
    switch(action.type){
        case "GET_SCHEDULE":
            console.log('getting schedule..')
            return {
                ...state,
                loading: true,
            }
        case "GET_SCHEDULE_SUCCESS":
            console.log('get schedule success', action.payload)
            return {
                ...state,
                loading: false,
                error: null,
            }
        case "GET_SCHEDULE_FAILED":
            console.log('get schedule failed', action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
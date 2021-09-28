const initState = {
    timeslots: null,
    loading: false,
    error: null
}

const scheduleReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_SCHEDULE":
            console.log('getting schedule..')
            return {
                ...state,
                loading: true,
            }

        case "GET_SCHEDULE_SUCCESS":
            console.log('get schedule success', action.payload)
            return {
                timeslots: action.payload,
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

        case "ADD_TIMESLOT":
            console.log('adding timeslot..')
            return {
                ...state,
                loading: true,
            }

        case "ADD_TIMESLOT_SUCCESS":
            console.log('add timeslot success', action.payload)
            return {
                ...state,
                loading: false,
                error: null,
            }

        case "ADD_TIMESLOT_FAILED":
            console.log('add timeslot failed', action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case "EDIT_TIMESLOT":
            console.log('editing timeslot..')
            return {
                ...state,
                loading: true,
            }

        case "EDIT_TIMESLOT_SUCCESS":
            console.log('edit timeslot success', action.payload)
            return {
                ...state,
                loading: false,
                error: null,
            }

        case "EDIT_TIMESLOT_FAILED":
            console.log('edit timeslot failed', action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case "REMOVE_TIMESLOT":
            console.log('removing timeslot..')
            return {
                ...state,
                loading: true,
            }

        case "REMOVE_TIMESLOT_SUCCESS":
            console.log('remove timeslot success', action.payload)
            return {
                ...state,
                loading: false,
                error: null,
            }

        case "REMOVE_TIMESLOT_FAILED":
            console.log('remove timeslot failed', action.payload)
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state
        }
}

export default scheduleReducer;
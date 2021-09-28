import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer"
import scheduleReducer from "./scheduleReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    schedule: scheduleReducer
});

export default rootReducer;
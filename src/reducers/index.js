import feedbackReducer from './feedbackReducer';
import loggedReducer from './isLoggedReducer';
import selectedFeedbackReducer from './selectedFeedbackReducer';
import userHashReducer from './userHashReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    feedbacks: feedbackReducer,
    isLogged: loggedReducer,
    currentUserHash: userHashReducer,
    selectedFeedback: selectedFeedbackReducer,
});

export default allReducers;
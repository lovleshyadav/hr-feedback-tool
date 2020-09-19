const feedbackReducer = (state = [], action)=> {
    switch (action.type) {
        case 'GET_USER_FEEDBACK': {
            return action.payload;
        }
        case 'UPDATE_USER_RESPONSE': {
            return true;
        }
        case 'UPDATE_SELECTED_FEEDBACK': {
            return true;
        }
        default:
            return state;
    }
};

export default feedbackReducer;
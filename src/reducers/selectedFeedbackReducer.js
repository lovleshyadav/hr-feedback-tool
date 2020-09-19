const selectedFeedbackReducer = (state = -1, action)=> {
    switch (action.type) {
        case 'SELECTED_FEEDBACK': {
            return action.selectedFeedback;
        }
        default:
            return -1;
    }
};

export default selectedFeedbackReducer;
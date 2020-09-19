export const getUserFeedbacks = (feedbacks) => {
    return {
        type: 'GET_USER_FEEDBACK',
        payload: feedbacks
    }
};

export const updateUserResponse = () => {
    return {
        type: 'UPDATE_USER_RESPONSE',
        payload: []
    };
};

export const selectFeedback = (id) => {
    return {
        type: 'SELECTED_FEEDBACK',
        selectedFeedback: id
    };
};

export const addUserHash = (userHash) => {
    return {
        type: 'ADD_USER_HASH',
        userHash: userHash
    };
};

export const isLoggedIn = () => {
    return {
        type: 'SIGN_IN'
    };
};


export const updateSeletedFeedback = () => {
    return {
        type: 'UPDATE_SELECTED_FEEDBACK',
        payload: []
    };
};
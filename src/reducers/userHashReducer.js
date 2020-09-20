const userHashReducer = (state = -2, action)=> {
    switch (action.type) {
        case 'ADD_USER_HASH':{
            return action.userHash;
        }
        default:
            return -2;
    }
};

export default userHashReducer;
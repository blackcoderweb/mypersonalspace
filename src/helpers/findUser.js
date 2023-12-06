export const findUser = (userList, userName) => { 
    return userList.find(user => user.userName === userName);
};
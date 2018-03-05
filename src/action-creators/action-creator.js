import types from './types';
import axios from 'axios';
import {browserHistory} from 'react-router';


const rootUrl = 'https://social-diplom.herokuapp.com';


export const signUp = (email, password) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/sign-up`, {email, password}).then((returnedData) => {
            if (returnedData.data.success) {
                browserHistory.push('/');
            } else if (returnedData.data.message == 'Email in use') {
                dispatch({
                    type: types.SET_ERROR,
                    errorType: 'emailInUse'
                });
            }
        });
    }
}

export const logIn = (email, password) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/log-in`, {email, password}).then((returnedData) => {
            switch (returnedData.data.message) {
                case 'userNotFound':
                    return dispatch({
                        type: types.SET_ERROR,
                        errorType: 'userNotFound'
                    });
                case 'wrongPassword': 
                    return dispatch({
                        type: types.SET_ERROR,
                        errorType: 'wrongPassword'
                    });
                case 'loggedSuccessfully':
                    localStorage.setItem('token', returnedData.data.token)
                    localStorage.setItem('email', returnedData.data.user.local.email)
                    dispatch({
                        type: types.SET_USER,
                        user: returnedData.data.user
                    });
                    browserHistory.push('/panel');
            }
        });
    }
}

export const profileOnLoad = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`${rootUrl}/profile`, {headers:{token}}
                    ).then((returnedData) => {
                        if (returnedData.data.unauth) {
                            browserHistory.push('/unauthorized');
                        }
                    })
    }
}

export const logOut = (user) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.post(`${rootUrl}/profile`, {user}, {headers:{token}}).then((returnedData) => {
            if (returnedData.data.success) {
                browserHistory.push('/');
                localStorage.clear();
            }
        });
    }
}

export const getAllUsers = (user) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`${rootUrl}/users`, {headers:{token, user}}).then((returnedData) => {
            return dispatch({
                type: types.SET_USER_LIST,
                users: returnedData.data.allUsers
            });
        });            
    }
}

export const getUser = (email) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
         axios.get(`${rootUrl}/get-user`, {headers: {token, email}}).then((returnedData) => {
            return dispatch({
                type: types.SET_USER_TO_LOOK,
                user: returnedData.data.user
            });
        });
    }
}

export const resetState = () => {
    return (dispatch) => {
        return dispatch({
            type: types.RESET_STATE
        });
    }
}

export const setPhoto = (url) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('email');
        axios.post(`${rootUrl}/photo`, {url, user}, {headers: {token}}).then((returnedData) => {
            dispatch({
                type: types.SET_USER,
                user: returnedData.data.user
            });
        });
    }
}

export const changeUserData = (name, lastName, position, team, location, status) => {
    return (dispatch) => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        axios.post(`${rootUrl}/userdata`, {name, lastName, position, team, location, status, email}, {headers: {token}}).then((returnedData) => {
            dispatch({
                type: types.SET_USER,
                user: returnedData.data.user
            });
        });
    }
}

export const resetUserToLook = () => {
    return (dispatch) => {
        dispatch({
            type: types.RESET_USER_TO_LOOK
        });
    }
}

export const deleteAccount = () => {
    return (dispatch) => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        axios.post(`${rootUrl}/delete-user`, {email}, {headers: {token}}).then((returnedData) => {
            console.log(returnedData)
            if (returnedData.data.success) {
                browserHistory.push('/');
            }
        });
    }
}

import {combineReducers} from 'redux';

function user(state = {
    currentUser: null,
    logged: false
}, action) {

    switch (action.type) {
        case 'LOGOUT': {
            return {...state, currentUser: null, logged: false};
        }
        case 'FETCH_USER': {
            return {...state, currentUser: action.payload, logged: true};
        }
    }
    return state
}

function shoppingCart(state = {
    total: 0,
}, action) {

    switch (action.type) {
        case 'UPDATE_TOTAL': {
            return {...state, total: state.total + action.payload};
        }
    }
    return state
}

function pizzas(state = {
    pizzas: [],
}, action) {

    switch (action.type) {
        case 'FETCH_PIZZAS': {
            return {...state, pizzas: action.payload};
        }
    }
    return state
}

function ui(state = {
    isOpenModal: false,
}, action) {

    switch (action.type) {
        case 'TOGGLE_MODAL': {
            return {...state, isOpenModal: action.payload};
        }
    }
    return state
}

export default combineReducers({user, shoppingCart, ui, pizzas});
import {Meteor} from 'meteor/meteor';

export const updateTotal = (price) => {
    return {
        type: 'UPDATE_TOTAL',
        payload: price
    }
};

export const toggleModal = (isOpen) => {
    return {
        type: 'TOGGLE_MODAL',
        payload: isOpen
    }
};

export const logout = () => {
    Meteor.logout();
    return {
        type: 'LOGOUT',
    }
};

export const fetchUser = (user) => {
    return {
        type: 'FETCH_USER',
        payload: user
    }
};

export const fetchPizzas = (pizzas) => {
    return {
        type: 'FETCH_PIZZAS',
        payload: pizzas
    }
};

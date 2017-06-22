import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import Layout from '../imports/ui/containers/Layout';
import Menu from '../imports/ui/containers/Menu';
import Edit from '../imports/ui/containers/Edit';
import About from '../imports/ui/components/About';
import ShoppingCart from '../imports/ui/containers/ShoppingCart';
import {store} from '../imports/ui/storeRedux';
import {Provider} from 'react-redux-meteor';
import {Accounts} from 'meteor/std:accounts-semantic';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
});

const App = (main) => {
    return (
        <div>
            <Provider store={store}>
                <Layout page={main}/>
            </Provider>
        </div>
    )
};

FlowRouter.route('/', {
    name: 'menu',
    action() {
        mount(App, {
            main: <Menu/>,
        });
    },
});

FlowRouter.route('/shoppingcart', {
    name: 'shoppingcart',
    action() {
        mount(App, {
            main: <ShoppingCart/>,
        });
    },
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
        mount(App, {
            main: <About/>,
        });
    },
});

FlowRouter.route('/edit/:_id', {
    name: 'edit',
    action() {
        mount(App, {
            main: Meteor.userId() ? <Edit id={FlowRouter.getParam('_id')}/> : <Menu/>,
        });
    },
});
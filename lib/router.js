import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../imports/ui/App';
import Menu from '../imports/ui/Menu';
import Edit from '../imports/ui/Edit';
import ShoppingCart from '../imports/ui/ShoppingCart';

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

FlowRouter.route('/edit/:_id', {
    name: 'edit',
    action() {
        mount(App, {
            main: Meteor.userId() ? <Edit id={FlowRouter.getParam('_id')}/> : <Menu/>,
        });
    },
});
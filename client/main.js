import React from 'react';
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App';
import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

Meteor.startup(() => {
    render(null, document.getElementById('render-target')
    );
});


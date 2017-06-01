import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children !== this.props.children) {
            return true
        }
    }

    shouldComponentUpdate() {
       return true;
    }

    render() {
        return (
            <div>
                <header>
                    <h2 className="fl">LA PRINCESSE &<br/>
                        les deux MOUSTACHUS"</h2>
                    <div className="fr">
                        <AccountsUIWrapper />
                    </div>
                </header>
                {this.props.main}
            </div>
        );
    }
}


export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, App);
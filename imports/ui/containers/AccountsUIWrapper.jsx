import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-semantic';
import {Modal, Button} from 'semantic-ui-react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import UserMenu from '../components/UserMenu';
import {createContainer} from 'meteor/react-meteor-data';
import { bindActionCreators } from 'redux';

class AccountsUIWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    showModal() {
        this.props.actions.toggleModal(true);
    }

    closeModal() {
        this.props.actions.toggleModal(false);
    }

    logout() {
        Meteor.logout();
        this.props.actions.logout({type: 'LOGOUT'});
        FlowRouter.go('/');
    }

    componentDidMount() {
        Meteor.autorun(() => {
            if (Meteor.user()) this.props.actions.fetchUser(Meteor.user());
        });
    }

    render() {
        const {currentUser, logged, isOpenModal} = this.props;

        return (
            <div>
                {!logged ? <Button onClick={this.showModal.bind(this)}>Login</Button> :
                    <UserMenu logout={() => this.logout()} username={currentUser.username || ''}/>}
                <Modal style={{padding: '30px 20px'}} size={'small'} open={logged ? false : isOpenModal}
                       onClose={this.closeModal.bind(this)}>
                    <Accounts.ui.LoginForm onSignedInHook={this.closeModal.bind(this)} onSignedOutHook={this.closeModal.bind(this)}/>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpenModal: state.ui.isOpenModal,
        currentUser: state.user.currentUser,
        logged: state.user.logged
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsUIWrapper)


import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import {Header, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    // cancel() {
    //     Session.set('pizzas', []);
    //     this.setState({
    //         pizzas: [],
    //         nbPizza: 0
    //     });
    // }

    render() {
        return (
            <div>
                <Header floated="left">
                    <img src="logo.svg" alt="Logo"
                         style={{position: 'absolute', top: '5px', left: '5px', width: '123px', cursor: 'pointer'}}
                         onClick={() => FlowRouter.go('/')}/>
                </Header>
                <Header floated='right'>
                    <AccountsUIWrapper/>
                </Header>
                <Header floated='right'>
                    {this.props.total > 0 && !this.props.currentUser ?
                        <span>
                        {/*<Button onClick={this.cancel.bind(this)}>Annuler</Button>&nbsp;*/}
                            <Button onClick={() => FlowRouter.go('/shoppingcart')}>Proceed to checkout ({this.props.total} &euro;
                                )</Button>
                    </span> : <Button disabled>Empty shoppingcart</Button> }
                </Header>
                <Header floated='right'>
                    <Button onClick={() => FlowRouter.go('/about')}>Contact</Button>
                </Header>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        total: state.shoppingCart.total
    }
}

function mapDispatchToProps(dispatch) {
    return { /*actions: bindActionCreators(actionCreators, dispatch)*/ }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
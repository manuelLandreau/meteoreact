import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Pizzas} from '../../api/pizzas.js';
import Pizza from './Pizza.jsx';
import {List, Button} from 'semantic-ui-react';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
        }
    }

    diplayShoppingCard() {
        let nb = 0;
        if (!!Session.get('pizzas'))
            Session.get('pizzas').map(pizza => nb += parseInt(pizza.nb));
        return nb;
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const price = ReactDOM.findDOMNode(this.refs.price).value.trim();
        const i1 = ReactDOM.findDOMNode(this.refs.textInput1).value.trim();
        const i2 = ReactDOM.findDOMNode(this.refs.textInput2).value.trim();
        const i3 = ReactDOM.findDOMNode(this.refs.textInput3).value.trim();
        const i4 = ReactDOM.findDOMNode(this.refs.textInput4).value.trim();

        const content = {name, price, i1, i2, i3, i4};

        Meteor.call('pizzas.insert', content, () => {
            // Clear form
            ReactDOM.findDOMNode(this.refs.textInput).value = '';
            ReactDOM.findDOMNode(this.refs.price).value = '';
            ReactDOM.findDOMNode(this.refs.textInput1).value = '';
            ReactDOM.findDOMNode(this.refs.textInput2).value = '';
            ReactDOM.findDOMNode(this.refs.textInput3).value = '';
            ReactDOM.findDOMNode(this.refs.textInput4).value = '';
        });
    }

    diplayForm() {
        this.setState({
            displayForm: !this.state.displayForm,
        });
    }

    renderPizzas() {
        return this.props.pizzas.map((pizza) => (
            <Pizza key={pizza._id} updateTotal={this.props.actions.updateTotal} pizza={pizza} currentUser={!this.props.logged}/>
        ));
    }

    componentDidMount() {
        Meteor.autorun(() => {
            Meteor.subscribe('pizzas');
            this.props.actions.fetchPizzas(Pizzas.find({}, {sort: {createdAt: -1}}).fetch());
        });
    }

    render() {
        return (
            <div>
                <List divided verticalAlign='middle' size={'big'}>
                    {this.renderPizzas()}
                </List>
                { this.props.logged ?
                    <Button onClick={this.diplayForm.bind(this)}>Add a new pizza</Button> : ''}
                { this.props.logged && this.state.displayForm ?
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <h2>Ajouter une pizza</h2>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Pizza name"
                        />
                        <input
                            type="text"
                            ref="price"
                            placeholder="Pizza price"
                        />
                        <input
                            type="text"
                            ref="textInput1"
                            placeholder="1st topping"
                        />
                        <input
                            type="text"
                            ref="textInput2"
                            placeholder="2nd topping"
                        />
                        <input
                            type="text"
                            ref="textInput3"
                            placeholder="3rd topping"
                        />
                        <input
                            type="text"
                            ref="textInput4"
                            placeholder="4th topping"
                        />
                        <Button type="submit">Send</Button>
                    </form> : '' }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pizzas: state.pizzas.pizzas,
        currentUser: state.user.currentUser,
        logged: !!state.user.logged
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

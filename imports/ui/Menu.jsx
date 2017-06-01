import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Pizzas } from '../api/pizzas.js';
import Pizza from './Pizza.jsx';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            pizzas: Session.get('pizzas') || [],
            nbPizza: this.diplayShoppingCard()
        };
    }

    diplayShoppingCard() {
        let nb = 0;
        if (!!Session.get('pizzas'))
            Session.get('pizzas').map(pizza => nb += parseInt(pizza.nb));
        return nb;
    }

    updatePizzaNb(pizza) {
        this.setState({
            nbPizza: this.state.nbPizza + parseInt(pizza.nb)
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const prix = ReactDOM.findDOMNode(this.refs.prix).value.trim();
        const i1 = ReactDOM.findDOMNode(this.refs.textInput1).value.trim();
        const i2 = ReactDOM.findDOMNode(this.refs.textInput2).value.trim();
        const i3 = ReactDOM.findDOMNode(this.refs.textInput3).value.trim();
        const i4 = ReactDOM.findDOMNode(this.refs.textInput4).value.trim();

        const content = {name, prix, i1, i2, i3, i4};

        Meteor.call('pizzas.insert', content);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        ReactDOM.findDOMNode(this.refs.prix).value = '';
        ReactDOM.findDOMNode(this.refs.textInput1).value = '';
        ReactDOM.findDOMNode(this.refs.textInput2).value = '';
        ReactDOM.findDOMNode(this.refs.textInput3).value = '';
        ReactDOM.findDOMNode(this.refs.textInput4).value = '';
    }

    diplayForm() {
        this.setState({
            displayForm: !this.state.displayForm,
        });
    }

    renderPizzas() {
        return this.props.pizzas.map((pizza) => (
            <Pizza key={pizza._id} pizza={pizza} currentUser={!this.props.currentUser} updatePizzaNb={this.updatePizzaNb.bind(this)}/>
        ));
    }

    cancel() {
        Session.set('pizzas', []);
        this.setState({
            pizzas: [],
            nbPizza: 0
        });
    }


    render() {
        return (
            <div className="container">
                <div className="fr">
                    {this.state.nbPizza > 0 && !this.props.currentUser ?
                        <span>
                            <button onClick={this.cancel.bind(this)} className="button-warning">Annuler</button>&nbsp;
                            <button onClick={() => FlowRouter.go('/shoppingcart')} className="button-success">Valider ma commande ({this.state.nbPizza})</button>
                        </span> : <strong>Panier vide</strong> }
                </div>
                <div className="clearfix mbm"></div>
                <ul>
                    {this.renderPizzas()}
                </ul>
                { !!this.props.currentUser ?
                    <button onClick={this.diplayForm.bind(this)}>Ajouter un nouvelle pizza</button> : ''}
                { this.props.currentUser && this.state.displayForm ?
                    <form className="new-pizza" onSubmit={this.handleSubmit.bind(this)} >
                        <h2>Ajouter une pizza</h2>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Nom de la pizza"
                        />
                        <input
                            type="text"
                            ref="prix"
                            placeholder="Prix de la pizza"
                        />
                        <input
                            type="text"
                            ref="textInput1"
                            placeholder="1er ingrédient"
                        />
                        <input
                            type="text"
                            ref="textInput2"
                            placeholder="2ème ingrédient"
                        />
                        <input
                            type="text"
                            ref="textInput3"
                            placeholder="3ème ingrédient"
                        />
                        <input
                            type="text"
                            ref="textInput4"
                            placeholder="4ème ingrédient"
                        />
                        <button type="submit">Envoyer</button>
                    </form> : '' }
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('pizzas');
    Meteor.subscribe('nbPizza');
    return {
        pizzas: Pizzas.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, Menu);
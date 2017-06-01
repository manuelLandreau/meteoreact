import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';

export default class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pizzas: Session.get('pizzas') || [],
            prix: 0
        };
        this.state.pizzas.map(pizza => {
            console.log(pizza);
            this.state.prix += parseInt(pizza.prix)
        });
    }

    render() {
        return (
            <div className="container">
                <h4>ShoppingCart</h4>
                <button onClick={() => FlowRouter.go('/')}>Retour</button>
                <p>Recapitulatif : </p>
                <p>Total: { this.state.prix} &euro;</p>
            </div>
        );
    }
}
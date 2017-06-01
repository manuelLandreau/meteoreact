import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Pizza extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleChecked() {
        Meteor.call('pizzas.setChecked', this.props.pizza._id, !this.props.pizza.checked);
    }

    deleteThisPizza() {
        Meteor.call('pizzas.remove', this.props.pizza._id);
    }

    addToShoppingCart(event) {
        event.preventDefault();

        if (!Session.get('pizzas'))
            Session.set({pizzas: []});
        let pizza = {
            nb: ReactDOM.findDOMNode(this.refs.nb).value,
            name: this.props.pizza.content.name,
            prix: this.props.pizza.content.prix,
        };
        Session.set({
            pizzas: [...Session.get('pizzas'), pizza]
        });
        this.props.updatePizzaNb(pizza);
    }

    render() {
        const pizzaClassName = this.props.pizza.checked ? 'checked' : '';

        return (
            <li className={pizzaClassName}>
                { !this.props.currentUser ?
                    <span>
                        <button className="delete" onClick={this.deleteThisPizza.bind(this)}>
                            &times;
                        </button>
                        <button className="delete" onClick={() => FlowRouter.go('/edit/' + this.props.pizza._id)}>
                            <small>Edit</small>
                        </button>
                        indisponible ?
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.props.pizza.checked}
                            onClick={this.toggleChecked.bind(this)}
                        />
                    </span> : ''}
                <span className="text">
                    <strong>
                        {this.props.pizza.content.name}&nbsp;
                    </strong>
                    {this.props.pizza.content.i1}&nbsp;{this.props.pizza.content.i2}&nbsp;{this.props.pizza.content.i3}&nbsp;{this.props.pizza.content.i4}, <i>{this.props.pizza.content.prix} &euro;</i>
                </span>
                { this.props.currentUser ?
                    <span>
                        { !this.props.pizza.checked ?
                            <span style={{float: 'right', marginTop: '-15px'}}>
                                <form onSubmit={this.addToShoppingCart.bind(this)}>
                                    <button type="submit">Commander</button>
                                    <select ref="nb">
                                        {Array(10).fill(1).map((el, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                </form>
                            </span> : <small style={{color: 'red'}}>&nbsp;Indisponible</small>}
                        <div style={{clear: 'right'}}></div>
                    </span>
                    : ''}
            </li>
        );
    }
}
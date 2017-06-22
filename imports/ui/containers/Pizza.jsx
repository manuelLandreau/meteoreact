import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Icon} from 'semantic-ui-react';
import {updateTotal} from '../actions/actions';

class Pizza extends React.Component {

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
            nb: event.target.nb.value,
            name: this.props.pizza.content.name,
            prix: this.props.pizza.content.prix,
        };
        Session.set({
            pizzas: [...Session.get('pizzas'), pizza]
        });
        this.props.dispatch(updateTotal(this.props.pizza.content.prix));
    }

    render() {


        return (
            <List.Item>
                { this.props.currentUser ?
                    <List.Content floated='right'>
                        <span>
                            { !this.props.pizza.checked ?
                                <form onSubmit={this.addToShoppingCart.bind(this)}>
                                    <Button type="submit">Commander</Button>
                                    <select name="nb">
                                        {new Array(10).fill(1).map((el, i) => <option key={i}
                                                                                  value={i + 1}>{i + 1}</option>)}
                                    </select>
                                </form> : <small style={{color: 'red'}}>&nbsp;Indisponible</small>}
                            <div style={{clear: 'right'}}>&nbsp;</div>
                        </span>
                    </List.Content> : ''}
                { !this.props.currentUser ?
                    <List.Content floated='right'>
                        <Button onClick={() => FlowRouter.go('/edit/' + this.props.pizza._id)}>
                            <Icon disabled name='edit'/>
                        </Button>
                        <Button onClick={this.deleteThisPizza.bind(this)}>
                            <Icon disabled name='remove'/>
                        </Button>
                    </List.Content> : ''}
                <List.Content>
                    <strong>
                        {this.props.pizza.content.name}&nbsp;
                    </strong>
                    {this.props.pizza.content.i1}&nbsp;{this.props.pizza.content.i2}&nbsp;{this.props.pizza.content.i3}&nbsp;{this.props.pizza.content.i4},
                    <i>{this.props.pizza.content.prix} &euro;</i>
                    { !this.props.currentUser ?
                        <span>&nbsp;indisponible ?&nbsp;
                            <input
                                type="checkbox"
                                readOnly
                                checked={this.props.pizza.checked}
                                onClick={this.toggleChecked.bind(this)}
                            /></span> : ''}
                </List.Content>
            </List.Item>
        );
    }
}

export default connect(store => {
        return {
        }
    }
)(Pizza)
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Pizzas } from '../api/pizzas.js';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pizza: Pizzas.findOne({_id: this.props.id})
        };
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

        const content = {_id: this.props.id, name, prix, i1, i2, i3, i4};

        Meteor.call('pizzas.update', content);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        ReactDOM.findDOMNode(this.refs.prix).value = '';
        ReactDOM.findDOMNode(this.refs.textInput1).value = '';
        ReactDOM.findDOMNode(this.refs.textInput2).value = '';
        ReactDOM.findDOMNode(this.refs.textInput3).value = '';
        ReactDOM.findDOMNode(this.refs.textInput4).value = '';

        FlowRouter.go('/');
    }

    handleChange(event) {
        let input = event.target.name;
        this.setState({
            pizza: {
                content: {
                    [input]: event.target.value
                }
            }
        })
    }

    render() {
        return (
            <div className="container">
                <button onClick={() => FlowRouter.go('/')}>Retour</button>
                <hr/>
                <form className="new-pizza" onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
                    <h2>Ajouter une pizza</h2>
                    <input
                        type="text"
                        ref="textInput"
                        name="textInput"
                        value={this.state.pizza.content.name}
                        placeholder="Nom de la pizza"
                    />
                    <input
                        type="text"
                        ref="prix"
                        name="prix"
                        placeholder="Prix de la pizza"
                    />
                    <input
                        type="text"
                        ref="textInput1"
                        name="textInput1"
                        value={this.state.pizza.content.i1}
                        placeholder="1er ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput2"
                        name="textInput2"
                        value={this.state.pizza.content.i2}
                        placeholder="2ème ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput3"
                        name="textInput3"
                        value={this.state.pizza.content.i3}
                        placeholder="3ème ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput4"
                        name="textInput4"
                        value={this.state.pizza.content.i4}
                        placeholder="4ème ingrédient"
                    />
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        );
    }
}

export default createContainer(() => {
    return {}
}, Edit);
import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

export default class Edit extends React.Component {

    constructor(props) {
        super(props);
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

        const content = {_id: this.props.pizza._id, name, price, i1, i2, i3, i4};

        Meteor.call('pizzas.update', content, () => {
            // Clear form
            ReactDOM.findDOMNode(this.refs.textInput).value = '';
            ReactDOM.findDOMNode(this.refs.price).value = '';
            ReactDOM.findDOMNode(this.refs.textInput1).value = '';
            ReactDOM.findDOMNode(this.refs.textInput2).value = '';
            ReactDOM.findDOMNode(this.refs.textInput3).value = '';
            ReactDOM.findDOMNode(this.refs.textInput4).value = '';

            FlowRouter.go('/');
        });
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
            <div>
                <button onClick={() => FlowRouter.go('/')}>Back</button>
                <hr/>
                <form onSubmit={this.handleSubmit.bind(this)}
                      onChange={this.handleChange.bind(this)}>
                    <h2>Ajouter une pizza</h2>
                    <input
                        type="text"
                        ref="textInput"
                        name="textInput"
                        defaultValue={this.props.pizza.content.name}
                        placeholder="Nom de la pizza"
                    />
                    <input
                        type="text"
                        ref="price"
                        name="price"
                        defaultValue={this.props.pizza.content.price}
                        placeholder="Prix de la pizza"
                    />
                    <input
                        type="text"
                        ref="textInput1"
                        name="textInput1"
                        defaultValue={this.props.pizza.content.i1}
                        placeholder="1er ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput2"
                        name="textInput2"
                        defaultValue={this.props.pizza.content.i2}
                        placeholder="2ème ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput3"
                        name="textInput3"
                        defaultValue={this.props.pizza.content.i3}
                        placeholder="3ème ingrédient"
                    />
                    <input
                        type="text"
                        ref="textInput4"
                        name="textInput4"
                        defaultValue={this.props.pizza.content.i4}
                        placeholder="4ème ingrédient"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}
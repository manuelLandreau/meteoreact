import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pizzas = new Mongo.Collection('pizzas');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pizzas', function tasksPublication() {
        return Pizzas.find();
    });
    Meteor.publish('nbPizza', () => {
        return Session.get('pizzas') || [];
    });
}

Meteor.methods({
    'pizzas.insert'(content) {
        check(content, Object);

        // Make sure the user is logged in before inserting a pizza
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Pizzas.insert({
            content,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'pizzas.update'(content) {
        check(content, Object);

        // Make sure the user is logged in before inserting a pizza
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Pizzas.update(content._id, {
            content,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'pizzas.remove'(pizzaId) {
        check(pizzaId, String);

        Pizzas.remove(pizzaId);
    },
    'pizzas.setChecked'(pizzaId, setChecked) {
        check(pizzaId, String);
        check(setChecked, Boolean);

        Pizzas.update(pizzaId, { $set: { checked: setChecked } });
    },
});
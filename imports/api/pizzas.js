import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Pizzas = new Mongo.Collection('pizzas');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pizzas', () => Pizzas.find());

    // Meteor.publish('nbPizza', () => {
    //     if (!!Session.get('pizzas'))
    //         return Session.get('pizzas');
    //     return 0;
    // });
}

Meteor.methods({
    'pizzas.insert'(content) {
        check(content, Object);

        if (!Meteor.userId()) {
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

        if (!Meteor.userId()) {
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

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Pizzas.remove(pizzaId);
    },
    'pizzas.setChecked'(pizzaId, setChecked) {
        check(pizzaId, String);
        check(setChecked, Boolean);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Pizzas.update(pizzaId, {$set: {checked: setChecked}});
    },
});
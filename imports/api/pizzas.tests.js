import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Pizzas } from './pizzas';
import { assert } from 'meteor/practicalmeteor:chai';

if (Meteor.isServer) {
    describe('Pizzas', () => {
        describe('methods', () => {
            const userId = Random.id();
            let pizzaId;

            beforeEach(() => {
                Pizzas.remove({});
                pizzaId = Pizzas.insert({
                    content: {name: 'test'},
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });
            it('can delete pizza', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deletePizza = Meteor.server.method_handlers['pizzas.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deletePizza.apply(invocation, [pizzaId]);

                // Verify that the method does what we expected
                assert.equal(Pizzas.find().count(), 0);
            });
            it('cannot delete pizza', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deletePizza = Meteor.server.method_handlers['pizzas.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = {};

                // Run the method with `this` set to the fake invocation
                deletePizza.apply(invocation, [pizzaId]);

                // Verify that the method does what we expected
                assert.equal(Pizzas.find().count(), 0);
            });
        });
    });
}
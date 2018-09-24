const { BadRequest } = require('@feathersjs/errors');
const isEmptyObject = require('is-empty-object');

module.exports = async context => {
    const { data } = context;

    const errors = {};

    if (!data.email) {
        errors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password is too short';
    }

    // Check if there are errors
    if (!isEmptyObject(errors)) {
        throw new BadRequest({
            errors: errors
        });
    }

    // Change the data to be only the text
    // This prevents people from adding other properties to our database
    context.data = {
        text: data.text.toString()
    }

    return context;
};
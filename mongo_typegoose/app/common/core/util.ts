import assert = require('power-assert');

export const  check_user = (user) => {
    try {
        assert(user != null);
    } catch (error) {
        return error;
    }
};

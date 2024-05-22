const bcrypt = require('bcryptjs');

module.exports = {
    generateHash: (password) => {
        const salt = bcrypt.genSaltSync(8);
        const hashpassword = bcrypt.hashSync(password, salt);
        return hashpassword;
    },
    compareHash: (password, dbpassword) => {
        return bcrypt.compareSync(password, dbpassword);
    },
};
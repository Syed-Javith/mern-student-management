const jwt = require('jsonwebtoken')
const verfiyUser = async (token) => {
    await jwt.verify(token, 'SYED_JAVITH_R', (err, decoded) => {
        console.log(token);
        console.log(decoded);
        if (err) {
            return err
        }
        if(decoded) return decoded
    });
}

module.exports = verfiyUser
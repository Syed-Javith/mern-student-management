const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.headers);

    if (!token) {
        console.log('no token');
        console.log(authHeader);
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    jwt.verify(token, 'SYED_JAVITH_R', (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(403).json({
                message: 'Invalid token',
                error : err
            });
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken


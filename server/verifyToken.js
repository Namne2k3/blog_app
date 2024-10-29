const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('Token is missing.');
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json('Token is invalid.')
        }

        console.log("Check decoded >>> ", decoded);

        req.userId = decoded.id;
        // req.email = data.email;
        // req.password = data.password

        console.log("Verified!");
        next();
    })
}

module.exports = verifyToken;
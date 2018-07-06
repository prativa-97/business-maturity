var articles = require('../models/article'),
    users = require('../models/user'),
    results = require('../models/result');

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = config.ERR_AUTH_NOT_LOGGED_IN;
        res.redirect(config.URL.LOGIN);
    }
}
module.exports = {
    requiredAuthentication: requiredAuthentication,
}
const jwt = require("jsonwebtoken");

// check if user is logged in
exports.isLoggedIn = (req, res, next) => {
	//get user authorization request
	let cookie = req.headers.cookie;
	if (!cookie) {
		res.status(501).render('index', {
			message: 'You are not logged in, please log in to continue'
		});
	}

	//extract the token from the authorization header
	if(cookie) {
		let splited_cookie = cookie.split("token=");
		
		let token = splited_cookie[1];
		//verify token
		jwt.verify(token, "dontguessit", (err, user) => {
			if (err) {
				res.status(501).render('index', {
					message: 'Please Login To Continue'
				});
			}
			//grant user access
			req.user = user;
	
			next();
		});
	}

};

import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

global.isLoggedIn = "init";

const auth = (req, res, next) => {
    const token = req.session.token;
    console.log(token);

    if(req.path === "/logout"){
        global.isLoggedIn = "init";
        next();
    } else {
        try{
            const decodedToken = JWT.verify(token, process.env.tokenSignature);
            console.log(decodedToken);
            global.isLoggedIn = "true";
            next();
        } catch(err) {
            if(global.isLoggedIn === "init") {
                next();
            } else {
                global.isLoggedIn = "false";
                res.redirect("/login");
            }
        }
    }
}   

export {auth};
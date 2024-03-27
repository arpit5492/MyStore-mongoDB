// import { updateUser, fetchDet } from "../db/user.js";
import { User } from "../db/user.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const signUpRender = (req, res) => {
    // console.log(cookie);
    res.render("signUp", {title: "Sign Up", isLoggedIn: global.isLoggedIn});
}

const addUser = async (req, res) => {
    // console.log(req.body);
    const {username, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    // console.log(username, password);

    try{
        await User.create({
            username: username,
            password: hashedPass
        });
        console.log("User added successfully!!");
        global.isLoggedIn = "true";
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
};

const renderLogin = (req, res) => {
    // console.log(cookie);
    res.render("login", {title: "Login", isLoggedIn: global.isLoggedIn});
};

const postLogin = async (req, res) => {
    // console.log(req.body);
    const {username, password} = req.body;
    try{
        const userDet = await User.findOne({where: {username: username}});
        console.log(JSON.stringify(userDet, null, 2));
        const isMatch = bcrypt.compareSync(password, userDet.password);
        console.log(isMatch);

        if(!userDet){
            console.log("Invalid username");
            res.redirect("/login");
        }
        else if(isMatch){
            const token = JWT.sign(
                {username},
                process.env.tokenSignature
            );
            req.session.token = token;
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    } catch(err) {
        console.log(err);
    }
};

const logout = (req, res) => {
    // req.session.isLoggedIn = "false";
    req.session.destroy(req.session.id);
    res.redirect("/");
};

export {signUpRender, addUser, renderLogin, postLogin, logout};
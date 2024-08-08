const { hashpassword, ComparePassword } = require("../../../middleware/auth")
const Usermodel = require("../../../model/user/user_auth")
const jwt = require('jsonwebtoken')
const flash = require('connect-flash');
// const session = require('express-session')

// User_Register_Page
const User_Register = (req, res) => {
    res.render('front/user_authintication/user_register', {
        title: "user register",
        flashmessage: req.flash('message')
    })
}
// User_login
const User_login = (req, res) => {
    res.render('front/user_authintication/user_login', {
        title: "user log in page",
        flashmessage: req.flash('message'),
        message:req.flash("message")
    })
}
// User_UpdatePassword
const User_UpdatePassword = async (req, res) => {
    const id = req.params.id
    const passwordedit = await Usermodel.findById(id)
    res.render('front/user_authintication/user_update_password', {
        title: 'user update paswword page',
        Edit: passwordedit
    })
}
// User_ForgetPassword
const User_ForgetPassword = (req, res) => {
    res.render('front/user_authintication/user_forget_password', {
        title: "user forget passwpord"

    })
}
// -----------------------Register User-----------------//
const user_registration = async (req, res) => {
    // console.log(req.body);
    try {
        const { name, email, password, mobile, first_school } = req.body
        if (!(name && email && password && mobile && first_school)) {
            console.log(`all fields are required`);
            return res.redirect('/')
        }
        // ExistingUser
        const ExistingUser = await Usermodel.findOne({ email })
        if (ExistingUser) {
            console.log(`email is already exist`);
            req.flash('message', "email is already registered..Try Again!!")
            return res.redirect('/')
        }
        // HashPassword
        const HashPassword = await hashpassword(password)
        const Newuser = new Usermodel({
            name, email, password: HashPassword, mobile, first_school
        })
        await Newuser.save()
        if (Newuser) {
            console.log(`user registration done`, Newuser);
            return res.redirect('/USER/user/home')
        }

    } catch (error) {
        console.log(`error in user registration`);
        return res.redirect('/')


    }

}
// -----------------------LogIn User---------------------//
const LogInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            console.log(`all fields are required`);
            req.flash('message', "all fields are required")
            return res.redirect('/USER/user/home')
        }
        const User = await Usermodel.findOne({ email })
        if (!User) {
            console.log(`email is not registered`);
            return res.redirect('/user/login')
        }
        // MatchPassword
        const MatchPassword = await ComparePassword(password, User.password)
        if (!MatchPassword) {
            console.log(`Incorrect password`);
            return res.redirect('/user/login')
        }
        const token = await jwt.sign({
            _id: User._id,
            name: User.name,
            email: User.email,
            password: User.password,
            mobile: User.mobile,
            first_school: User.first_school
        }, process.env.JWT_SECRET, { expiresIn: '12hr' })
        if (token) {
            res.cookie('usertoken', token)
            return res.redirect('/USER/user/home')
        } else {
            console.log(`error in user login`);
            return res.redirect('/user/login')
        }

    } catch (error) {
        console.log(error);

    }
}
// User_AuthCheck
const User_AuthCheck = (req, res, next) => {
    if (req.user) {
        return next()
    } else {
        return res.redirect('/user/login')
    }

}
// User_ForgetPassword
const UserForget_Password = async (req, res) => {
    try {
        const { email, first_school, newpassword } = req.body

        if (!email) {
            console.log(`email is required`);
            return res.redirect('/user/forget/password')
        }
        if (!first_school) {
            console.log(`first_school is required`);
            return res.redirect('/user/forget/password')
        }
        if (!newpassword) {
            console.log(`newpassword is required`);
            return res.redirect('/user/forget/password')
        }

        const userdata = await Usermodel.findOne({ email, first_school })
        if (!userdata) {
            console.log(`Invalid email and school name`);
            return res.redirect('/user/forget/password')
        }
        const hashed = await hashpassword(newpassword)
        const updatepassword = await Usermodel.findByIdAndUpdate(userdata._id, {
            password: hashed
        })
        if (updatepassword) {
            console.log(`password has been updated`);
            return res.redirect('/user/login')
        } else {
            console.log(`password has not been updated`);
            return res.redirect('/user/forget/password')
        }

    } catch (error) {
        console.log(error);
        error

    }
}
// UserLogout
const UserLogout = (req, res) => {
    res.clearCookie('usertoken')
    return res.redirect('/user/login')
}
// -------------------UserUpdatePassword---------------//
const UserUpdatePassword = async (req, res) => {
    try {
        const UserId = req.params.id
        const { NewPassword } = req.body
        const User = await Usermodel.findOne({ _id: UserId })
        if (User) {
            const hashed = await hashpassword(NewPassword)
            const ChangePassword = await Usermodel.findByIdAndUpdate({ _id: UserId }, {
                $set: {

                    password: hashed
                }
            })
            if(ChangePassword){
                console.log(`password has been updated successfully`);
                res.redirect("/user/login")
                req.flash("message","password has been updated successfully")
                
            }
        }
       
    } catch (error) {
        console.log(error);

    }
}
module.exports = {
    User_Register,
    User_login,
    User_UpdatePassword,
    User_ForgetPassword,
    user_registration,
    LogInUser,
    User_AuthCheck,
    UserForget_Password,
    UserLogout,
    UserUpdatePassword
}
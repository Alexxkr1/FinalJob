const User = require('../models/user');
const Info = require('../models/info');
const passport = require('passport');

exports.getMainPage = (request, response) => {
    Info.fetchInfos(infos =>{
        console.log(infos);
        response.render('index', {myInfos: infos});
    })
};

exports.getRegisterPage = (req, res)=>{
    res.render('register');
};

exports.postRegister = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user)=>{
        if(error){
            console.log(error);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, ()=> {
                res.render('admin');
            });
        }
    });
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error)=>{
        if(error){
            console.log(error);
            res.redirect('/login') ;
        } else {
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/admin');
            });
        }
    });
};

exports.getAdminPage = (req, res) => {
    if(req.isAuthenticated()){
        res.render('admin');
    } else {
        res.redirect('/');
    }
};


exports.userLogout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.postInfo = (req, res) => {
    const newInfo = new Info(req.body.userFirst, req.body.userLast, req.body.userAge, req.body.userResidance, req.file.filename,
        req.body.userHighschool, req.body.lastGymnasium, req.body.userUniversity,
        req.body.userProgramming, req.body.lastBackend, req.body.userFrontend, req.body.userVersion,
        req.body.userTime, req.body.lastCreative, req.body.userTeamwork,
        );

    newInfo.saveInfo();
    
    res.redirect('/admin');
}

exports.deleteInfo = (req, res) => {
    let infoToDelete = req.body.infoToDelete;
    Info.deleteInfo(infoToDelete);
    res.redirect('/');

}
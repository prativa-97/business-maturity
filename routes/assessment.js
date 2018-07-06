const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
//Score Model
let Result = require('../models/result');
//General Questions Model
let General = require('../models/general');
// Add Route
router.get('/', ensureAuthenticated, function(req, res){
    User.find( req.user._id ,function(err, user) {
      if(user[0].isGeneral){
        res.render('assessment', {
          title: 'Start Assessment',
        });
      }
      else
        res.redirect('/assessment/general');
    });
});

router.get('/general', ensureAuthenticated, function(req, res){
  res.render('general', {
    title:'Basic Details of your Company'
  });
});

router.post('/general', ensureAuthenticated, function(req, res){
  req.checkBody('answer1','Answer1 is required').notEmpty();
  req.checkBody('answer2','Answer2 is required').notEmpty();
  req.checkBody('answer3','Answer3 is required').notEmpty();
  req.checkBody('answer4','Answer4 is required').notEmpty();
  req.checkBody('answer5','Answer5 is required').notEmpty();
  req.checkBody('answer6','Answer6 is required').notEmpty();
  req.checkBody('answer7','Answer7 is required').notEmpty();
  req.checkBody('answer8','Answer8 is required').notEmpty();
  req.checkBody('answer9','Answer9 is required').notEmpty();
  req.checkBody('answer10','Answer10 is required').notEmpty();


  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('general', {
      title:'Basic Details of your Company',
      errors:errors
    });
  } else {
    let general = new General();
    general.answer1 = req.body.answer1;
    general.answer2 = req.body.answer2;
    general.answer3 = req.body.answer3;
    general.answer4 = req.body.answer4;
    general.answer5 = req.body.answer5;
    general.answer6 = req.body.answer6;
    general.answer7 = req.body.answer7;
    general.answer8 = req.body.answer8;
    general.answer9 = req.body.answer9;
    general.answer10 = req.body.answer10;
    general.user = req.user._id;
  
    general.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','General Questionnaire Completed Successfully!');
      }
    });
    let query = {_id:req.user._id}
    User.update(query, { "isGeneral" : true } , function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'User Details Updated');
            res.redirect('/assessment');
          }
    });
  }
});
	//PROCURE TO PAY 
		router.get('/procuretopay', ensureAuthenticated, function(req, res){
		    res.render('procuretopay', {
		        title: 'Select Section',
		    });
		});

		router.get('/procuretopay/purchasesection',ensureAuthenticated, function(req, res) {
      if(req.user.p2p.purchasesection == 0)
		    res.render('procuretopay/purchasesection');
      else
        res.redirect('/assessment/procuretopay')
		});
    router.post('/procuretopay/purchasesection',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

		router.get('/procuretopay/vendoranalysis',ensureAuthenticated, function(req, res) {
      if(req.user.p2p.vendoranalysis == 0)
        res.render('procuretopay/vendoranalysis');
      else
        res.redirect('/assessment/procuretopay')
		});
    router.post('/procuretopay/vendoranalysis',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

		router.get('/procuretopay/finances',ensureAuthenticated, function(req, res) {
      if(req.user.p2p.finances == 0)
        res.render('procuretopay/finances');
      else
        res.redirect('/assessment/procuretopay')
    });
    router.post('/procuretopay/finances',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

		router.get('/procuretopay/erpsection',ensureAuthenticated, function(req, res) {
      if(req.user.p2p.erpsection == 0)
        res.render('procuretopay/erpsection');
      else
        res.redirect('/assessment/procuretopay')
    });
    router.post('/procuretopay/erpsection',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

		router.get('/procuretopay/category1/data',ensureAuthenticated, function(req, res) {
		    Article.find({'section' : 'Purchase Section'},function(err,articles){
		        if(err) res.json(err);
		        else{
		            res.send(articles)
		        }
		    });
		});

		router.get('/procuretopay/category2/data',ensureAuthenticated, function(req, res) {
		    Article.find({'section' : 'Vendor Analysis'},function(err,articles){
		        if(err) res.json(err);
		        else{
		            res.send(articles)
		        }
		    });
		});
		router.get('/procuretopay/category3/data',ensureAuthenticated, function(req, res) {
		    Article.find({'section' : 'Finances'},function(err,articles){
		        if(err) res.json(err);
		        else{
		            res.send(articles)
		        }
		    });
		});
		router.get('/procuretopay/category4/data',ensureAuthenticated, function(req, res) {
		    Article.find({'section' : 'ERP Section'},function(err,articles){
		        if(err) res.json(err);
		        else{
		            res.send(articles)
		        }
		    });
		});
//ORDER TO CASH
    router.get('/ordertocash', ensureAuthenticated, function(req, res){
        res.render('ordertocash', {
            title: 'Select Section',
        });
    });


    router.get('/ordertocash/creditanalysis',ensureAuthenticated, function(req, res) {
      if(req.user.o2c.creditanalysis == 0)
        res.render('ordertocash/creditanalysis');
      else
        res.redirect('/assessment/ordertocash');
    });
    router.post('/ordertocash/creditanalysis',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/ordertocash/billing',ensureAuthenticated, function(req, res) {
       if(req.user.o2c.billing == 0)
        res.render('ordertocash/billing');
      else
        res.redirect('/assessment/ordertocash');
    });
    router.post('/ordertocash/billing',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/ordertocash/cashapplication',ensureAuthenticated, function(req, res) {
      if(req.user.o2c.cashapplication == 0)
        res.render('ordertocash/cashapplication');
      else
        res.redirect('/assessment/ordertocash');
    });
    router.post('/ordertocash/cashapplication',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/ordertocash/glposting',ensureAuthenticated, function(req, res) {
      if(req.user.o2c.glposting == 0)
        res.render('ordertocash/glposting');
      else
        res.redirect('/assessment/ordertocash');
    });
    router.post('/ordertocash/glposting',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/ordertocash/category1/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Credit Analysis'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });

    router.get('/ordertocash/category2/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Billing'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });
    router.get('/ordertocash/category3/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Cash Application & Collection'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });
    router.get('/ordertocash/category4/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'GL Posting & Reporting'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });
//ORDERTOCASH_ENDS
//HIRETORETIRE
    router.get('/hiretoretire', ensureAuthenticated, function(req, res){
        res.render('hiretoretire', {
            title: 'Select Section',
        });
    });


    router.get('/hiretoretire/hiring',ensureAuthenticated, function(req, res) {
      if(req.user.h2r.hiring == 0)
        res.render('hiretoretire/hiring');
      else
        res.redirect('/assessment/hiretoretire');
    });
    router.post('/hiretoretire/hiring',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/hiretoretire/employeemanagement',ensureAuthenticated, function(req, res) {
      if(req.user.h2r.employeemanagement == 0)
        res.render('hiretoretire/employeemanagement');
      else
        res.redirect('/assessment/hiretoretire');
    });
    router.post('/hiretoretire/employeemanagement',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/hiretoretire/payroll',ensureAuthenticated, function(req, res) {
      if(req.user.h2r.payroll == 0)
        res.render('hiretoretire/payroll');
      else
        res.redirect('/assessment/hiretoretire');
    });
    router.post('/hiretoretire/payroll',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/hiretoretire/retire',ensureAuthenticated, function(req, res) {
      if(req.user.h2r.retire == 0)
        res.render('hiretoretire/retire');
      else
        res.redirect('/assessment/hiretoretire');
    });
    router.post('/hiretoretire/retire',ensureAuthenticated, function(req,res){
        var obj = {};
        console.log(JSON.stringify(req.body.length));
          let errors = req.validationErrors();

          if(errors){
            res.render('add_article', {
              title:'Add Article',
              errors:errors
            });
          } else {
            for (var i = 0; i < req.body.length; i++) {
              let result = new Result();
              result.category = req.body[i].category;
              result.section = req.body[i].section;
              result.updated = new Date;
              result.user = req.user._id;
              result.question.title = req.body[i].question_title;
              result.question.weight = req.body[i].question_weight;
              result.answer = req.body[i].answer_weight;
              result.save(function(err){
                  req.flash('success','Results Added');
              });
            }
          }
    });

    router.get('/hiretoretire/category1/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Hiring'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });

    router.get('/hiretoretire/category2/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Employee Management'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });
    router.get('/hiretoretire/category3/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Payroll'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });
    router.get('/hiretoretire/category4/data',ensureAuthenticated, function(req, res) {
        Article.find({'section' : 'Retire'},function(err,articles){
            if(err) res.json(err);
            else{
                res.send(articles)
            }
        });
    });

//HIRETORETIRE_ENDS


//USER PART
    router.post('/results/p2p',ensureAuthenticated, function(req, res) {
        var obj = {};
        let query = {_id:req.user._id}
        console.log(req.body.score);
        User.update(query, {"p2p" : { 
                                      "purchasesection" : req.body.purchasesection,
                                      "vendoranalysis"  : req.body.vendoranalysis,
                                      "erpsection" : req.body.erpsection,
                                      "finances" :  req.body.finances,
                                      "score" : req.body.score
                                    }
        } , function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'User Details Updated');
          }
        });

    });

    router.post('/results/o2c',ensureAuthenticated, function(req, res) {
        var obj = {};
        let query = {_id:req.user._id}
        console.log(req.body.score);
        User.update(query, {"o2c" : { 
                                      "creditanalysis" : req.body.creditanalysis,
                                      "cashapplication"  : req.body.cashapplication,
                                      "billing" : req.body.billing,
                                      "glposting" :  req.body.glposting,
                                      "score" : req.body.score
                                    }
        } , function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'User Details Updated');
          }
        });

    });

    router.post('/results/h2r',ensureAuthenticated, function(req, res) {
        var obj = {};
        let query = {_id:req.user._id}
        console.log(req.body.score);
        User.update(query, {"h2r" : { 
                                      "hiring" : req.body.hiring,
                                      "employeemanagement"  : req.body.employeemanagement,
                                      "payroll" : req.body.payroll,
                                      "retire" :  req.body.retire,
                                      "score" : req.body.score
                                    }
        } , function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'User Details Updated');
          }
        });

    });

    router.get('/results/data',ensureAuthenticated, function(req, res) {
        Result.find({'user' : req.user._id },function(err,results){
            if(err) res.json(err);
            else{
                res.send(results)
            }
        });
    });
    router.get('/results',ensureAuthenticated, function(req, res) {
       res.render('results', {
        title: 'Your Result:'
        });
    });
    router.get('/results/userdata',ensureAuthenticated, function(req, res) {
        User.findById(req.user._id,function(err,user){
            if(err) res.json(err);
            else{
                res.send(user);
            }
        });
      });


    //ADMIN PART 
    router.get('/compare',ensureAuthenticated, function(req, res) {
                res.render('compare', {
                  title: 'All Companies Data',
                });
    });
    router.get('/results/allusers',ensureAuthenticated,function(req, res) {
      User.find({},function(err,users){
        if(err) 
          res.json(err)
        else
        {
          res.render('userslist',{
            title: 'All data:',
            users  : users
          });
        }
      });
    });
    router.get('/results/allusers/data',ensureAuthenticated, function(req, res) {
        User.find({},function(err,users){
            if(err) res.json(err);
            else{
                res.send(users)
            }
        });
    });
    router.get('/results/general/:id',ensureAuthenticated,function(req,res){
      General.find({'user' : req.params.id},function(err,general){
            if(err) res.json(err);
            else{
                console.log(general);
                res.render('userdata-general',{
                  general : general
                });
            }
      });
    });
    router.get('/results/:id',ensureAuthenticated, function(req, res) {
                res.render('userdata', {
                  title: 'Your Result:',
                });
        });
    router.get('/results/allusers/data/:id',ensureAuthenticated, function(req, res) {
        User.find({},function(err,users){
              if(err) res.json(err);
              else{
                   res.send(users)
                }
            });
        });

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

function isAdmin(req,res,next){
  if(req.user.isAdmin)
    return next();
  else
    req.flash('danger', ' You are not allowed to access this !');
    res.redirect('/users/login');
}

module.exports = router;

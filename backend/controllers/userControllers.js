// const bcrypt = require('bcrypt')
const bcrypt = require("bcryptjs");
const { login } = require("../services/userServices");
const { sigup } = require("../services/userServices");
const { tokenGenrate } = require("../middleware/generateToken");
const userModel = require("../model/userModel");

exports.login = async (req, res) => {
  /*
   *send the req to the services and then callback
   */
  const { email, password } = req.body;

  userModel.find({ email }).then((records) => {
    // console.log(records[0].password);
    bcrypt
      .compare(password, records[0].password)
      .then((result) => {
        console.log(result);
        if (result) {
          const payload = {
            email: email,
          };
          const token = tokenGenrate(payload);

                        console.log("Login successfully!");
                        res.status(200).json({
                            message: 'Login successfully!',
                            'status': 'true',
                            records,
                            "token": token
                        })
                    } else {
                        res.status(500).json({
                            'status': false,
                            'message': 'Password does not match!',
                            errorcode: 500
                        })
                    }
                })
                .catch((error) => {
                    console.log("Error ==>.",error);
                })
        })

};

exports.signup = async (req, res, next) => {

  const user_check = await userModel.find({ email: req.body.email });

  console.log(user_check);

  if (user_check.length !== 0) {

      res.json({   

          user_check,

          'status': false,

          'message': 'Email already exists!'

      });



  } else {
  bcrypt.hash(req.body.password, 10, function (err, passHash) {
      let user = new userModel({

          username: req.body.firstname,

          email: req.body.email,

          password: passHash,

          cart: []

      })
      user.save()

          .then(user => {

              res.status(200).json({

                  message: 'User added successfully!',

                  'status': 'true',

                  user

              })

          })

          .catch(err => {

              res.status(500).json({

                  message: err.message

              })

          })

  });

}

}

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
      res.status(400).json({
        status: "failed",
        message: "Bad Request: Please provide all details",
      });
    }

    const user = await userModel.find({ email: req.params.email });

    bcrypt.compare(currentPassword, user[0].password).then((result) => {
      if (result) {
        if (newPassword !== confirmPassword) {
          res.json({
            status: "failed",
            message: "New and confirm password donot matches",
          });
        } else {
            bcrypt.hash(newPassword, 10, async function (err, passHash) {
                if (err) {
                    res.json({
                        status: "failed",
                        message: err.message,
                      });
                } else {
                    user[0].password = passHash;
                    console.log(user);
                    await user[0].save();
                        
                    res.json({
                        status: "success",
                        message: "Password updated",
                      });
                }
              });
        }
      } else {
        res.json({
          status: "failed",
          message: "Current Password donot match",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: "User not found",
    });
  }
};

exports.changeProfile = async (req, res) => {
    try {
        const userFromDb = await userModel.find({email: req.params.email});
        console.log(userFromDb);

        if(userFromDb.length == 0) {
            res.status(404).json({
                status: 'success',
                message: 'User not found'
            })
        } else {
            console.log('--------------------')

            const { username, email, gender, phone } = req.body;
            console.log('gender: ' +gender);
            //First check if email already exists
            if(email.length > 0) {
                const userEmailChecker = await userModel.find({email});
                if(userEmailChecker.length > 0) {
                    console.log(3);
                    res.status(400).json({
                        status: "failed",
                        message: "Email already exists",
                    });
                } else {
                    userFromDb[0].email = email;
                }
            }
    
            if(username.length > 3) {
                userFromDb[0].username = username;
            }
    
                userFromDb[0].gender = gender;
                userFromDb[0].phone = phone;
      
                
                await userFromDb[0].save();
                res.status(200).json({
                    status: "success",
                    message: "Profile Updated",
                  });
        }
        
        
    } catch (err) {
        res.status(400).json({
          status: "failed",
          error: "User not found",
        });
      }
};

exports.forgotpassword = async (req, res, next) => {



  const user_check = await userModel.find({ email: req.body.email });

  console.log(user_check);

  if (user_check.length === 0) {

      

      res.json({

          user_check,

          'status': false,

          'message': 'Email does not exists!'

      });



  }



  const passHash = await bcrypt.hash(req.body.password, 10);

  userModel.findOneAndUpdate(

      { "email" : req.body.email },

      { $set: { "password" : passHash} 

  }).then( user_check => {

      res.status(200).json({

          'message': "Password reset successfully!",

          'status': true,

          user_check

      })  

  }).catch(err => {

      res.status(500).json({

          message: err.message

      })

  })
}

module.exports.getUser = (req, res, next) => {
  userModel.find({ email: req.params.email },(err, userList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.send({"user": userList})      
      }
  });
}

module.exports.addToCart = (req, res, next) => {
  userModel.updateOne( { _id: req.body._id } , { $set: req.body}, { upsert: true } , (err, User) =>{
      if(err)
          console.log(err);
      else
          res.send({"message": "success"});
  });
}
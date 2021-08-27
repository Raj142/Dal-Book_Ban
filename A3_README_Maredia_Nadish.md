
# Assignment 3

**[Optional]** In this assignment, I have implement the backend of profile management with two different task change password and change profile.

* *Date Created*: 21 JULY 2021
* *Last Modification Date*: 21 JULY 2021
* *URL*: http://group14-s21--thedalbookbarn.herokuapp.com   
* *Group Repo URL*: https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn

## Authors

* [Nadish Maredia](nd843857@dal.ca) - *(Developer)*

### Prerequisites

To have a local copy of this assingnment up and running on your local machine, you will first need to install the following.

* *Node*

To run this project, follow the steps:

1. Go into frontend folder.
	Run npm install
	Do npm run start

2. Go into backend folder
	Run npm install
	Do node index.js
	
By doing this, backend server will be up as well as frontend project.

### And coding style

For the coding style, We have follow MVC pattern in backend project, models will store mongodb schemas, controller have the main logic and routes will redirect request. For
frontend project, We have split each feature and within each feature if there is a module with same functionality we have created separate component for that.


### Code I worked on

I have work on profile management which has two task, one is password update which will ask user to enter current password and new password and it will check if current password 
is valid if it is then user can update the password otherwise it will show error, second one is to update profile like user can update name(optional), email(optional), phone or 
gender.

### Backend

### userController.js

*Lines 111 - 215* Create two functions changePassword and changeProfile

```
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

```

### userModel.js

*Lines 13 - 20* Just add two properties in model

```
    gender: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
```

### routes.js

*Lines 7 - 8* Just add two routes

```
route.post('/changePassword/:email', userController.changePassword);
route.post('/changeProfile/:email', userController.changeProfile);
```


### FrontEnd

### ChangePassword.js

*Lines 74 - 101* Added axios on frontend to send request to API

```
const submitForm = (e) => {
        e.preventDefault();
        const isFormValid = validation();
        if(isFormValid) {

          const userEmail = localStorage.getItem('email');
          const passwordObj = {
            currentPassword: password,
            newPassword,
            confirmPassword
          };

          // console.log(userEmail);
          // console.log(passwordObj);
          
          const headers = { 
            'Content-Type': 'application/json'
        };
          axios.post('http://localhost:4000/changePassword/' +userEmail, passwordObj, {headers})
            .then(res => {
              const data = res.data;
              // console.log(data);
              // alert(data.message);
              if(data.message == "Password updated") {
                alertify.success(data.message);
              } else {
                alertify.error(data.message);
              }
              
            })
            .catch(err => alertify.error(err.message));
            clearForm();
            // alert("You Password has been changed!!")
        }
    }
```

### ChangeProfile.js

*Lines 103 - 131* Added axios on frontend to send request to API

```
 const submitForm = (e) => {
    e.preventDefault();
    const isFormValid = validation();
    if(isFormValid) {
      const userEmail = localStorage.getItem('email');
      const profileObj = {
        username: name,
        email,
        gender,
        phone
      };

      const headers = { 
        'Content-Type': 'application/json'
      };

      axios.post('http://localhost:4000/changeProfile/' +userEmail, profileObj, {headers})
        .then(res => {
          const data = res.data;

          if(data.message == "Profile Updated") {
            if(email.length > 0) {
              localStorage.setItem('email', email);
            }
            console.log('===========')
            console.log(data);
            alertify.success(data.message);
          }

        })
        .catch(err => alertify.error('Something went wrong! Please try again or email already exist'));;
      clearForm();
      // alert("You Profile has been updated!!")
  }
  };
```

### Header1.js

*Lines 23 - 25* Added logout event to clear the localStorage

```
logOut(){
        localStorage.clear();
    }
```

## Build With

* [Express](https://expressjs.com/) - Express to create rest Api
* [Mongoose](https://mongoosejs.com/docs/) - Mongoose to create mongodb schema and interact with them
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used to generate and compare hash password
* [alertify](https://alertifyjs.com/) - Used to show dialog and notifications.

## Sources Used

* *Used React Bootstrap* (https://react-bootstrap.github.io/components/navbar/)
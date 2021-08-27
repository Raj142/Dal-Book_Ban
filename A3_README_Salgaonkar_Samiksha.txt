# Assignment 3

* Assignment 3 focuses on implementing the front-end and back-end development techniques for our group project. Our project is a web application for an online book store for Dalhousie University. As a part of Assignment 3, I have implemented the front-end and back-end for the 'User authentication' feature.

* *Date Created*: 21 Jul 2021
* *Last Modification Date*: 21 Jul 2021
* *URL*: https://group14-s21--thedalbookbarn.herokuapp.com/


## Authors
* [Samiksha Narendra Salgaonkar](sm853820@dal.ca)


## Group Repository URL:
* [https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn](https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn)


## Heroku Application Deployment URL:
* [https://group14-s21--thedalbookbarn.herokuapp.com/](https://group14-s21--thedalbookbarn.herokuapp.com/)


## The Dal Book Barn: 
* The Dal Book Barn is a web application designed which is analogous to an online book store explicitly designed for the students and faculty members of Dalhousie University. The
  web application is developed using the MERN stack (MongoDB, Express, React and Node). The front-end framework used is React and back-end frameworks used are Nodejs and Express. The
  database used for our web application is MongoDB database.


## Getting Started
### Prerequisites -> Prerequisites for the front-end and backend of the web application are described below:

#### Front-End Dependencies: This project has been implemented with various modules of React and Bootstrap and hence requires installation of 'react-bootstrap', 'react-navbar'. 
Hence, in order to run this project on local machine, these libraries would be required to be installed.

#### Back-End Dependencies: The back-end for the project has been implemented using the Model-View-Controller (MVC) design approach. For the User Authentication feature, I have used the 'jwt' - JSON Web Token(JWT), 'bcryptjs' and CORS library for implmenting the feature.
Hence, in order to run this project on local machine, these libraries would be required to be installed.

##### jwt: JSON Web Tokens are used for creating sessions for every user login, to maintain the other functionalities such as updating password and details of a user profile relevant to the user session,
##### bcryptjs: brcyptjs library is used to encrypt the password while signing up into the application to ensure that security of the web application is maintained. This library is also used during logging in to compare the entered password during login into the web application.
##### CORS: CORS library is used to ensure secure resource sharing into the web application.

### Installing
* Installing Bootstrap: run 'npm install react-bootstrap bootstrap@4.6.0' on the terminal where the project is saved.
* Installing JWT library: run 'npm i jsonwebtoken' on the terminal where the project is saved.
* Installing bcryptjs library: run 'npm i bcryptjs' on the terminal where the project is saved.
* Installing CORS library: run 'npm i' on the terminal where the project is saved. 


## Development files:

### Front-end:

* User authentication ->

* Task 1 : LogIn   
	Folder: /components
	File: LogIn.jsx
	Details: This web page covers the login and forgot password components of the User authentication feature of the web application. It provides the user with text fields to enter the registered email address and password for logging in. 
			 The web page covers some fundamental validations (covered in the Test roadmap). It is built using Bootstrap and Modals in Bootstrap. 

* Task 2 : SignUp
	Folder: /components
	File: SignUp.jsx
	Details: This web page displays the signup page for the web application. It provides the user with text fields to enter the banner ID, email address and password for registration of the user in the database.. 
			 The web page covers some fundamental validations (covered in the Test roadmap). It is built using Bootstrap and React. 
	
	File: useForm.jsx
	Details: This web page covers all the validations required during the registration of the user into the web application.	

* Header.js: Header.js file displays the header for the web pages.
			 
* Styling:

* SignUp.css: This file is used to style the components of the User Authentication feature.			 
* Header.css: This file styles the header of the web application.

* The integration of front-end with the back-end is done in the respective files for the respective tasks of the feature.

### Back-end:

* User authentication ->

	Folder: /routes
	File: routes.js
	Details: This file consists of all the routes used in the application for each of the tasks and features.
	
	Folder: /controllers
	File: userControllers.js
	Details: This file consists of the logic for validating and then adding/updating data in the collection of the database on successful validations.
	
	Folder: /middleware
	File: generateToken.js
	Details: This file consists of the logic for generating token for payload passed as parameter to the method

    Folder: /model
	File: userModel.js
	Details: This file consists of the code that defines the model for the user collection in the database. It defines the schema of the user which will be stored.

	
## Running the tests
* The application has been deployed on <https://group14-s21--thedalbookbarn.herokuapp.com/> and can be tested here. 


### Test roadmap:

#### Front-End tests:
* There will be a signup page displayed on the screen which will ask the user to enter his/her Banner ID, Dal email address and password he wants to set. 

##### Task 1 : SignUp tests
* The SignUp page has front-end validations which performs the following checks:
** *Banner ID (starts with a B, length is variable) 
** *Dal Email address (accepts only @dal.ca domain)
** *Password (length should be 8 characters)
** *Confirm password (input here should match the Password field)

* On successful validations of the web page, the user will be re-directed on the main page of the web application.

##### Task 2 : Login tests
* The Login page has front-end validations which performs the following checks:
** *Dal Email address (accepts only @dal.ca domain)
** *Password (length should be 8 characters)

* On successful validations of the web page, the user will be re-directed on the main page of the web application on successful front-end validations and authentication.

##### Task 3 : Forgot Password tests
* The Forgot Password is a Modal Box and has front-end validations which performs the following checks:
** *Dal Email address (accepts only @dal.ca domain)
** *Password (length should be 8 characters)
** *Confirm password (input here should match the Password field)

* On successful validations of the web page, the users password will be updated in the database.

* All the webpage pass the W3C front-end validations. The front-end validation test was done on <https://validator.w3.org/nu/?doc=https%3A%2F%2Fgroup14-s21--thedalbookbarn.herokuapp.com%2F>

* I have also tested for responsiveness on various devices. The web page stays intact without the components moving here and there while resizing the webpages on all the devices.


### And coding style tests
* The form has front-end validations which performs the following checks and those have been styled on input-validation: The error message on invalid input is displayed in red color font.


## Deployment

The web application has been deployed on Heroku for ease of access and portability. The following has been done using the given steps:
* Create a new application in Heroku
* Connect the created application to the GitHub repository hosting the project
* Add buildpacks of node.js (back-end) and create-react-app (front-end) using the Settings option
* Deploy the main branch of the repository
* View the application on successful deployment

This was done for deploying both front-end and back-end separately.

GitHub URL ->
The front-end of the web application has been hosted on the frontend branch of the repository - <https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn/tree/frontend>
The back-end of the web application has been hosted on the backend branch of the repository - <https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn/tree/backend>

Heroku URL ->
The front-end of the web application has been hosted on the given Heroku URL - <https://group14-s21--thedalbookbarn.herokuapp.com/>
The back-end of the web application has been hosted on the given Heroku URL - <https://group14-thedalbookbarn-bkend.herokuapp.com/>


## Built With

* [React](https://reactjs.org/) - The frontend framework used is developed using React.
* [Bootstrap](https://react-bootstrap.github.io/) - Bootstrap was used to build the Navigation Bar and Modals used in the feature.
* [Heroku](https://dashboard.heroku.com/apps) - Heroku was used to deploy the application.
* [GitHub](https://github.com/) - GitHub was used to host the project.
* [Postman] - Postman used for testing apis developed for the backend of the web application.


## Sources Used

* [React Build Pack](https://github.com/mars/create-react-app-buildpack) - Build pack for create-react-app was used.


## Instructor

* [mosquera@cs.dal.ca](mosquera@cs.dal.ca)


##Teaching Assistants

* [hari.arunachalam@dal.ca](hari.arunachalam@dal.ca)
* [Nikunj.Goenka@dal.ca](Nikunj.Goenka@dal.ca)
* [sh655624@dal.ca](sh655624@dal.ca)
* [ys432526@dal.ca](ys432526@dal.ca)
* [bl200240@dal.ca](bl200240@dal.ca)
* [neharika.sehgal@dal.ca](neharika.sehgal@dal.ca)
* [aadeshshah@dal.ca](aadeshshah@dal.ca)
* [sm644084@dal.ca](sm644084@dal.ca)
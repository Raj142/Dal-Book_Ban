# Assignment 3

* As a part of Assignment 3, I have implemented the front-end and back-end for the 'Delivery Status Management' feature. I have combined both the tasks of this feature into one as other task is just reading the data from the database.

* *Date Created*: 21 Jul 2021
* *Last Modification Date*: 21 Jul 2021
* *URL*: https://group14-s21--thedalbookbarn.herokuapp.com/


## Author
* [Dhruvilkumar Arvindbhai Savliya](dh400868@dal.ca)


## Group Repository URL:
* [https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn](https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn)


## Heroku Application Deployment URL:
* [https://group14-s21--thedalbookbarn.herokuapp.com/](https://group14-s21--thedalbookbarn.herokuapp.com/)

## Front-End work: 
I have submitted assignment 3 with my feature Order Status, Here I have created a Orders page where list of orders will be displayed and Admin can change the status using provided dropdown. 

## Back-End work:

I have created orderController and orderModel for getting the data from the MongoDB clusters. After that using a basic HTML table structure, I have displayed the orderlist.


## Getting Started
### Prerequisites -> Prerequisites for the front-end and backend of the web application are described below:

#### Front-End Dependencies: This project has been implemented with various modules of React and Bootstrap and hence requires installation of 'react-bootstrap', 'react-navbar'. 
Hence, in order to run this project on local machine, these libraries would be required to be installed.

#### Back-End Dependencies: The back-end for the project has been implemented using the Model-View-Controller (MVC) design approach. For the User Authentication feature, I have used the 'jwt' - JSON Web Token(JWT), 'bcryptjs' and CORS library for implmenting the feature.
Hence, in order to run this project on local machine, these libraries would be required to be installed.

##### CORS: CORS library is used to ensure secure resource sharing into the web application.

### Installing
* Installing Bootstrap: run 'npm install react-bootstrap bootstrap@4.6.0' on the terminal where the project is saved.
* Installing CORS library: run 'npm i' on the terminal where the project is saved. 


## Development files:

### Front-end:

* Delivery Status Mangement ->

* Task : Update Delivery Status by Admin   
	Folder: /components
	File: Orders.jsx
	Details: This web page displays all received orders to the Admin. Admin can change the status of perticular order using given dropdown.  


* Header.js: Header.js file displays the header for the web pages.
			 
* Styling:

* Order.css: This file is used to style the components of the Delivery Status Management feature.			 

* The integration of front-end with the back-end is done in the respective files for the respective tasks of the feature.

### Back-end:

* Delivery Status Mangement ->

	Folder: /routes
	File: routes.js
	Details: This file consists of all the routes used in the application for each of the tasks and features.
	
	Folder: /controllers
	File: orderControllers.js
	Details: This file consists of the logic for updating data in the collection of the database.

    	Folder: /model
	File: orderModel.js
	Details: This file consists of the code that defines the model for the order collection in the database. It defines the schema of the order which will be stored.

	
## Running the tests
* The application has been deployed on <https://group14-s21--thedalbookbarn.herokuapp.com/> and can be tested here. 


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
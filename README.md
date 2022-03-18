# Project Name:
## info-management-of-xpeed-studio
# API LINK: 
###  https://drive.google.com/drive/folders/1mX3sqB6gZB_1IXrjv-KlS-aiRgk9JBR_?usp=sharing
# Following Step For Getting Started with This React App 
    *   api folder should be take placed into drive C: xampp > htdoc or wampp > www
    *   Start your xampp or wampp server
    *   After that clone this app 
    *   Go to the app folder and "npm install" or "yarn"
    *   To run the app, run in terminal "yarn start"/"yarn dev"/"npm start"
    *   It will work properly, inshaAllah

## Task Requirements & Details:

Create a simple CRUD frontend with the following requirements. You can use either react or vue, the choice is yours. 
- There will be three pages- 
- List - the saved data will be shown here as a table. Users can reorder each row and sort certain columns (defined in API). Users will be able to search among these data. 
- Create - On this page, a form will be shown and users can enter new data through the form. All of the fields will be defined in the API. 
- Update - There will be a form on this page too and it’s values & fields will be defined in the API. Users will update/ edit any existing data here. 
- After clicking the submit button, there will be a loading icon inside the button and the button should be disabled. After getting any response from the server end, the button will be enabled again. 
### API - 
https://drive.google.com/file/d/1B2M7OeqN-ywt1-lQVZqbdEA4eazmquPc/view?usp=sharing 


## Instructions: 
Unzip the given project in your local machine’s xampp or wamp’s htdocs or www folder. 
- See a list.php file with some texts in there
- The bellow code  should be in all .php files
#### header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
##### Noted: Don't worry that code is included by me. If it is missing then please include it. Otherwise we can't use post method for api request 
- Now test the following url - http://localhost/api/list.php if it is working then the project is working fine

### Useful articles: 
https://themeisle.com/blog/install-xampp-and-wordpress-locally/ https://blog.templatetoaster.com/how-to-install-wamp/ 
https://wpshout.com/quick-guides/how-to-install-mamp-on-your-mac/ https://www.wikihow.com/Install-XAMPP-on-Linux/ 

##  API endpoints - 
1. To get the form structure with data : http://localhost/api/get_form.php a. Structure looks like - https://prnt.sc/uge56s 
    b. Number of fields will be change on every call 
    c. To get the content of edit form pass id param in url like http://localhost/api/get_form.php?id=67 
    d. With id form will be returned with values https://prnt.sc/uge8d0 
2. List >> structure with data : http://localhost/api/list.php a. Structure will look like this https://prnt.sc/uge8u9 
    b. Headers key contains the table header info 
    c. Rows key contains the rows of the table 
    d. Each row could have extra field or missing field 
    https://prnt.sc/uge9i2 
3. To save & update the form: http://localhost/api/submit_form.php 
    a. It will return like this https://prnt.sc/ugeaem 
    b. If status is success show the messages as success, else show messages as danger/error 
    c. Please be noted id will be always static data 
4. Reorder the list : http://localhost/api/reorder.php 
    a. It will return like this https://prnt.sc/ugeazr 
    b. If status is success show the messages as success, else show messages as danger/error 
####    Please be noted all data return by API is static. 
####    Project Clarification video: 
- https://www.youtube.com/watch?v=HuRSGAGEdUE



# Node.js Backend - ToDo App
#### Backend server for ToDo Application created with Node.js<br>

## Introduction

A simple backend server for ToDo Application created with Node.js and using File System(JSON File) for storing Data. Built with an aim to provide a backend for Todo Application. Server supports API calls for Adding, Fetching and Deleting Todo.

## Technologies

* [Node.js v14.17.4](https://nodejs.org/en/)
* [express v4.17.1](https://www.npmjs.com/package/express)
* [uniqid v5.3.0](https://www.npmjs.com/package/uniqid)

## Getting Started

These are instructions to set up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

To clone and run this application, you'll need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) (which comes with npm) installed on your computer.

### Installation

From your command line:

1. Clone the repo
   ```sh
   $ git clone https://github.com/Saima422/ToDo-Backend-Node.js
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
4. Run the app
   ```JS
   $ npm run start
   ```


## Endpoints
### 1. GET all Todo's

Returns json data containing objects of each Todo.

* **URL**

	`/tasks`

* **Method:**

	`GET`

*  **URL Params**

	**Required:**

	`None`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**

  ```sh
  {
    "message": "successfully fetched all tasks",
    "data": [
      {
        "taskId": "9vf61mv7ks5rgz6m",
        "content": "First task for backend",
        "createdAt": "Some date ",
        "updatedAt": "Some date ",
        "isCompleted": "false"
      },
      {
        "taskId": "9vf62iwnks67y6q5",
        "content": "Task 5",
        "createdAt": "Some date ",
        "updatedAt": "Some date ",
        "isCompleted": "false"
      }
    ]
  }
  ```

* **Sample Call:**
  ```sh
  $.ajax({
      url: "/tasks",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
    }
  });
  ```

* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/images_Todo-Backend_Readme/getall_image.png)


### 2. GET Todo by ID

Returns json data containing objects of Todo ID provided.

* **URL**

	`/tasks/taskId`

* **Method:**

	`GET`

*  **URL Params**

	**Required:**

	`taskId =  [String]`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "successfully fetched task",
    "data": {
      "taskId": "9vf617xbks7t0ads",
      "content": "Some Task is completed",
        "createdAt": "10/08/21 22:07:30",
        "updatedAt": "11/08/21 12:30:15",
        "isComplete": true
    }
  }
  ```

* **Error Response:**

  **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Element Not Found",
    "error": "Invalid Id"
}`

* **Sample Call:**
  ```sh
  $.ajax({
      url: "/tasks/9vf617xbks7t0ads",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
    }
  });
  ```


* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/images_Todo-Backend_Readme/getbyid_image.png)

### 3. Add a new Todo

Returns json data containing the message and added task.

* **URL**

	`/tasks`

* **Method:**

	`POST`

*  **URL Params**

	**Required:**

	`None`

* **Data Params**

	`{ "content": [String], "createdAt": [Date(DD/MM/YY) Time(HH MM SS)], "updatedAt"[Date(DD/MM/YY) Time(HH MM SS)],}`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "successfully Added task",
    "data": {
      "taskId": "9vf617xbks7t0ads",
      "content": "Some Task is completed",
        "createdAt": "10/08/21 22:07:30",
        "updatedAt": "11/08/21 12:30:15",
        "isComplete": false
    }
  }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Invalid Request",
    "error": "Invalid Request"
}`

	OR
 * **Code:** 400 <br />
    **Content:** `{
    "message": "Invalid Request",
    "error": "Invalid Request"
}`

	OR

 * **Code:** 500<br />
    **Content:** `{
    "message": "An error occurred while writing file",
    "error": error that has occurred
}`


* **Sample Call:**
  ```sh
  $.ajax({
      url: "/tasks",
      dataType: "json",
      type : "POST",
      data : {"content": "some task", "createdAt": "10/08/21 22:07:30", "updatedAt": ""}
      success : function(r) {
        console.log(r);
      }
  });
  ```

* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/images_Todo-Backend_Readme/addtodo_image.png)

### 4. Update an existing Todo

Returns json data containing the message and Updated task.

* **URL**

	`/tasks/taskId`

* **Method:**

	`POST`

*  **URL Params**

	**Required:**

	`id = [String]`

* **Data Params**

	`{ "content": [String], "createdAt": [Date(DD/MM/YY) Time(HH MM SS)], "updatedAt"[Date(DD/MM/YY) Time(HH MM SS)], "isComplete": [Boolean]}`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "successfully updated task",
    "data": {
      "taskId": "9vf617xbks7t0ads",
      "content": "Some Task is completed",
        "createdAt": "10/08/21 22:07:30",
        "updatedAt": "11/08/21 12:30:15",
        "isComplete": false
    }
  }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Invalid Request / Task with id not found",
    "error": "Invalid Request"
}`

	OR
 * **Code:** 400 <br />
    **Content:** `{
    "message": "Invalid Request",
    "error": "Invalid Request"
}`

	OR

 * **Code:** 500<br />
    **Content:** `{
    "message": "An error occured while writing file during update",
    "error": error that has occurred
}`


* **Sample Call:**
  ```sh
  $.ajax({
      url: "/tasks/9vf617xbks7t0ads",
      dataType: "json",
      type : "POST",
      data : {"content": "some task", "createdAt": "10/08/21 22:07:30", "updatedAt": "11/08/21 12:30:15", "isComplete": true}
      success : function(r) {
        console.log(r);
      }
  });
  ```


* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/images_Todo-Backend_Readme/update_image.png)

### 5. Delete an existing Todo

Returns json data containing the message that the task is deleted.

* **URL**

	`/tasks/taskId`

* **Method:**

	`DELETE`

*  **URL Params**

	**Required:**

	`id = [String]`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "successfully deleted task",
  }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Task with id not found",
}`

	OR

 * **Code:** 500<br />
    **Content:** `{
    "message": "An error occured while writing file during delete",
    "error": error that has occurred
}`


* **Sample Call:**
  ```sh
  $.ajax({
      url: "/tasks/9vf617xbks7t0ads",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
  });
  ```

* **Example:** 

  ![](https://saima422.github.io/Image-JSON-Data-Repo/images_Todo-Backend_Readme/delete_image.png)

## Folder Structure
```
├── app.js
├── controllers
│   └── taskController.js
├── data
│   └── tasks.json
├── models
│   └── taskModel.js
├── node_modules
├── package.json
├── package-lock.json
├── routes
│   └── taskRouter.js
└── utils
└── sendResponse.js
```

## Scope and Functionality

#### Features:
* Get all Todos
* Get a Todo with specific ID
* Add a New Todo
* Update an existing Todo by providing Todo ID
* Delete an existing Todo by providing Todo ID

#### Remaining Todo: 
* Add a Database for storing the Todos/Tasks

## Sources

* [Node.js Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/)
* [Node.js - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Node.js?retiredLocale=hu)
* [Introduction to Node.js](https://nodejs.dev/learn)

## Contact

Author - Saima Sayed 
<br>
Project Resources - https://github.com/Saima422/ToDo-Backend-Node.js
<br>
LinkedIn - https://www.linkedin.com/in/saima-sayed-6482481b9/
# 📚 Home Library (React + GraphQL)

A small full-stack library management application built with **React**, **Apollo GraphQL**, and **Django GraphQL backend**.

The project allows users to manage a personal book collection: create, edit, delete and browse books.

---

# 🚀 Features

- View all books in a paginated library
- Create new books
- Edit existing books
- Delete books
- View book details
- Select authors from dropdown
- GraphQL queries and mutations
- Toast notifications for actions
- Loading spinner
- Simple navigation with React Router

---

# 🧰 Technologies

Frontend:

- React
- React Router
- Apollo Client
- GraphQL
- React Toastify
- CSS

Backend:

- Django
- Graphene GraphQL
- PostgreSQL

---

# 📂 Project Structure
frontend/src

components/
BookForm.js -> create book
BookPage.js -> book details
BooksLibrary.js -> books list
EditBook.js -> edit book
HomePage.js -> homepage

App.js -> routing
queries.js -> GraphQL queries
mutations.js -> GraphQL mutations
styles.css -> styling

---

# ⚙️ How to Run

### Backend


python manage.py runserver


### Frontend


cd frontend
npm install
npm start


App runs on:


http://localhost:3000


---

# 📖 How to Use

1. Open **Home Page**
2. Click **Open Library**
3. Browse books
4. Click a book to see details
5. Use **Edit** or **Delete**
6. Click **Create Book** to add a new one

---

# 🎯 Learning Goals

This project demonstrates:

- GraphQL queries and mutations
- Apollo Client integration
- React state management
- CRUD operations
- SPA navigation
- Component architecture

---

# 📌 Future Improvements

- Book search
- Better UI cards layout
- Authentication
- Book covers upload
- Filtering and sorting

---

# 👩‍💻 Marina4e

Pet project for learning **React + GraphQL + Django**.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

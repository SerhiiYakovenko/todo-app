# README

## Task manager
I'm a person who passionate about my own productivity. I want to
manage my tasks and projects more effectively. I need a simple tool that
supports me in controlling my task-flow
Functional requirements
- I want to be able to create/update/delete projects   - **Not Done**.
- I want to be able to add tasks to my project - **Done**.
- I want to be able to update/delete tasks - **Done**.
- I want to be able to prioritize tasks into a project - **Done**.
- I want to be able to choose deadline for my task - **Done**.
- I want to be able to mark a task as 'done' - **Done**.

Technical requirements
01. It should be a WEB application - **Done**.
02. For the client side must be used:
HTML, CSS (any libs as Twitter Bootstrap, Blueprint ...),
JavaScript (any libs as jQuery, Prototype ...) - **Done**
03. For a server side any language as Ruby, PHP, Python,
 JavaScript, C#, Java ... - **Done**.
04. It should have a client side and server side validation - **Done**.
05. It should look like on screens (see attached file
“test-task-ruby-courses-view.png”). - **Not Done**.

Additional requirements
- It should work like one page WEB application and should use AJAX
technology, load and submit data without reloading a page. - **Done**.
- It should have user authentication solution and a user should only
have access to their own projects and tasks. - **Done**.
 - It should have automated tests for the all functionality - **Done**.
 
[`SQL`](/sql.md)

## Heroku app:
https://to-do-list-ruby-react.herokuapp.com/

## Local Build

```
bundle install
yarn install
rails db:create
rails db:seed
rails s
```

## Tests

```
rspec
```
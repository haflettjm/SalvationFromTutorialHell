# A simple goLang TODO

The first project in the 50 Project Challenge should be a todo app. It's obviously simple and gives me a chance to practice basics with go. If your reading this and are a low level systems programmer I am sorry please advert your eyes. I've only gotten to play with python and typescript.

## QDD Questions:

1) What am I building?
    - Todo app
2) How will users interact with it?
    - I am asking this first because as a personal goal of mine is to focus on building performant apps but *user focused applications.* This means prioritizing User Experience.
    - To keep things simple we should probably use a command line interface.
3) How will I store the Todos?
    - Since I am new to go I think you would want to store them in structs. I could be wrong. Or maybe you could create a type *TODO* or something.
    - Once the TODO is created add it to an collection of other TODOs. Probably would want to keep the order they were entered maybe a map? I don't think struct holding a struct would be the right move.
    - Then from there I guess you would want to save this TODO list in a file to load it later. *shrug*

I think that's it right? No more to add? Maybe a menu? Who knows it's 2am let's get this done.


Developer thoughts:

Since with visibility I know it's a small dumb project but is *it* worth it to ask questions like should I declare the TODO in the main function or leave it out there. Again I don't know let's try it in the main see what happens.



# Roadmap (Ordered Checklist)

## 1. Project Setup
- [x] Initialize Nuxt 3 project
- [x] Install and configure Tailwind CSS
- [x] Set up ESLint / Prettier (optional but helpful)
- [x] Set up basic `layouts/default.vue` and `AppHeader.vue`

## 2. Basic UI Structure (Frontend Skeleton)
- [ ] Layout: Page background and responsiveness
- [ ] `AppHeader` with site title and nav links
- [ ] Input form for new todos
- [ ] Display a static list of dummy todos

## 3. Todo Data Structure (Frontend Only)
- [ ] Define todo object locally with:
  - `id`, `title`, `completed`, `dueDate`, `createdAt`, `updatedAt`
- [ ] Handle adding a new todo (local state)
- [ ] Handle marking todo as complete
- [ ] Handle deleting a todo
- [ ] Handle editing/updating a todo
- [ ] Show due date and created date

## 4. Backend Setup (Auth & DB)
- [ ] Set up server-side framework (e.g., Node.js/Express, H3 in Nuxt)
- [ ] Connect to a database (MongoDB, PostgreSQL, etc.)
- [ ] Create User model (username, hashedPassword, id)
- [ ] Create Todo model with user association

## 5. Authentication System
- [ ] `POST /auth/register` endpoint
- [ ] `POST /auth/login` endpoint
- [ ] Hash passwords with bcrypt
- [ ] Generate JWT or cookie-based session
- [ ] Auth middleware to protect routes
- [ ] Logout endpoint or session clear

## 6. Todo API Routes (Protected)
- [ ] `GET /todos` – get current user's todos
- [ ] `POST /todos` – create a new todo
- [ ] `PUT /todos/:id` – update existing todo
- [ ] `DELETE /todos/:id` – delete a todo

## 7. Connect Frontend to API
- [ ] Create login and register forms in Nuxt
- [ ] Store JWT or session client-side
- [ ] Load todos on page load (authenticated)
- [ ] Add todo form calls POST API
- [ ] Toggle completed calls PUT API
- [ ] Delete todo calls DELETE API
- [ ] Edit todo calls PUT API
- [ ] Show error or success feedback

## 8. UI and UX Polish
- [ ] Loading indicators (API in progress)
- [ ] Filter: All / Active / Completed
- [ ] Sort: Date / Title / Status
- [ ] Mobile responsive layout
- [ ] Confirmation before delete
- [ ] Toasts for actions (e.g., success/error)

## 9. Security
- [ ] Sanitize user input
- [ ] Secure cookies or tokens
- [ ] Enforce auth middleware on all todo routes
- [ ] Rate limiting (optional)
- [ ] Protect against XSS / CSRF (optional)

## 10. Final Steps
- [ ] Refactor into reusable components (`TodoItem`, `TodoList`, `AuthForm`)
- [ ] Clean up code and remove test data
- [ ] Add environment variables (`.env`)
- [ ] Deploy backend and frontend (e.g., Vercel, Netlify, Render, Railway)
- [ ] Finalize README
- [ ] Add unit/integration tests (optional)

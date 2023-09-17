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
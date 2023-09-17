package main

import (
	"fmt"
	"strings"
	"time"
)

// Declaring the todo struct here I think that's everything.
type todo struct {
	name        string
	completed   bool
	timeEntered string
	// small description about the Todo
	someText string
}

func newTodo(name, someText string) *todo {
	t := todo{name: name}
	t.completed = false
	//Turns out I was using time wrong before
	now := time.Now()
	t.timeEntered = now.Format("2006-01-02")
	return &t
}

func mainMenu() string {
	var input string
	print(`
			========== Main Menu ==========
			-------------------------------

			A. Add a new Todo 
			B. Load Todo File
			C. Save Current Todos to File
			D. Print Loaded Todos
			Q. Quit

			-------------------------------
			========== Main Menu ==========
	`)

	fmt.Println("Please enter a choice: ")
	fmt.Scan(&input)
	input = strings.ToUpper(input)
	return input
}

func main() {
	var quit bool

	for !quit {
		choice := mainMenu()
		switch choice {
		case "A":
			fmt.Println("Add a todo selected.")
		case "B":
			fmt.Println("Load Todo File selected.")
		case "C":
			fmt.Println("Save Current Todos to File.")
		case "D":
			fmt.Println("Print Loaded Todos.")
		case "Q":
			quit = true
		default:
			fmt.Println("Input not recognized try again")
		}
	}
}

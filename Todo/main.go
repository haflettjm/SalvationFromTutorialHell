package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
)

// Declaring the todo struct here I think that's everything.
type todo struct {
	name        string
	completed   bool
	timeEntered string
	// small description about the Todo
	descr string
}

func newTodo(name, descr string) *todo {
	t := todo{name: name}
	t.completed = false
	//Turns out I was using time wrong before
	now := time.Now()
	t.timeEntered = now.Format("2006-01-02")
	t.descr = descr
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

func readLine() string {
	// Why isn't this done by default?
	// Simple user Input is already a complex task why
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	return input
}

func createTodo() *todo {
	now := time.Now()
	var (
		name        string
		description string
	)
	fmt.Printf("Date created %s.", now.Format("2006-01-02"))
	fmt.Println("Please enter a name for the todo:")
	name = readLine()
	fmt.Println("Optional if you would like please enter a description for the todo:")
	description = readLine()

	// assign these values
	t := newTodo(name, description)
	//Return the todo
	return t
}

func outpuTodos(list []todo) {
	for i, item := range list {
		// Okay so printing a struct needs a verb argument for printf weird

		fmt.Printf("Todo # %d :\n %s \n Completed:\n %t \n Date Created:\n %s \n Description:\n %s", i+1, item.name, item.completed, item.timeEntered, item.descr)
	}
}

func main() {
	var quit bool
	todos := make([]todo, 0)
	for !quit {
		choice := mainMenu()
		switch choice {
		case "A":
			fmt.Println("Add a todo selected")
			var t todo
			t = *createTodo()
			todos = append(todos, t)
		case "B":
			fmt.Println("Load Todo File selected.")
		case "C":
			fmt.Println("Save Current Todos to File selected.")
		case "D":
			fmt.Println("Print Loaded Todos selected.")
			outpuTodos(todos)
		case "E":
			fmt.Println("Update Todo selected.")
		case "Q":
			quit = true
		default:
			fmt.Println("Input not recognized try again")
		}
	}
}

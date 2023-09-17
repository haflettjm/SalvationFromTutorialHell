package main

import (
	"fmt"
)

type todo struct {
	name        string
	completed   bool
	timeEntered string
	someText    string
}

func newTodo(name string) *todo {

}

func main() {

	fmt.Println("Hello World!")
	fmt.Printf("The Todo Type %T", todo)
}

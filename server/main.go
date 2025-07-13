package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	address := flag.String("address", ":18083", "HTTP network address")

	fileServer := http.FileServer(http.Dir("dist/"))

	http.Handle("/", fileServer)

	// Start the server
	log.Printf("Starting chatbot on %s...", *address)
	if err := http.ListenAndServe(*address, nil); err != nil {
		log.Fatal(err)
	}
}

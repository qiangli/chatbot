package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	address := flag.String("address", ":18083", "HTTP network address")

	// TODO
	// ui/dist
	// extension/chrome/toolbar/dist/
	fileServer := http.FileServer(http.Dir("assistant/dist"))

	http.Handle("/", fileServer)

	log.Printf("Starting chatbot on %s...", *address)
	if err := http.ListenAndServe(*address, nil); err != nil {
		log.Fatal(err)
	}
}

package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	address := flag.String("address", ":18080", "HTTP network address")

	flag.Parse()

	mux := http.NewServeMux()

	assistantServer := http.StripPrefix("/assistant/", http.FileServer(http.Dir("assistant/dist")))
	mux.Handle("/assistant/", assistantServer)

	widgetServer := http.StripPrefix("/widget/", http.FileServer(http.Dir("widget/dist")))
	mux.Handle("/widget/", widgetServer)

	fileServer := http.FileServer(http.Dir("server/static"))
	mux.Handle("/", fileServer)

	log.Printf("Starting chatbot on %s...", *address)
	if err := http.ListenAndServe(*address, mux); err != nil {
		log.Fatal(err)
	}
}

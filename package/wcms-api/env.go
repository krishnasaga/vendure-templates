package main

import (
	"log"
	"github.com/joho/godotenv"
)

func LoadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading .env, using system env vars")
	}
}

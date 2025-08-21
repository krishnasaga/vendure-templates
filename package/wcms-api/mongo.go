package main

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
)

var (
	mongoClient *mongo.Client
	dbName      string
)

func InitMongo() {
	mongoURI := os.Getenv("MONGODB_URI")
	dbName = os.Getenv("MONGODB_DB")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}
	if dbName == "" {
		dbName = "wcms"
	}
	var err error
	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("MongoDB connect error: %v", err)
	}
}

package main

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func handleComponents(w http.ResponseWriter, r *http.Request) {
	coll := mongoClient.Database(dbName).Collection("components")
	ctx := context.Background()
	path := strings.TrimPrefix(r.URL.Path, "/components")
	if path == "" || path == "/" {
		// GET /components - list all components
		cursor, err := coll.Find(ctx, bson.M{})
		if err != nil { http.Error(w, err.Error(), 500); return }
		var results []bson.M
		if err := cursor.All(ctx, &results); err != nil { http.Error(w, err.Error(), 500); return }
		json.NewEncoder(w).Encode(results)
		return
	}
	parts := strings.Split(strings.TrimPrefix(path, "/"), "/")
	if len(parts) == 1 {
		// GET /components/:id
		objID, err := primitive.ObjectIDFromHex(parts[0])
		if err != nil { http.Error(w, "Invalid id", 400); return }
		var result bson.M
		if err := coll.FindOne(ctx, bson.M{"_id": objID}).Decode(&result); err != nil {
			http.Error(w, "Component not found", 404); return
		}
		json.NewEncoder(w).Encode(result)
		return
	}
	if len(parts) == 2 && parts[0] == "type" {
		// GET /components/type/:id
		typeId := parts[1]
		cursor, err := coll.Find(ctx, bson.M{"type": typeId})
		if err != nil { http.Error(w, err.Error(), 500); return }
		var results []bson.M
		if err := cursor.All(ctx, &results); err != nil { http.Error(w, err.Error(), 500); return }
		json.NewEncoder(w).Encode(results)
		return
	}
	http.Error(w, "Not found", 404)
}

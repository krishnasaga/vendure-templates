package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func handlePages(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handleGetPages(w, r)
	case "PATCH":
		handlePatchPageComponent(w, r)
	default:
		http.Error(w, "Method not allowed", 405)
	}
}

func handleGetPages(w http.ResponseWriter, r *http.Request) {
	coll := mongoClient.Database(dbName).Collection("pages")
	ctx := context.Background()
	path := strings.TrimPrefix(r.URL.Path, "/pages")
	if path == "" || path == "/" {
		// GET /pages/ - list all pages
		cursor, err := coll.Find(ctx, bson.M{})
		if err != nil { http.Error(w, err.Error(), 500); return }
		var results []bson.M
		if err := cursor.All(ctx, &results); err != nil { http.Error(w, err.Error(), 500); return }
		json.NewEncoder(w).Encode(results)
		return
	}
	// GET /pages/:pageId
	pageId := strings.TrimPrefix(path, "/")
	objID, err := primitive.ObjectIDFromHex(pageId)
	if err != nil { http.Error(w, "Invalid pageId", 400); return }
	var result bson.M
	if err := coll.FindOne(ctx, bson.M{"_id": objID}).Decode(&result); err != nil {
		http.Error(w, "Page not found", 404); return
	}
	json.NewEncoder(w).Encode(result)
}

func handlePatchPageComponent(w http.ResponseWriter, r *http.Request) {
	// Check if user has edit permissions (if auth is enabled)
	authConfig := LoadAuthConfig()
	if authConfig.EnableAuth {
		user, ok := GetUserFromContext(r.Context())
		if !ok {
			http.Error(w, "Authentication required", 401)
			return
		}
		
		// Check if user has editor role (optional - customize based on your needs)
		if !HasRole(r.Context(), "editor") && !HasRole(r.Context(), "admin") {
			http.Error(w, "Insufficient permissions - editor or admin role required", 403)
			return
		}
		
		// Log the edit action for audit trail
		log.Printf("User %s (%s) editing component", user.Username, user.Email)
	}

	// PATCH /pages/:pageId/components/:componentId
	path := strings.TrimPrefix(r.URL.Path, "/pages/")
	parts := strings.Split(path, "/")

	if len(parts) != 3 || parts[1] != "components" {
		http.Error(w, "Invalid URL format. Use /pages/:pageId/components/:componentId", 400)
		return
	}

	pageId := parts[0]
	componentId := parts[2]

	// Validate page ID
	objID, err := primitive.ObjectIDFromHex(pageId)
	if err != nil {
		http.Error(w, "Invalid pageId", 400)
		return
	}

	// Parse request body
	var updateData bson.M
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		http.Error(w, "Invalid JSON", 400)
		return
	}

	coll := mongoClient.Database(dbName).Collection("pages")
	ctx := context.Background()

	// Update the specific component in the items array
	filter := bson.M{
		"_id": objID,
		"content.page.container.grid.items.id": componentId,
	}

	// Build the update document
	update := bson.M{"$set": bson.M{}}
	for key, value := range updateData {
		updateKey := "content.page.container.grid.items.$." + key
		update["$set"].(bson.M)[updateKey] = value
	}

	// Perform the update
	result, err := coll.UpdateOne(ctx, filter, update)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "Page or component not found", 404)
		return
	}

	// Return the updated component
	var updatedPage bson.M
	if err := coll.FindOne(ctx, bson.M{"_id": objID}).Decode(&updatedPage); err != nil {
		http.Error(w, "Failed to fetch updated page", 500)
		return
	}

	// Find and return the updated component
	if content, ok := updatedPage["content"].(bson.M); ok {
		if page, ok := content["page"].(bson.M); ok {
			if container, ok := page["container"].(bson.M); ok {
				if grid, ok := container["grid"].(bson.M); ok {
					if items, ok := grid["items"].([]interface{}); ok {
						for _, item := range items {
							if itemMap, ok := item.(bson.M); ok {
								if itemMap["id"] == componentId {
									json.NewEncoder(w).Encode(itemMap)
									return
								}
							}
						}
					}
				}
			}
		}
	}

	http.Error(w, "Component not found in updated page", 500)
}

package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

// --- Define Go types for our mock data ---
type Logo struct {
	URL     string `json:"url"`
	AltText string `json:"altText,omitempty"`
}

type NavItem struct {
	ID       string    `json:"id"`
	Label    string    `json:"label"`
	Path     string    `json:"path"`
	Children []NavItem `json:"children,omitempty"`
}

type Header struct {
	Logo      Logo      `json:"logo"`
	MenuItems []NavItem `json:"menuItems"`
}

type FooterLink struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	Path  string `json:"path"`
}

type Footer struct {
	Copyright string       `json:"copyright,omitempty"`
	Links     []FooterLink `json:"links"`
}

type Layout struct {
	Header Header `json:"header"`
	Footer Footer `json:"footer"`
}

// --- Create our mock data ---
var mockLayout = Layout{
	Header: Header{
		Logo: Logo{
			URL:     "https://example.com/logo.png",
			AltText: "Site Logo",
		},
		MenuItems: []NavItem{
			{ID: "1", Label: "Home", Path: "/"},
			{ID: "2", Label: "About", Path: "/about"},
			{
				ID:    "3",
				Label: "Services",
				Path:  "/services",
				Children: []NavItem{
					{ID: "3-1", Label: "Consulting", Path: "/services/consulting"},
					{ID: "3-2", Label: "Development", Path: "/services/development"},
				},
			},
		},
	},
	Footer: Footer{
		Copyright: "© 2025 Example Inc.",
		Links: []FooterLink{
			{ID: "f1", Label: "Privacy Policy", Path: "/privacy"},
			{ID: "f2", Label: "Terms of Service", Path: "/terms"},
		},
	},
}

// --- Build GraphQL schema ---
func main() {
	// Logo type
	logoType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Logo",
		Fields: graphql.Fields{
			"url":     &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"altText": &graphql.Field{Type: graphql.String},
		},
	})

	// NavItem type (recursive)
	var navItemType *graphql.Object
	navItemType = graphql.NewObject(graphql.ObjectConfig{
		Name: "NavItem",
		Fields: graphql.FieldsThunk(func() graphql.Fields {
			return graphql.Fields{
				"id":       &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
				"label":    &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
				"path":     &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
				"children": &graphql.Field{Type: graphql.NewList(navItemType)},
			}
		}),
	})

	// Header type
	headerType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Header",
		Fields: graphql.Fields{
			"logo":      &graphql.Field{Type: graphql.NewNonNull(logoType)},
			"menuItems": &graphql.Field{Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(navItemType)))},
		},
	})

	// FooterLink type
	footerLinkType := graphql.NewObject(graphql.ObjectConfig{
		Name: "FooterLink",
		Fields: graphql.Fields{
			"id":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"label": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"path":  &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})

	// Footer type
	footerType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Footer",
		Fields: graphql.Fields{
			"copyright": &graphql.Field{Type: graphql.String},
			"links":     &graphql.Field{Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(footerLinkType)))},
		},
	})

	// Layout type
	layoutType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Layout",
		Fields: graphql.Fields{
			"header": &graphql.Field{Type: graphql.NewNonNull(headerType)},
			"footer": &graphql.Field{Type: graphql.NewNonNull(footerType)},
		},
	})

	// Root query
	rootQuery := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"layout": &graphql.Field{
				Type: layoutType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return mockLayout, nil
				},
			},
		},
	})

	// Schema
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: rootQuery,
	})
	if err != nil {
		log.Fatalf("Failed to create schema: %v", err)
	}

	// Set up HTTP handler
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	http.Handle("/graphql", h)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Go GraphQL server is running. POST queries to /graphql"))
	})

	log.Println("🚀 Server listening on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

package main

import (
	"log"
	"net/http"
	"os"

	"todo-app/backend/database"
	"todo-app/backend/handlers"
	"todo-app/backend/middleware"
	"todo-app/backend/services"

	"github.com/gin-gonic/gin"
)

func main() {
	// Configuration from environment with sensible defaults.
	port := getEnv("PORT", "8080")
	dsn := getEnv("DB_PATH", "todos.db")

	// Initialise database.
	database.Connect(dsn)

	// Wire up dependencies.
	todoSvc := services.NewTodoService(database.DB)
	todoHandler := handlers.NewTodoHandler(todoSvc)

	// Router.
	r := gin.Default()
	r.Use(middleware.CORS())

	// Health check.
	r.GET("/health", func(c *gin.Context) {
		if err := database.Ping(); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "error", "db": "disconnected"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok", "db": "connected"})
	})

	// API v1 routes.
	v1 := r.Group("/api/v1")
	{
		v1.GET("/todos", todoHandler.ListTodos)
		v1.POST("/todos", todoHandler.CreateTodo)
		v1.PUT("/todos/:id", todoHandler.UpdateTodo)
		v1.DELETE("/todos/:id", todoHandler.DeleteTodo)
	}

	log.Printf("server starting on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

// getEnv returns the value of the environment variable or a fallback default.
func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

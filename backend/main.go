package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"todo-app/backend/handlers"
	"todo-app/backend/models"
)

func main() {
	// Database setup
	db, err := gorm.Open(sqlite.Open("todos.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Auto-migrate schema
	if err := db.AutoMigrate(&models.Todo{}); err != nil {
		log.Fatalf("failed to auto-migrate: %v", err)
	}

	// Gin router
	r := gin.New()

	// Middleware: request logger (method, path, status, latency)
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORS middleware — allow requests from localhost:3000
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	h := handlers.NewHandler(db)

	// Routes
	r.GET("/health", h.HealthCheck)

	todos := r.Group("/todos")
	{
		todos.GET("", h.GetTodos)
		todos.POST("", h.CreateTodo)
		todos.PUT("/:id", h.UpdateTodo)
		todos.DELETE("/:id", h.DeleteTodo)
	}

	// Determine port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

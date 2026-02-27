package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"todo-app/backend/models"
)

// Handler holds the database connection.
type Handler struct {
	DB *gorm.DB
}

// NewHandler creates a new Handler with the given DB.
func NewHandler(db *gorm.DB) *Handler {
	return &Handler{DB: db}
}

// HealthCheck handles GET /health.
func (h *Handler) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

// GetTodos handles GET /todos — returns all todos.
func (h *Handler) GetTodos(c *gin.Context) {
	var todos []models.Todo
	if result := h.DB.Order("created_at asc").Find(&todos); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch todos"})
		return
	}
	// Return empty array, not null
	if todos == nil {
		todos = []models.Todo{}
	}
	c.JSON(http.StatusOK, todos)
}

// CreateTodoInput is the request body for creating a todo.
type CreateTodoInput struct {
	Title string `json:"title" binding:"required"`
}

// CreateTodo handles POST /todos — creates a new todo.
func (h *Handler) CreateTodo(c *gin.Context) {
	var input CreateTodoInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo := models.Todo{
		Title:     input.Title,
		Completed: false,
	}

	if result := h.DB.Create(&todo); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create todo"})
		return
	}

	c.JSON(http.StatusCreated, todo)
}

// UpdateTodoInput is the request body for updating a todo.
type UpdateTodoInput struct {
	Title     *string `json:"title"`
	Completed *bool   `json:"completed"`
}

// UpdateTodo handles PUT /todos/:id — updates title and/or completed status.
func (h *Handler) UpdateTodo(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var todo models.Todo
	if result := h.DB.First(&todo, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "todo not found"})
		return
	}

	var input UpdateTodoInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := map[string]interface{}{}
	if input.Title != nil {
		updates["title"] = *input.Title
	}
	if input.Completed != nil {
		updates["completed"] = *input.Completed
	}

	if len(updates) > 0 {
		if result := h.DB.Model(&todo).Updates(updates); result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update todo"})
			return
		}
	}

	// Reload to return updated record
	h.DB.First(&todo, id)
	c.JSON(http.StatusOK, todo)
}

// DeleteTodo handles DELETE /todos/:id — deletes a todo.
func (h *Handler) DeleteTodo(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var todo models.Todo
	if result := h.DB.First(&todo, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "todo not found"})
		return
	}

	if result := h.DB.Delete(&todo); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete todo"})
		return
	}

	c.Status(http.StatusNoContent)
}

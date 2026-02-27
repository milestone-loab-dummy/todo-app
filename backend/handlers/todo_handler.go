package handlers

import (
	"errors"
	"net/http"
	"strconv"

	"todo-app/backend/models"
	"todo-app/backend/services"

	"github.com/gin-gonic/gin"
)

// TodoHandler holds the service dependency for todo endpoints.
type TodoHandler struct {
	svc *services.TodoService
}

// NewTodoHandler creates a new TodoHandler.
func NewTodoHandler(svc *services.TodoService) *TodoHandler {
	return &TodoHandler{svc: svc}
}

// respondError writes a consistent JSON error response.
func respondError(c *gin.Context, status int, msg string) {
	c.JSON(status, gin.H{"error": msg})
}

// ListTodos handles GET /api/v1/todos
func (h *TodoHandler) ListTodos(c *gin.Context) {
	todos, err := h.svc.ListAll()
	if err != nil {
		respondError(c, http.StatusInternalServerError, "failed to fetch todos")
		return
	}

	resp := make([]models.TodoResponse, len(todos))
	for i, t := range todos {
		resp[i] = t.ToResponse()
	}
	c.JSON(http.StatusOK, resp)
}

// CreateTodo handles POST /api/v1/todos
func (h *TodoHandler) CreateTodo(c *gin.Context) {
	var req models.CreateTodoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		respondError(c, http.StatusBadRequest, "title is required")
		return
	}

	todo, err := h.svc.Create(req.Title)
	if err != nil {
		respondError(c, http.StatusInternalServerError, "failed to create todo")
		return
	}
	c.JSON(http.StatusCreated, todo.ToResponse())
}

// UpdateTodo handles PUT /api/v1/todos/:id
func (h *TodoHandler) UpdateTodo(c *gin.Context) {
	id, err := parseID(c)
	if err != nil {
		return
	}

	var req models.UpdateTodoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		respondError(c, http.StatusBadRequest, "invalid request body")
		return
	}

	todo, err := h.svc.Update(id, req)
	if err != nil {
		if errors.Is(err, services.ErrNotFound) {
			respondError(c, http.StatusNotFound, "todo not found")
			return
		}
		respondError(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, todo.ToResponse())
}

// DeleteTodo handles DELETE /api/v1/todos/:id
func (h *TodoHandler) DeleteTodo(c *gin.Context) {
	id, err := parseID(c)
	if err != nil {
		return
	}

	if err := h.svc.Delete(id); err != nil {
		if errors.Is(err, services.ErrNotFound) {
			respondError(c, http.StatusNotFound, "todo not found")
			return
		}
		respondError(c, http.StatusInternalServerError, "failed to delete todo")
		return
	}
	c.Status(http.StatusNoContent)
}

// parseID extracts and validates the :id path parameter.
func parseID(c *gin.Context) (uint, error) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		respondError(c, http.StatusBadRequest, "invalid id")
		return 0, err
	}
	return uint(id), nil
}

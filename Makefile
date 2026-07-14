# On Windows, force cmd.exe so make doesn't invoke WSL bash (which may have no distro).
ifeq ($(OS),Windows_NT)
SHELL := cmd.exe
.SHELLFLAGS := /c
endif

BACKEND_DIR  := LDC-Backend-Project
SOLUTION     := $(BACKEND_DIR)/LDC Project.sln
STARTUP      := $(BACKEND_DIR)/Project.PresentationLayer
INFRA        := $(BACKEND_DIR)/Project.InfrastructureLayer
FRONTEND_DIR := LDC-Frontend-Project/LDC

export DOTNET_ROLL_FORWARD := Major

.DEFAULT_GOAL := run
.PHONY: run backend frontend

run backend:
	dotnet restore "$(SOLUTION)"
	dotnet ef database update --project "$(INFRA)" --startup-project "$(STARTUP)"
	dotnet run --project "$(STARTUP)" --launch-profile https

frontend:
	npm --prefix "$(FRONTEND_DIR)" install
	npm --prefix "$(FRONTEND_DIR)" run dev


BACKEND_DIR  := LDC-Backend-Project
SOLUTION     := $(BACKEND_DIR)/LDC Project.sln
STARTUP      := $(BACKEND_DIR)/Project.PresentationLayer
INFRA        := $(BACKEND_DIR)/Project.InfrastructureLayer
FRONTEND_DIR := LDC-Frontend-Project/LDC

ifeq ($(OS),Windows_NT)
NPM := cmd.exe //c npm
else
NPM := npm
endif

export DOTNET_ROLL_FORWARD := Major

.DEFAULT_GOAL := run
.PHONY: run backend frontend

backend:
	dotnet restore "$(SOLUTION)"
	dotnet ef database update --project "$(INFRA)" --startup-project "$(STARTUP)"
	dotnet run --project "$(STARTUP)" --launch-profile https

frontend:
	$(NPM) --prefix "$(FRONTEND_DIR)" install
	$(NPM) --prefix "$(FRONTEND_DIR)" run dev


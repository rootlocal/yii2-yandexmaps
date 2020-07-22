PHP := $$(which php)
NPM := $$(which npm)
GULP := $$(which gulp)
GIT := $$(which git)
COMPOSER := $$(which composer)
RM ?= rm -f

.PHONY: all install build clean watch lint

all: clean install build

install:
	@echo "*** run install ***"
	$(NPM) install

build:
	-mkdir -p ./src/assets/js
	-mkdir -p ./src/assets/css
	@echo "*** run build ***"
	$(GULP) build

clean:
	@echo "*** run clean ***"
	$(RM) -r node_modules
	-find ./src/assets -name "*.*" -type f -delete

watch:
	@echo "*** run watch ***"
	$(GULP) watch

lint:
	$(GULP) lint
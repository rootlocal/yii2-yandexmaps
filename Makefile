NPM=npm
GULP=gulp

all: clean install build

install:
	$(info *** run install ***)
	$(NPM) install

build:
	$(info *** run build ***)
	$(GULP) build

clean:
	$(info *** run clean ***)
	rm -rf node_modules
	cd src/assets && find . -name "*.*" -type f -delete && cd ../../

help:
	$(info make: install build clean help watch lint)

watch:
	$(info *** run watch ***)
	$(GULP) watch

lint:
	$(GULP) watch lint
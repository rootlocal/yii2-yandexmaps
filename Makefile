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
	cd src/assets && find . -name "*.*" -type f -delete && cd ../../

help:
	$(info make: install build clean help)
all: elm.js bundle.js sitios
client: elm.js bundle.js

bundle.js: client/app.js
	cd client && ./node_modules/.bin/browserifyinc -vd app.js -o ../bundle.js

elm.js: client/*.elm
	cd client && elm make --yes Main.elm --output ../elm.js

sitios: *.go
	go build

run:
	ag --ignore bundle.js --ignore elm.js -l | entr -r fish -c 'make; and godotenv ./sitios'
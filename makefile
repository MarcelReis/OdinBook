deploy-front:
	cd ./packages/app && \
	yarn run build && \
	firebase deploy --only hosting

deploy-functions:
	cd ./packages/functions && \
	yarn run build && \
	firebase deploy --only functions

run:
	lerna run start --parallel

run-functions:
	lerna run start --scope=functions

run-emulators:
	firebase emulators:start --import=./.firebase/db --export-on-exit
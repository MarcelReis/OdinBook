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

run-app:
	lerna run start --scope=app --stream

run-functions:
	lerna run start --scope=functions --stream

run-emulators:
	firebase emulators:start --import=./.firebase --export-on-exit --project odinbook
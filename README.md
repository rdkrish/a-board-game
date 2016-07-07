# A Board Game
A Board Game where multiple players compete to acquire maximum number of squares on the board

# Setup Steps
1. Install latest version of node and npm
	- You can download it from https://nodejs.org/en/download/
2. Install pm2 and webpack npm modules
	- `npm install -g pm2`
	- `npm install -g webpack`
3. Install all the required npm modules
	- `cd board-game`
	- `npm install`
4. Run webpack bundler
	- `webpack`

Note: you should be within the board game directory

5. Start the game server
	- `/opt/node/bin/pm2 start --no-daemon bin/www -i 2`

6. Go to http://localhost:8000 to play the game

# Docker

For ease of deployment you can also start the game within a docker container.

You can use the Dockerfile given in the code base to build a custom docker image and create docker container

## Docker Image Setup

- `cd docker`
- `docker build -t "board-game:0.0.1" --rm=true --no-cache .`
- `docker run --name board-game -p 8000:8000 -v /path/to/board-game/:/board-game/ -d board-game:0.0.1`

NOTE: You have to provide the absolute path to the source code of board-game before running the docker run command

# Demo

You can find the working demo at http://rdkrish.in:8000

# Environment setup
## Install NodeJS dependencies

`npm install`

## Run DB
### Run DB on docker (Method 1)
* First, pull postgres image
`docker pull postgres`
* Run postgres image with ENVIRONMENT VARIABLES in the command line arguments
`docker run -d --name postgres_dev -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=natragent postgres`

### Run DB on docker with ENVIRONMENT VARIABLES in Dockerfile (Method 2)
* First build an image with Dockerfile
`docker build -t postgres . `
* Run image with specific ENVIRONMENT VARIABLES in Dockerfile
`docker run --name postgres-dev -d -p 5432:5432 postgres`

# Run 
`npm start`


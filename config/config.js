const config_dev = {
	"MONGO_URI" : "mongodb://localhost:27017/mockingjay-dev",
	"APP_PORT" : "8081"
}

const config_prod = {
	"MONGO_URI" : "mongodb://localhost:27017/mockingjay-prod",
	"APP_PORT" : "80"
}


module.exports = (process.env.NODE_ENV == "production") ? config_prod : config_dev;
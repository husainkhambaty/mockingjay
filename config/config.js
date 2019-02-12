var config_dev = {
	"MONGO_URI" : "mongodb://localhost:27017/mockingjay-dev",
	"APP_PORT" : "8080"
}

var config_prod = {
	"MONGO_URI" : "mongodb://localhost:27017/mockingjay-prod",
	"APP_PORT" : "80"
}



module.exports = function() {

    switch(process.env.NODE_ENV){
        
        case 'prod':
            return config_prod;

        default:
            return config_dev;
    }
};
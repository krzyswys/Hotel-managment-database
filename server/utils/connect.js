const mongoose = require('mongoose')

/**
 * Setup database connection 
 * @param callback called after successful connection establishment
 */
const connect = async callback => {
    console.log(`connecting to ${process.env.MONGO_URL}`)
    
    try {
        await mongoose.connect(
            process.env.MONGO_URL, 
            {
                "auth": {
                  "authSource": process.env.MONGO_ADMIN_USERNAME
                },
                "user": process.env.MONGO_USERNAME,
                "pass": process.env.MONGO_PASSWORD
            }
        )
    
        console.log(`successfully connected to ${process.env.MONGO_URL}`)
    
        await callback()
    } catch (err) {
        console.error(err)    
    }
}


module.exports = connect
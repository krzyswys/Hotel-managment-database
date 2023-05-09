db.createUser(
    {
        user: process.env.MONGO_DB_USERNAME,
        pwd:  process.env.MONGO_DB_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: process.env.MONGO_INITDB_DATABASE
            }
        ]
    }
);

//MongoDB creates the database when you first store data in that database
db.createCollection("users"); 
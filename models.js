module.exports = () => {
    // Module.exports allows this code to be referenced in other files within the same project
    const Sequelize = require("sequelize");
    // Import Sequelize and open connection to database
    const db = new Sequelize("postgres", "postgres", "cic", {
        host: "127.0.0.1",
        dialect: "postgres"
    });
    // You could have Sequelize connected to multiple databases so you need to tie the specific instance to a variable
    // New Sequelize instance accepts database, username, and password as parameters -> also have to tell it where we're hosting the data and what language we're using
    return {
        db,
        Users: db.define("Users", {
            // Create a Users model with db.define -> first parameter names table Users in Postgres
            // Second parameter creates columns for table
            id: {
                // Start with primary key to tie data together (ex. tasks with users) 
                type: Sequelize.INTEGER.UNSIGNED,
                // have to define data type for columns when you use Postgres
                // Unsigned means ID will always be a positive number
                autoIncrement: true,
                primaryKey: true
                // Sets the user ID as the primary key so it can be referenced as foreign key by other tables -> it's what ties them together
            },
            name: Sequelize.STRING,
            // Value references Sequelize and primitive data type - Sequelize will handle the conversion with Postgres without you having to write the actual SQL
        }),
        Tasks: db.define("Tasks", {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING,
            creationTime: Sequelize.DATE,
            completionTime: Sequelize.DATE,
            dueTime: Sequelize.DATE,
            //userId: Sequelize.INTEGER.UNSIGNED
            userName: Sequelize.STRING
        }),
        init: () => {
            db.sync();
            // uses db object to sync with database and create tables in Postgres with Sequelize
            // { force: true }
        }
    };
};

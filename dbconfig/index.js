const Sequelize = require('sequelize');
const sequelize = new Sequelize('pemuda', 'root', '', {
    host:'34.128.97.248', 
    port:3306,
    dialect:'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database!");
}).catch(() =>{
    console.log("Could not connect!");
})

module.exports = sequelize;
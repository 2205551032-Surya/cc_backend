const Sequelize = require('sequelize');
const sequelize = new Sequelize('name', 'new', 'root', {
    host:'12388888', 
    port:123333,
    dialect:'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database!");
}).catch(() =>{
    console.log("Could not connect!");
})

module.exports = sequelize;

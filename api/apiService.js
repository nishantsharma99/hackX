const Sequelize = require('sequelize');

const sequelize = new Sequelize('nishantsharma', 'nishantsharma99', 'ef182a34', {
    host: 'db4free.net',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Table1 = sequelize.define('Table1', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: 'true',
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255)
    },
    category_name: {
        type: Sequelize.STRING(255)
    },
    description: {
        type: Sequelize.STRING(255)
    },
    buy_price: {
        type: Sequelize.FLOAT
    },
    sell_price: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

sequelize.sync();

module.exports = {
    findByID, create, deleteByName, updateByID
};

function deleteByName(req, res) {
    Table1.destroy({
        where: {
            name: req.params.product_name
        }
    })
        .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                res.status(200).json({});
            }
        }, function (err) {
            res.status(404).json({
                "status": "failure",
                "reason": "explanation"
            });


        })
}

function updateByID(req, res) {
    var parameter = req.body;
    if(parameter.quantity<0){
        res.status(404).json({
        });
    }else{
        Table1.findAll({
            where: {
                id: req.params.product_id
            }
        }).then(function (user) {
            if (user.length == 0) {
                res.status(400).json({
                    "status": "failure",
                    "reason": "explanation"
                });
            } else {
    
                Table1.update(
                    {
                        name: parameter.name,
    
                        category_name: parameter.category,
                        description: parameter.description,
                        buy_price: parameter.buy_price,
                        sell_price: parameter.sell_price,
                        quantity: parameter.quantity
                    },
                    {
                        where: {
                            id: req.params.product_id
                        }
                    }
                ).then(function (result) {
                    res.status(200).json({
                        "status": "success"
                    });
                })
                    .catch(function (err) {
                        res.status(400).json({
                            "status": "failure",
                            "reason": "explanation"
                        });
                    })
    }
            })
    
    }
    }

function findByID(req, res) {
    Table1.findAll({
        where: {
            id: req.params.product_id
        }
    }).then(function (product_data) {
        if (product_data.length == 0) {
            res.status(404).json({});
        } else {
            res.status(200).json({
                data: product_data[0].dataValues
            });
        }
    })
}

function create(req, res) {
    var parameter = req.body;
    if(parameter.quantity<0){
        res.status(404).json({
        });
    }else {
        Table1.create({
            name: parameter.name,
    
            category_name: parameter.category,
            description: parameter.description,
            buy_price: parameter.buy_price,
            sell_price: parameter.sell_price,
            quantity: parameter.quantity
        }).catch(function (err) {
            res.status(400).json({
                "status": "failure",
                "reason": "explanation"
            });
        }).then(function () {
            Table1.findAll({
                where: {
                    name: parameter.name,
    
                    category_name: parameter.category,
                }
            }).then(function (product) {
                if (product.length == 0) {
                    res.status(400).json({
                        "status": "failure",
                        "reason": "explanation"
                    });
                } else {
    
                    res.status(200).json({
                        "id": product[0].dataValues.id,
                        "name": product[0].dataValues.name,
                        "category": product[0].dataValues.category_name,
                        "description": product[0].dataValues.description,
                        "buy_price": product[0].dataValues.buy_price,
                        "sell_price": product[0].dataValues.sell_price,
                        "quantity": product[0].dataValues.quantity
                    });
                }
            })
        })
    }
    }
const express = require('express');
const http = require('http')
const path = require('path');
var bodyParser = require('body-parser');  
var mongo = require('mongoose');  
  
var db = mongo.connect('mongodb://wesleypayreadwrite:WesleyPayReadWrite@ds233500.mlab.com:33500/wesleypay-prod', function(err, response){  
   if (err) {
       console.log('MongoDB connect error: ' + err);
    } else { 
        console.log('Connected to ' + db, ' + ', response);
    }  
});

const app = express();

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];

// Config Express
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json({limit:'5mb'}));    
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});

// Define bill and bill item schema
var Schema = mongo.Schema;

var billItemSchema = new Schema({
    title: {type: String, required: true},
    cost: {type: Number, required: true},
    mandatory: {type: Boolean, required: true},
    paid: {type: Boolean}
 });

var billSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    message: {type: String, required: true},
    tax_percent: {type: Number, required: true},
    tip_percent: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now},
    items: [billItemSchema]
});

var Bill = mongo.model('Bill', billSchema);

// ----- API Routes ----- //

// Get all bills
app.get('/api/bills', function (req, res) {
    Bill.find(function (err, bills) {
        if (err) {
            res.send(err);
        }
        res.json(bills);
    });
});

// Get bill by name
app.get('/api/bills/:billName', function (req, res) {
    Bill.findOne({name: req.params.billName}, function (err, bill) {
        if (err) {
            res.send(err);
        }
        res.json(bill);
    });
});

// Get bill items by bill name
app.get('/api/bills/:billName/items', function (req, res) {
    Bill.findOne({name: req.params.billName}, function (err, bill) {
        if (err) {
            res.send(err);
        }
        res.json(bill.items);
    });
});

// Add new bill
app.post('/api/new/bill', function (req, res, next){   
    Bill.create( {
            name: req.body.name,
            description: req.body.description,
            message: req.body.message,
            tax_percent: req.body.tax_percent,
            tip_percent: req.body.tip_percent,
            items: req.body.items
        }, function (err, bill) {
            if (err) {
                return next(err);
            } 
            res.json(bill);
        }
    );
})

// Add new item to bill
app.post('/api/new/item/:billName', function (req, res){   
    Bill.update( {
            'name': req.params.billName
        }, { 
            $addToSet: {
                items: {
                    title: req.body.title,
                    cost: req.body.cost,
                    mandatory: req.body.mandatory,
                    paid: req.body.paid
                }
            }
        }, { 
            safe: true, upsert: true
        }, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        }
    );
})

// Update bill
app.put('/api/bill/:billName', function(req, res, next) {
    Bill.update( {
            'name': req.params.billName
        }, { 
            name: req.body.name,
            description: req.body.description,
            message: req.body.message,
            tax_percent: req.body.tax_percent,
            tip_percent: req.body.tip_percent
        }, { 
            safe: true, upsert: true
        }, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        }
    );
});

// Update bill item
app.put('/api/item/:billName/:billItemId', function (req, res) {   
    Bill.update( {
            'name': req.params.billName, 
            'items._id': req.params.billItemId
        }, {
            $set: {
                'items.$.title': req.body.title,
                'items.$.cost': req.body.cost,
                'items.$.mandatory': req.body.mandatory,
                'items.$.paid': req.body.paid
            }
        }, function (err, item) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.json(item);
        }
    );
})


// Delete bill
app.delete('/api/delete/bill/:billName', function(req, res) {
    Bill.deleteOne( {
            'name': req.params.billName
        },  function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        }
    );
});

// Delete bill item
app.delete('/api/delete/item/:billName/:billItemId', function (req, res) {   
    Bill.update( {
            'name': req.params.billName
        }, {
            $pull: {
                'items': {
                    '_id': req.params.billItemId
                }
            }
        }, function (err, item) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.json(item);
        }
    );
})

// Default route for site
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve('public/${req.url}'));
    } else {
        res.sendFile(path.resolve('dist/index.html'));
    }
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('WesleyPay is running on port ' + port));
var express = require('express');
var path = require('path');
var transactionsData = require('./data/transactions.json');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/widgets", express.static(__dirname + "/widgets"));

app.get('/', function(req, res) {
    res.writeHead(301, {"Location": "index.html"});
    res.end();
});

app.get('/api/transactions', function(req, res) {

	function getCompareFn(key) {
		return function compareDate(a,b) {
		  if (a[key] < b[key]) {
		  	return -1;
		  } else if (a[key] > b[key]) {
		  	return 1;
		  } else {
		  	return 0;
		  }
		}	
	}

	var sort = req.query.sort || 'transactionAmount';
	var compareFn = getCompareFn(sort);
	var sortedData = transactionsData.sort(compareFn);

	console.log("Transactions sorted by '" + sort + "' sent.")
	res.json(sortedData);
});

app.post('/api/transactions/:transactionId/dispute', function(req, res) {
	var id = req.param("transactionId");

	console.log("Disputing transaction for transaction with id" + id);
	if(id) {
		res.json({
			"message" : "Dispute request sent for transaction " + id
		});	
	} else {
		var err = new Error('Not transaction id specified');
	    err.status = 404;
	    next(err);
	}
	
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

console.log('Server is listening on port 9999')
app.listen(9999);
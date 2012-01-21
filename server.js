var express = require('express')
var io = require('socket.io')
var mongo = require('mongodb')

var server = express.createServer(), 
	io = io.listen(server)
server.set('view engine', 'ejs')
server.set('view options', {
	layout: false
})
io.set('log level', 1)
server.set('views', __dirname + "/views");
server.use(express.bodyParser())
server.use("/static", express.static(__dirname + "/static"))

var db = new mongo.Db('shot', new mongo.Server("127.0.0.1", 27017, {auto_reconnect: true}), {})
db.open(
	function(err, db) {
		server.listen(80)
	}
)


server.get('/', 
	function(req, res) {
		res.render('index')
	}
)

server.get('/highscores',
	function(req, res) {
		db.collection('scores',
			function(err, collection) {
				collection.find({}, {limit: 1000, sort:[['score', 'desc'],['_id', 'asc'],['name', 'asc']]},
					function(err, cursor) {
						cursor.toArray(
							function(err, items) {
								if(items.length > 0) {
									res.writeHead(200, {'Content-Type': 'text/plain'})
									for(i=0; i<items.length; i++) {
										res.write(JSON.stringify(items[i]) + '\n')
									}
								}
								else{
									res.writeHead(404, {'Content-Type': 'text/plain'})
									res.write('No highscores :(')
								}
								res.end()
							}
						)
					} 
				)
			}
		)
	}
)

io.sockets.on('connection',
	function(socket) {
		socket.on('submitscore',
			function(data) {
				db.collection('scores',
					function(err, collection) {
						collection.insert({name: data['name'], score: data['score']})
					}
				)
			}
		)
	}
)
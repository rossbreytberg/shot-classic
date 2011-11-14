import web
urls = (
	'/', 'index',
	'/add', 'add'
)

app = web.application(urls, globals())
db = web.database(dbn='mysql', user='root', pw='password', db='shot')

class index:
	def GET(self):
		render = web.template.render('templates/')
		scores = db.select('scores')
		return render.index(scores)
	
class add:
	def POST(self):
		i = web.input()
		n = db.insert('scores', score=i.score, name=i.name)
		raise web.seeother('/')


if __name__ == "__main__": app.run()
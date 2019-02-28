from flask import Flask , jsonify, request
from flask_cors import CORS 
from pymongo import MongoClient
import json

## mongoDB
## Modify the auth token
client = MongoClient("mongodb://law_ai_test:3EEkFTPq6MdM9qTd@samuel-shard-00-00-ysbfm.mongodb.net:27017,samuel-shard-00-01-ysbfm.mongodb.net:27017,samuel-shard-00-02-ysbfm.mongodb.net:27017/test?ssl=true&replicaSet=Samuel-shard-0&authSource=admin&retryWrites=true")

app = Flask(__name__)
CORS(app)


#print(blockchain.get_chain())


@app.route("/", methods = ["GET"])
def get_ui():
	db=client.admin
	serverStatusResult=db.command("serverStatus")
	return str(serverStatusResult)

@app.route("/registerbuying", methods = ["GET"])
def registerBuyingToDB():
	rating = int(request.args.get('rating'))
	print(rating)
	db=client.businessTest
	ratingItem = db.reviews.find_one({'rating': rating})
	print(ratingItem)
	ratingCount = db.reviews.find({'rating': rating}).count()
	print(ratingCount)
	response = {
	"ratingItem":ratingItem,
	"ratingCount":ratingCount}
	return str(response)

@app.route("/retrievebuying", methods = ["GET"])
def retrieveBuyingFromDB():
	rating = int(request.args.get('rating'))
	print(rating)
	db=client.businessTest
	ratingItems = db.reviews.find({'rating': rating})
	res = []
	for item in ratingItems:
		try: 
			del item["_id"]
		except KeyError: 
			pass
		res.append(item)
	return str(res)



if __name__ == '__main__':
	from argparse import ArgumentParser
	parser = ArgumentParser()
	parser.add_argument("-p", "--port", type = int, default = 5001)
	args = parser.parse_args()
	port = args.port
	app.run(host = "127.0.0.1", port = port)
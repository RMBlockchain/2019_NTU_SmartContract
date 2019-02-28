from flask import Flask , jsonify, request
from flask_cors import CORS 
from pymongo import MongoClient
import json

from constants.authInfo import mongoDB_Auth
print(mongoDB_Auth)
## mongoDB
## Modify the auth token
client = MongoClient(mongoDB_Auth)

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
	parser.add_argument("-p", "--port", type = int, default = 5003)
	args = parser.parse_args()
	port = args.port
	app.run(host = "127.0.0.1", port = port)
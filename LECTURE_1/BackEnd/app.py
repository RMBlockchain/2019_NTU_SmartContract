from flask import Flask , jsonify, request
from flask_cors import CORS 
from pymongo import MongoClient
import json
import datetime

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
	buyerAddress = request.args.get('address')
	print("Buyer Address : " + buyerAddress)

	productName = request.args.get('productName')
	print("Product Name : " + productName)

	productID = int(request.args.get('productID'))
	print("Product ID : " + str(productID))

	quantity = int(request.args.get('quantity'))
	print("Quantity : " + str(quantity))

	amount = int(request.args.get('amount'))
	print("Amount : " + str(amount))

	timeStamp = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
	print("timeStamp : " + timeStamp)

	response = {
	"buyerAddress":buyerAddress,
	"productName":productName,
	"productID":productID,
	"quantity":quantity,
	"amount":amount,
	"timeStamp":timeStamp,
	}

	# Insert to mongoDB
	db=client.ntuSolidityCourse
	result=db.sellDigitalGoods.insert_one(response)
	print('Created a data with ID {}'.format(result.inserted_id))
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
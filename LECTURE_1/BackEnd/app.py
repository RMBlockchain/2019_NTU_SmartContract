from flask import Flask , jsonify, request
from flask_cors import CORS 
from pymongo import MongoClient

from web3 import Web3
from eth_account.messages import defunct_hash_message

import json
import datetime


from constants.authInfo import mongoDB_Auth
print(mongoDB_Auth)
from constants.contracts import Selling
#print(Selling.abi)

from eth_keys import KeyAPI
from eth_keys.backends import NativeECCBackend
keys = KeyAPI(NativeECCBackend)


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
	# Initial web3 instance 
	web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
	# Verify Signature
	message = "Hello World!"
	messageHash = defunct_hash_message(text = message)

	signature = request.args.get('signature')
	userSentAddress = request.args.get('address')

	recoveredAddress = web3.eth.account.recoverHash(messageHash, signature=signature)
	print(recoveredAddress)
	print(userSentAddress)
	
	## Bytes Length ???
	signatureBytes = signature.encode()
	print(type(signatureBytes))
	print(len(signatureBytes))
	signatureInstance = keys.Signature(signature_bytes=signatureBytes)
	messageHashByte = messageHash.encode()
	print(type(messageHashByte))
	userPublicKey = keys.ecdsa_recover(message_hash = messageHashByte, signature = signatureInstance)
	print(userPublicKey)

	# Initialize and Check Contract 
	sellingContractABI = Selling.abi
	sellingContractAddress = '0x26a9Cf48AcdbAb845700c9292F709a5d67C0B9b3'
	SellingContract = web3.eth.contract(address=sellingContractAddress, abi=sellingContractABI)
	whether_buy = SellingContract.functions.buyer(recoveredAddress).call()
	#print(type(whether_buy))

	if recoveredAddress.lower() == userSentAddress and whether_buy == True:
		print("Verified Success")
		return str(1)
	else:
		print("Verified Fail")
		return str(0)
	# rating = int(request.args.get('rating'))
	# print(rating)
	# db=client.businessTest
	# ratingItems = db.reviews.find({'rating': rating})
	# res = []
	# for item in ratingItems:
	# 	try: 
	# 		del item["_id"]
	# 	except KeyError: 
	# 		pass
	# 	res.append(item)
	# return str(res)



if __name__ == '__main__':
	from argparse import ArgumentParser
	parser = ArgumentParser()
	parser.add_argument("-p", "--port", type = int, default = 5003)
	args = parser.parse_args()
	port = args.port
	app.run(host = "127.0.0.1", port = port)
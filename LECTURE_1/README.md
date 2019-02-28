# NTU Smart Contract Course Code and Slides

This is the repository for 2019 Spring Course on Ethereum Smart Contracts Applications in National Taiwan University offered by Prof. Pecu Tsai and partly lectured by Samuel (Yen-Chi) Chen

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In this lecture, you need to install the following: flask npm vue bootstrap-vue

#### Front-End

In the `FrontEnd/blockchain_lecture_1` folder, run the following command:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8091
npm run dev
```

#### Back-End

In the `BackEnd` folder, run the following command:

```
pip install -r requirements.txt
```

Also, you need a free mongoDB account in order to use the backend.
Once you get the database link, make sure to add a file at
`BackEnd/constants/authInfo.py` as the following:

```python
mongoDB_Auth = "mongodb://YOUR_DB_LINK"
```
The official documentation of mongoDB is at

[Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/)

Run a local instance:

``` bash
python app.py
```

#### Solidity_Part

In the `Solidity_Part` folder, run the following command:

```
truffle migrate
```

### Installing

In the previous part, you should get a contract address for the `Selling.sol`, copy
this address and then put it in `FrontEnd/blockchain_lecture_1/util/constants/contracts/Selling.js`

Change the original code which is:

```javascript
var address = "0x26a9Cf48AcdbAb845700c9292F709a5d67C0B9b3";
```

to 

```javascript
var address = "YOUR CONTRACT ADDRESS";
```

## Deployment

to be updated


## Authors

* **Samuel (Yen-Chi) Chen**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


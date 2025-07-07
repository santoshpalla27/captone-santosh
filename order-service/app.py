import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from redis_client import get_redis_cluster

load_dotenv()

app = Flask(__name__)
mongo = MongoClient(os.environ['MONGODB_URI'])
orders = mongo.ordersdb.orders
redis = get_redis_cluster()

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify([{'_id': str(o['_id']), 'item': o['item'], 'quantity': o['quantity'], 'user': o['user']} for o in orders.find()])

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    result = orders.insert_one({'item': data['item'], 'quantity': data['quantity'], 'user': data['user']})
    return jsonify({'inserted_id': str(result.inserted_id)})

@app.route('/cache')
def cache():
    redis.set("test", "hello from redis cluster")
    return {"value": redis.get("test")}

if __name__ == '__main__':
    app.run(host='0.0.0.0')
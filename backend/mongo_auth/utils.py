from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import loads
import json
import os
from django.conf import settings

# Use settings from Django config or environment variables
MANGO_JWT_SETTINGS = settings.MANGO_JWT_SETTINGS

# Build MongoDB connection string from environment
db_host = MANGO_JWT_SETTINGS.get('db_host', 'mongo')
db_port = MANGO_JWT_SETTINGS.get('db_port', '27017')
db_name = MANGO_JWT_SETTINGS.get('db_name', 'mydb')
db_user = MANGO_JWT_SETTINGS.get('db_user', '')
db_pass = MANGO_JWT_SETTINGS.get('db_pass', '')

if db_user and db_pass:
    import urllib.parse
    db_user_encoded = urllib.parse.quote(db_user)
    db_pass_encoded = urllib.parse.quote(db_pass)
    mongo_uri = f'mongodb://{db_user_encoded}:{db_pass_encoded}@{db_host}:{db_port}/{db_name}'
else:
    mongo_uri = f'mongodb://{db_host}:{db_port}/{db_name}'

# db information
client = MongoClient(mongo_uri)
db = client[db_name]

# Collections used in project
usersCol = db['users']
productsCol = db['products']

def json_handler(x):
    if isinstance(x, ObjectId) or isinstance(x, datetime):
        return str(x)
    else:
        raise TypeError(x)


def parse_json(data):
    return loads(json.dumps(data, default=json_handler))

from pymongo import MongoClient
from django.conf import settings
import urllib.parse

MANGO_JWT_SETTINGS = settings.MANGO_JWT_SETTINGS

raw_password = MANGO_JWT_SETTINGS.get('db_pass') or ""
raw_username = MANGO_JWT_SETTINGS.get('db_user') or ""
password = urllib.parse.quote(raw_password) if raw_password else ""
username = urllib.parse.quote(raw_username) if raw_username else ""
db_name = MANGO_JWT_SETTINGS.get('db_name') or "mydb"
db_host_mongo = MANGO_JWT_SETTINGS.get('db_host') or "localhost"
db_port_mongo = MANGO_JWT_SETTINGS.get('db_port') or "27017"

if not db_name or db_name.strip() == "":
    raise ValueError(
        f"MONGO_DB_NAME is empty or not set. "
        f"Set MONGO_DB_NAME env var or update settings. Got: {db_name}"
    )

if db_port_mongo:
    if username and password:
        mongo_uri = "mongodb://{username}:{password}@{db_host}:{db_port}/{db_name}".format(
            username=username, password=password, db_host=db_host_mongo,
            db_port=db_port_mongo, db_name=db_name)
    else:
        mongo_uri = "mongodb://{db_host}:{db_port}/{db_name}".format(
            db_host=db_host_mongo, db_port=db_port_mongo, db_name=db_name)
else:
    if username and password:
        mongo_uri = "mongodb+srv://{username}:{password}@{host}/{db_name}".format(
            username=username, password=password, host=db_host_mongo, db_name=db_name)
    else:
        mongo_uri = "mongodb+srv://{host}/{db_name}".format(host=db_host_mongo, db_name=db_name)

client = MongoClient(mongo_uri)
database = client[db_name]

auth_collection = MANGO_JWT_SETTINGS.get('auth_collection', "user_profile")

fields = MANGO_JWT_SETTINGS.get('fields', ())

jwt_secret = MANGO_JWT_SETTINGS.get('jwt_secret', 'secret')

jwt_life = MANGO_JWT_SETTINGS.get('jwt_life', 7)

secondary_username_field = MANGO_JWT_SETTINGS.get('secondary_username_field') if MANGO_JWT_SETTINGS.get('secondary_username_field') and MANGO_JWT_SETTINGS.get('secondary_username_field') != 'email' else None


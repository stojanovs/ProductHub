import uuid
import jwt
from passlib.context import CryptContext
from mongo_auth.db import jwt_secret
from mongo_auth.utils import usersCol


pwd_context = CryptContext(
    default="django_pbkdf2_sha256",
    schemes=["django_argon2", "django_bcrypt", "django_bcrypt_sha256",
             "django_pbkdf2_sha256", "django_pbkdf2_sha1",
             "django_disabled"])


def create_unique_object_id():
    unique_object_id = "ID_{uuid}".format(uuid=uuid.uuid4())
    return unique_object_id


# Check if user is logged in
def login_status(request):
    token = request.META.get('HTTP_AUTHORIZATION')
    token = token.replace('Bearer ', '')
    data = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    user_obj = None
    flag = False
    user_filter = usersCol.find(
        {"id": data["id"]}, {"password": 0})
    users = list(user_filter)
    if len(users) == 1:
        flag = True
        user_obj = list(users)[0]
    return flag, user_obj

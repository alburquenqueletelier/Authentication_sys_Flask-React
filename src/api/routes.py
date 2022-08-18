"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
def create_token():
    body = request.get_json()
    username = body["username"]
    password = body["password"]
    # Query your database for username and password
    if username.find('@')>=0:
        user = User.query.filter_by(email=username, password=password).first()
    else:
        user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user": user.serialize() }), 201

@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def register():
    if request.method != 'POST':
        return jsonify({
        "Error": "Bad request"
        }), 405
    body = request.get_json()
    userQuery = User.query.filter_by(username=body["username"]).first()
    emailQuery = User.query.filter_by(email=body["email"]).first()
    if userQuery or emailQuery:
        return jsonify({
            "Error": "username o email en uso."
        }), 403
    newUser = User()
    try:
        newUser.username = body["username"]
        newUser.email = body["email"]
        newUser.password = body["password"]
        newUser.is_active = body["is_active"]
        db.session.add(newUser)
        db.session.commit()
        return jsonify({
            "Response": "Usuario creado con exito"
        }), 201
        # return jsonify({
        #     "Response": response
        # }), 201
    except Exception as error:
        return jsonify({
            "Response": error.args
        }), 500
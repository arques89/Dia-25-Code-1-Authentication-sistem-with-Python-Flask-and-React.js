"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# INICIO DEL BACKEND

#####--------------------BACKEND LISTAR USUARIOS--------------------#####

    #Para mostrar todos los usuarios de la tabla, seria igual para cualquier otra tabla que queramos
@api.route('/user', methods=['GET'])
def get_user():

    users = User.query.all()
    
    response = [user.serialize() for user in users]
    # Se puede usar de la manera de abajo para sacar uno o varios y no todos
    #response = [{"user_id": user.id , "email": user.email , "name":user.name , "is_active": user.is_active} for user in users]

    return jsonify(response), 200

#####--------------------BACKEND SIGNUP--------------------#####

@api.route('/signup', methods=['POST'])
def signup():

    #Otra forma de adquirir los datos del frontend o del insomnia, postman: 
    # body=request.get.json()
    # email=body["email"] 
    #password=body["password"]
    #name=body["name"]
    
    data = request.json

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    #Nos cercioramos de que se a;adan todos los datos que necesitamos
    if not name or not email or not password:
        return jsonify("Es necesario introducir todos los datos"),404
    
    #Otra forma, tambien con email:      
    # if name is None or len(name) <1:
    #   raiseAPIException("Has de añadir un nombre", status_code=404) 


    #Obligamos a que la contrasena debe ser mayor a 5 caracteres para ser creada y anadida
    if password is None or len(password) < 5:
        raise APIException("La contraseña tiene que tener un mínimo de 5 caracteres", status_code=404)
    
    #Verificacion de usuario entre frontend y backend
    aux_user = User.query.filter_by(email=email).first()
    if aux_user:
        return jsonify("Usuario ya existe"),401

    #Anadimos los datos introducidos en el frontend a la bbbdd del backend y lo guardamos
    user = User(name=name , email=email , password=password , is_active=True)

    db.session.add(user)
    db.session.commit()

    if not user:
        return jsonify({"message":"Usuario no encontrado"}), 401

    #return jsonify({'message': 'Usuario creado con éxito!', 'data': user.serialize()}), 201
    return jsonify({"message":"Usuario creado"}),201



#####--------------------BACKEND LOGIN--------------------#####



@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   

    # if name is None or len(name) < 1:
    #     raise APIException("Has de añadir un nombre", status_code=404)

    user = User.query.filter_by(email=email, password=password).first()

    # if user.name != name:
    #     raise APIException("Nombre o email incorrecto", status_code=404)


    if user is None:
        raise APIException("BACKEND LOGIN: Email incorrecto", status_code=401)

    if user.password != password:
        raise APIException("BACKEND LOGIN: Password incorrecto", status_code=401)

# me va a codificar el diccionario (todo lo compatible con json), sólo me va almacenar la data (email)
    
    # token
    # data = {
    #     "email": user.email,
    #     "user_id": user.id
    # }
    
#  access_token = create_access_token(identity=username)
#     return jsonify(access_token=access_token) ????

    token = create_access_token(identity=user.id)
    # res = {
    #     "token": token,
    #     "user_id": user.id

    # }
    # return jsonify({'message': 'Usuario logeado exitosamente!', 'token': token, 'user_id': user.id}), 201
    return jsonify({ "token": token, "user_id": user.id })
#oBTENER TOKEN
def obtener_usuario_id():
    informacion_usuario = get_jwt_identity()
    if informacion_usuario is None:
        raise APIException('Se espera jwt token')
    return informacion_usuario["user_id"]


# Obtener informacion del perfil del usuario
@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_info_usuario():
    user_id = obtener_usuario_id()
    user = User.query.get(user_id)
    info_user = user.serialize()
    if user is None:
        raise APIException("Usuario no encontrado")
    return jsonify(info_user)

#####--------------------BACKEND PRIVATE--------------------#####

# Protege una ruta con jwt_required, bloquea las peticiones
# sin un JWT válido presente.
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

    
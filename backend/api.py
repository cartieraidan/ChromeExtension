from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

api = Api(app)

#Creating a database with column id, content, sensitiveData
#content is the text sent from chrome extension
#sensitive data is the data return from backend logic
#sensitive data stored is data sent from chrome extension to optionally aid the backend logic
class PostedContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), unique=False, nullable=False)
    sensitiveData = db.Column(db.String(500), unique=False, nullable=True)
    sensitiveDataStored = db.Column(db.String(500), unique=False, nullable=True)

    def __repr__(self):
        return f"PostedContent(Content: {self.content}, Return sensitiveData: {self.sensitiveData}, Stored sensitive data(user end): {self.sensitiveDataStored})"

#Arguments the parser looks for when data gets sent to api
#content, mandatory sent from chrome extension
#sensitiveDataStored, optional to be sent, help with backend
user_args = reqparse.RequestParser()
user_args.add_argument('content', type=str, required=False, help="content can be blank")
user_args.add_argument('sensitiveDataStored', type=str, required=False, help="Optional stored returned sensitive data")

#For json responses back to chrome extension from api
#have one for what we actually want to return and one used for debuging
contentFieldsDebug = {
    'id':fields.Integer,
    'content':fields.String,
    'sensitiveData':fields.String,
    'sensitiveDataStored':fields.String
}

contentFields = {
    'id':fields.Integer,
    'sensitiveData':fields.String,
}

###############create comments for here on after################
#for understanding
#using thunder client for testing http request

class Content(Resource):
    @marshal_with(contentFieldsDebug)
    def get(self):
        content = PostedContent.query.all()
        return content
    
    @marshal_with(contentFieldsDebug)
    def post(self):
        args = user_args.parse_args()
        content = PostedContent(content=args["content"], sensitiveDataStored=args["sensitiveDataStored"])
        db.session.add(content)
        db.session.commit()
        contents = PostedContent.query.all()
        return contents, 201
    

class UserContent(Resource):
    @marshal_with(contentFieldsDebug)
    def get(self, id):
        userContent = PostedContent.query.filter_by(id=id).first()
        if not userContent:
            abort(404, "User not found")
        return userContent
    
    @marshal_with(contentFieldsDebug)
    def patch(self, id):
        args = user_args.parse_args()
        userContent = PostedContent.query.filter_by(id=id).first()
        if not userContent:
            abort(404, "User not found")

        #for here create a spot where can update sensitiveDataStored in a way that doesn't break format and does not create duplicates

        userContent.sensitiveDataStored = args["sensitiveDataStored"]
        #user.email = args["email"]
        db.session.commit()
        return userContent
    
    @marshal_with(contentFieldsDebug)
    def delete(self, id):
        userContent = PostedContent.query.filter_by(id=id).first()
        if not userContent:
            abort(404, "User not found")
        db.session.delete(userContent)
        db.session.commit()
        users = PostedContent.query.all()
        return users, 200
    
api.add_resource(Content, '/api/content/')
api.add_resource(UserContent, '/api/user-content/<int:id>')


@app.route('/')
def home():
    return '<h1>Flask Rest API for chrome extension</h1>'

if __name__ == '__main__':
    app.run(debug=True)

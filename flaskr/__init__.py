import os
from flask import Flask
from flask_cors import CORS
def create_app():
    # create and configure the app
    app = Flask(__name__)
    CORS(app)
    from . import agreement, application, project, user
    app.register_blueprint(agreement.bp)
    app.register_blueprint(application.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(project.bp)
    return app



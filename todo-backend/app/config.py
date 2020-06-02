import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    #SQLALCHEMY_DATABASE_URI = "postgres://kqktdonoxxehql:616adb7e632376a47684f4c1e670b3348640c4acd0b4219dc07fa2d5e8d43d63@ec2-3-213-192-58.compute-1.amazonaws.com:5432/dd8na9d0374ihg"


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True

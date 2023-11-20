import os
import json
import mysql.connector
from uuid import uuid4

class Storage:
    __connection = None
    
    def __init__(self):
        """Initialize the storage object with data from data.json"""

        file_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(file_dir, 'data.json')
        with open(json_file_path) as file:
            self.__storage = json.load(file)
        
        self.__connection = mysql.connector.connect(
            user='compass',
            password='password',
            host='localhost',
            database='Career_Compass'
            )

    def getq(self):
        """return a list of 40 questions"""

        self.__sorted = sorted(self.__storage['questions'], key=lambda x: x['Intelligence_type'])
        self.__result = []
        self.__nums = self.ranomize()
        for i in self.__nums:
            self.__result.append(self.__sorted[i])
        return self.__result

    def ranomize(self):
        """Return a list of 40 random numbers from 0 to 79"""

        import random
        result = []
        for i in range(0, 80, 10):
            j = 0
            while j < 5:
                x = random.randint(i, i+9)
                if x in result:
                    continue
                j += 1
                result.append(x)

        return result
    
    
    def getall(self):
        """return a list of all users"""

        self.__cursor = self.__connection.cursor()
        self.__query = "SELECT * FROM usr"
        self.__cursor.execute(self.__query)
        self.__users = self.__cursor.fetchall()
        self.__cursor.close()

        return self.__users
        

    def getone(self, unique_url_id):
        """return a user with the given unique_url_id"""

        self.__cursor = self.__connection.cursor()
        self.__query = f"SELECT * FROM usr WHERE uuid = '{unique_url_id}'"
        self.__cursor.execute(self.__query)
        self.__user = self.__cursor.fetchone()
        self.__cursor.close()

        return self.__user

    def exists(self, unique_url_id):
        """check if the user with uuid exists or not"""

        self.__cursor = self.__connection.cursor()
        self.__query = f"SELECT * FROM usr WHERE uuid = '{unique_url_id}'"
        self.__cursor.execute(self.__query)
        self.__user = self.__cursor.fetchone()
        self.__cursor.close()
        
        return self.__user is not None

    def Eexists(self, Email):
        """check if the user with Email exists or not"""
        
        self.__cursor = self.__connection.cursor()
        self.__query = f"SELECT * FROM usr WHERE email = '{Email}'"
        self.__cursor.execute(self.__query)
        self.__user = self.__cursor.fetchone()
        self.__cursor.close()
        
        return self.__user is not None

    def insert(self, data):
        """insert the data to db"""

        data['uuid'] = uuid4()
        self.__command = f"INSERT INTO usr (name, email, uuid, linguistic, logical_mathematical, bodily_kinesthetic, spatial_visual, interpersonal, intrapersonal, naturalistic, musical, quize_type) VALUES ('{data['name']}', '{data['email']}', '{data['uuid']}', {data['linguistic']}, {data['logical_mathematical']}, {data['bodily_kinesthetic']}, {data['spatial_visual']}, {data['interpersonal']}, {data['intrapersonal']}, {data['naturalistic']}, {data['musical']}, '{data['quize_type']}')"
        
        self.__cursor = self.__connection.cursor()
        self.__cursor.execute(self.__command)
        self.__connection.commit()
        self.__cursor.close()

    def __str__(self):
        """the string representation of the storage object"""

        return """This is the storage object works as engine for the Career Compass project"""

    def __repr__(self):
        """the string representation of the storage object"""

        return """This is the storage object works as engine for the Career Compass project"""
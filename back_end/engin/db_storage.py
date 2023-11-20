import os
import json
import mysql.connector

class Storage:
    __connection = None
    
    def __init__(self):
        """Initialize the storage object with data from data.json"""

        file_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(file_dir, 'data.json')
        with open(json_file_path) as file:
            self.storage = json.load(file)
        
        self.__connection = mysql.connector.connect(
            user='compass',
            password='password',
            host='localhost',
            database='Career_Compass'
            )

    def getq(self):
        """return a list of 40 questions"""

        self.__sorted = sorted(self.storage['questions'], key=lambda x: x['Intelligence_type'])
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
        

    def save(self):
        with open(json_file_path, 'w') as file:
            json.dump(self.storage, file, indent=4)

    def delete(self, key):
        del self.storage[key]

    def keys(self):
        return self.storage.keys()

    def __str__(self):
        return str(self.storage)

    def __repr__(self):
        return str(self.storage)
import os
import json
import mysql.connector


class Storage:
    """class that works as engine for the Career Compass project"""
    __connection = None

    def __init__(self):
        """Initialize the storage object with data from data.json"""

        file_dir = os.path.dirname(os.path.abspath(__file__))
        json_file_path = os.path.join(file_dir, 'data.json')
        with open(json_file_path) as file:
            self.__storage = json.load(file)

    def create(self):
        """create db conn"""
        self.__connection = mysql.connector.connect(
            user='compass',
            password='password',
            host='localhost',
            database='Career_Compass'
            )

    def close(self):
        """close the db conn"""
        self.__connection.close()

    def getq(self):
        """return a list of 40 questions"""

        self.__sorted = sorted(self.__storage['questions'],
                               key=lambda x: x['Intelligence_type'])
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
        self.create()

        self.__cursor = self.__connection.cursor()
        self.__query = "SELECT COUNT(*) FROM usr"
        self.__cursor.execute(self.__query)
        self.__user_count = self.__cursor.fetchone()
        self.__query = "SELECT COUNT(*) FROM usr WHERE \
            quize_type = 'High school'"
        self.__cursor.execute(self.__query)
        self.__user_high = self.__cursor.fetchone()
        self.__query = "SELECT COUNT(*) FROM usr WHERE quize_type = 'graduate'"
        self.__cursor.execute(self.__query)
        self.__user_graduate = self.__cursor.fetchone()
        self.__query = "SELECT linguistic, logical_mathematical, \
            bodily_kinesthetic, spatial_visual, interpersonal, \
                intrapersonal, naturalist, musical FROM usr;"
        self.__cursor.execute(self.__query)
        self.__user_values = self.__cursor.fetchall()
        self.__cursor.close()
        self.close()

        self.__result = {
            "linguistic": 0,
            "logical_mathematical": 0,
            "bodily_kinesthetic": 0,
            "spatial_visual": 0,
            "interpersonal": 0,
            "intrapersonal": 0,
            "naturalist": 0,
            "musical": 0
        }

        for i in self.__user_values:
            self.__result['linguistic'] += i[0]
            self.__result['logical_mathematical'] += i[1]
            self.__result['bodily_kinesthetic'] += i[2]
            self.__result['spatial_visual'] += i[3]
            self.__result['interpersonal'] += i[4]
            self.__result['intrapersonal'] += i[5]
            self.__result['naturalist'] += i[6]
            self.__result['musical'] += i[7]

        x = 0
        for i in self.__result.values():
            x += i

        for i in self.__result:
            self.__result[i] = float(self.__result[i] / x * 100)

        self.__result["Completed the quize"] = self.__user_count[0]
        self.__result["High school students"] = self.__user_high[0]
        self.__result["Graduates"] = self.__user_graduate[0]

        return self.__result

    def getone(self, unique_url_id):
        """return a user with the given unique_url_id"""
        self.create()

        self.__cursor = self.__connection.cursor()
        self.__query = f"SELECT * FROM usr WHERE uuid = '{unique_url_id}'"
        self.__cursor.execute(self.__query)
        self.__user = self.__cursor.fetchone()
        self.__cursor.close()
        self.close()

        self.__result = {}

        keys = ['linguistic', 'logical_mathematical',
                'bodily_kinesthetic', 'spatial_visual',
                'interpersonal', 'intrapersonal',
                'naturalist', 'musical']

        for i in keys:
            self.__result[i] = self.__user[keys.index(i) + 5]

        self.__sorted_items = sorted(self.__result.items(),
                                     key=lambda x: x[1], reverse=True)
        self.__largest_keys = [self.__sorted_items[0] for
                               self.__sorted_items in
                               self.__sorted_items[:2]]

        self.__info = {}
        self.__info['types'] = []
        for i in self.__largest_keys:
            add = self.__storage['intellegnces'][i]
            add['type'] = i
            self.__info['types'].append(add)
        self.__info['name'] = self.__user[2]
     
        return self.__info

    def exists(self, unique_url_id):
        """check if the user with uuid exists or not"""
        self.create()
        self.__cursor = self.__connection.cursor()
        self.__query = f"SELECT * FROM usr WHERE uuid = '{unique_url_id}'"
        self.__cursor.execute(self.__query)
        self.__user = self.__cursor.fetchone()
        self.__cursor.close()
        self.close()

        return self.__user is not None

    def insert(self, data, app):
        """insert the data to db"""

        self.__values = f"VALUES ('{data['name']}', \
            '{data['email']}', '{data['uuid']}', \
                {data['linguistic']}, {data['logical_mathematical']}, \
                    {data['bodily_kinesthetic']}, {data['spatial_visual']}, \
                        {data['interpersonal']}, {data['intrapersonal']}, \
                            {data['naturalist']}, {data['musical']}, \
                                '{data['quize_type']}')"
        self.__command = f"INSERT INTO usr \
            (name, email, uuid, linguistic, \
                logical_mathematical, \
                    bodily_kinesthetic, \
                        spatial_visual, \
                            interpersonal, \
                                intrapersonal, \
                                    naturalist, musical, \
                                        quize_type) {self.__values}"

        self.create()
        self.__cursor = self.__connection.cursor()
        self.__cursor.execute(self.__command)
        self.__connection.commit()
        email = {'email': data['email']}
        self.sende(app, email, data['name'], data['uuid'])
        self.__cursor.close()
        self.close()

    def postvalidate(self, data):
        """check if the post methoud data is valid or not"""

        req = ["linguistic", "logical_mathematical",
           "bodily_kinesthetic", "spatial_visual",
           "interpersonal", "intrapersonal",
           "naturalist", "musical"]
    
        static = ["name", "email", "quize_type"]

        quize_type = ['High school', 'graduate']

        if not data:
            return {"Error": "Not a JSON"}

        for item in static:
            if data.get(item) is None:
                return {"Error": f"{item} Not found"}
            if item == "quize_type" and data[item] not in quize_type:
                return {"Error": f"{item} Wrong Value"}
            if not isinstance(data[item], str):
                return {"Error": f"{item} Wrong data type"}

        for item in req:
            if data.get(item) is None:
                return {"Error": f"{item} Not found"}
            if not isinstance(data[item], int) or \
                    isinstance(data[item], bool):
                return {"Error": f"{item} Wrong data type"}

            if data[item] < 5 or data[item] > 20:
                return {"Error": f"{item} Wrong Value"}
    

    def randomeuser(self):
        self.create()
        self.__cursor = self.__connection.cursor()
        self.__query = "SELECT uuid FROM usr ORDER BY RAND() LIMIT 1"
        self.__cursor.execute(self.__query)
        self.__data = self.__cursor.fetchone()
        self.__cursor.close()
        self.close()
        return self.__data[0]


    def sende(self, app, data, user, uuid):
        """send email to the user"""

        from flask_mail import Mail, Message
        from flask import render_template

        app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        app.config['MAIL_PORT'] = 587
        app.config['MAIL_USE_TLS'] = True
        app.config['MAIL_USE_SSL'] = False
        app.config['MAIL_USERNAME'] = 'career1compass@gmail.com'
        app.config['MAIL_PASSWORD'] = 'hojy yqtt moin ekqh'
        app.config['MAIL_DEFAULT_SENDER'] = 'career1compass@gmail.com'

        mail = Mail(app)

        subject = "Career Compass"
        body = "this is the body"
        html_body = render_template('email_template.html',
                                    subject=subject, body=body, user=user, uuid=uuid)
        recipients = [f'{data["email"]}']
        message = Message(subject=subject,
                          recipients=recipients,
                          html=html_body)
        mail.send(message)

    def __str__(self):
        """the string representation of the storage object"""

        return """This is the storage object \
            works as engine for the Career Compass project"""

    def __repr__(self):
        """the string representation of the storage object"""

        return """This is the storage object works \
            as engine for the Career Compass project"""

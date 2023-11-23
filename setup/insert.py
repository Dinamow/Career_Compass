#!/usr/bin/python3
from faker import Faker
import random
from uuid import uuid4
import mysql.connector
import sys

fake = Faker()
min_value = 5
max_value = 20

connection = mysql.connector.connect(
    user='compass',
    password='password',
    host='localhost',
    database='Career_Compass'
)

cursor = connection.cursor()

for i in range(500):
    name = fake.name()
    email = fake.email()
    uuid = uuid4()
    linguistic = random.randint(min_value, max_value)
    logical_mathematical = random.randint(min_value, max_value)
    bodily_kinesthetic = random.randint(min_value, max_value)
    spatial_visual = random.randint(min_value, max_value)
    interpersonal = random.randint(min_value, max_value)
    intrapersonal = random.randint(min_value, max_value)
    naturalist = random.randint(min_value, max_value)
    musical = random.randint(min_value, max_value)
    quize_type = random.choice(["High school", "graduate"])
    command = f"INSERT INTO usr (name, email, uuid, linguistic, logical_mathematical, bodily_kinesthetic, spatial_visual, interpersonal, intrapersonal, naturalist, musical, quize_type) VALUES ('{name}', '{email}', '{uuid}', {linguistic}, {logical_mathematical}, {bodily_kinesthetic}, {spatial_visual}, {interpersonal}, {intrapersonal}, {naturalist}, {musical}, '{quize_type}')"
    cursor.execute(command)

connection.commit()
cursor.close()
connection.close()
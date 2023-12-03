#!/usr/bin/python3
from engin import storage
import math

intellegnce_type = {
            "Linguistic": 0,
            "Logical_Mathematical": 0,
            "Bodily_Kinesthetic": 0,
            "Spatial_Visual": 0,
            "Interpersonal": 0,
            "Intrapersonal": 0,
            "Naturalist": 0,
            "Musical": 0
        }
types = ["activites", "description", "faculties", "roles", "type"]

def test_home(client):
    """test home page"""

    res = client.get('/')

    # check if the status code is 200
    assert res.status_code == 200

    res = client.get('/sdasdas')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data


def test_questions(client):
    """test questions data"""

    res = client.get('/api/v1/questions')

    # check if the status code is 200
    assert res.status_code == 200

    # check if the number of questions is 40
    assert len(res.get_json()) == 40

    for i in res.get_json():
        intellegnce_type[i['Intelligence_type']] += 1

    for i in intellegnce_type.values():
        # check if the number of questions for each intelligence type is 5
        assert i == 5

    res = client.get('/api/v1/question')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data


def test_statistics(client):
    """test statistics data"""

    res = client.get('/api/v1/statistics')

    # check if the status code is 200
    assert res.status_code == 200

    obj = res.get_json()

    # check if the data is not empty
    assert obj is not None

    # check the number of data returned is 11
    assert len(obj) == 11

    # check if the total number of graduates and high school students
    # is equal to the total number of users
    assert obj['Graduates'] + obj['High school students'] \
        == obj['Completed the quize']

    del obj['Graduates']
    del obj['High school students']
    del obj['Completed the quize']

    # check if the sum of all values is 100 means all values are in percentage
    assert math.ceil(sum(obj.values())) == 100

    res = client.get('/api/v1/statistic')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data


def test_resultuuid(client):
    """test result data by uuid"""

    res = client.get('/api/v1/result/123')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    res = client.get('/api/v1/result/1234567890')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    res = client.get('/api/v1/result/12345678901234567890123456789012')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    res = client.get('/api/v1/result/ahmed')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    res = client.get('/api/v1/result/True')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    res = client.get('/api/v1/result/None')

    # check if the error of 404 is handled
    assert b"<!DOCTYPE html>" in res.data

    uuid = storage.randomeuser()
    res = client.get(f'/api/v1/result/{uuid}')

    #check if user with uuid exists
    assert b"<!DOCTYPE html>" not in res.data

    # check if the status code is 200
    assert res.status_code == 200

    #check if return the heighst two intellegnce types
    assert len(res.get_json()['types']) == 2

    #check if return the name of the user
    assert "name" in res.get_json()

    for i in types:

        #check if return the heighst two intellegnce types with all data
        assert i in res.get_json()['types'][0]
        assert i in res.get_json()['types'][1]

        if i == "type":
            #check if return the heighst two intellegnce types are different
            assert res.get_json()['types'][0][i] != \
                res.get_json()['types'][1][i]


def test_resultpost(client):
    """test result data by post request"""

    valid_data = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "interpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "musical": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=valid_data)

    # check if the status code is 201
    assert res.status_code == 201
    
    no_name = {
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "interpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "musical": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=no_name)

    # check if the status code is 400
    assert res.status_code == 400

    less_5 = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 4,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "interpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "musical": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=less_5)

    # check if the status code is 400
    assert res.status_code == 400

    more_20 = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 21,
        "spatial_visual": 5,
        "interpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "musical": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=more_20)

    # check if the status code is 400
    assert res.status_code == 400

    wrong_quize_type = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "interpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "musical": 5,
        "quize_type": "ss"
    }
    res = client.post('/api/v1/result' ,json=wrong_quize_type)

    # check if the status code is 400
    assert res.status_code == 400

    wrong_values = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 'test',
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "interpersonal": False,
        "intrapersonal": True,
        "naturalist": 5,
        "musical": 5,
        "quize_type": 5
    }
    res = client.post('/api/v1/result' ,json=wrong_values)

    # check if the status code is 400
    assert res.status_code == 400

    wrong_keys = {
        "name": "DINAMOW",
        "email": "meemoo102039@gmail.com",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "intsserpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "test": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=wrong_keys)

    # check if the status code is 400
    assert res.status_code == 400

    wrong_email = {
        "name": "DINAMOW",
        "email": "dsadsa@sdasdas",
        "logical_mathematical": 5,
        "linguistic": 5,
        "bodily_kinesthetic": 20,
        "spatial_visual": 5,
        "intsserpersonal": 5,
        "intrapersonal": 5,
        "naturalist": 5,
        "test": 5,
        "quize_type": "graduate"
    }
    res = client.post('/api/v1/result' ,json=wrong_email)

    # check if the status code is 201
    assert res.status_code == 201

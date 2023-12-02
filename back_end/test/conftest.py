#!/usr/bin/python3

import pytest

@pytest.fixture()
def client():
    from app import app
    return app.test_client()

@pytest.fixture()
def engine():
    from engin import storage
    return storage

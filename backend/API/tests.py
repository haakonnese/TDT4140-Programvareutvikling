import unittest
from django.test import Client
from django.contrib.auth.models import User
from django.db import Error
import io
from rest_framework.parsers import JSONParser

# Testene lager en ny person i databsen,
# slik at id-en inkrementerer hver gang man kjører testene.
# Kanskje mulig å registrere bruker uten at dette skjer?


class ProfileTest(unittest.TestCase):
    def setUp(self):
        # Hver test trenger en klient
        self.client = Client()

    def test_register(self):
        # Lager en post forespørsel
        d = {
            "username": "john",
            "password": "smith",
            "firstname": "John",
            "lastname": "Doe",
            "phone": "33333333",
            "city": "Trondheim",
            "birth_year": "2000",
            "email": "JD@gmail.com",
        }
        response = self.client.post("/API/register", d)

        # Henter brukeren
        user = User.objects.get(username="john")

        # Sjekk at responsen er 200 OK.
        self.assertEqual(response.status_code, 200)

        # Sjekk at attributtene er satt riktig
        self.assertEqual(user.first_name, d["firstname"])
        self.assertEqual(user.last_name, d["lastname"])
        self.assertEqual(user.email, d["email"])
        self.assertEqual(user.profile.phone, d["phone"])
        self.assertEqual(user.profile.city, d["city"])
        self.assertEqual(user.profile.birth_year, d["birth_year"])
        self.assertEqual(user.username, d["username"])

        # Sletter brukeren
        user.delete()

        # Lager get request som ikke er støttet
        respons = self.client.get("/API/register")

        # sjekk at responsen er 405 method not allowed
        self.assertEqual(respons.status_code, 405)

    def test_login_logout(self):
        d = {"username": "johnD", "password": "smith"}
        response = self.client.post("/API/login", d)

        # Henter brukeren
        user = User.objects.get(username="johnD")

        # Sjekk at responsen er 200 OK.
        self.assertEqual(response.status_code, 200)

        # sjekker at brukeren er innlogget.
        d = self.client.get("/API/user").content
        stream = io.BytesIO(d)
        d = JSONParser().parse(stream)
        self.assertEqual(user.email, d["user"]["email"])
        self.assertEqual(user.profile.phone, d["phone"])
        self.assertEqual(user.profile.city, d["city"])
        self.assertEqual(user.profile.birth_year, d["birth_year"])
        self.assertEqual(user.username, d["user"]["username"])

        # Logge bruker ut og sjekke at han er logget ut
        self.client.post("/API/logout")
        respons = self.client.get("/API/user")
        if respons.status_code == 403:
            pass
        else:
            raise Error()

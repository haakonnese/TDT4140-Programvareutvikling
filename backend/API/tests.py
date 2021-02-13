import unittest
from django.test import Client
from django.contrib.auth.models import User


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

    def test_login(self):
        pass

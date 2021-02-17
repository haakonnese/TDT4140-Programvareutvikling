import unittest
from django.contrib.auth.models import User
from django.db import Error
from rest_framework.test import APIClient
from .models import Profile


class ProfileTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Lager en bruker som skal brukes i testene
        test_user = User.objects.create_user(
            username="bruker_i_testene",
            email="lennon@thebeatles.com",
            password="test1234",
            last_name="Tester",
            first_name="Test",
        )
        test_user = Profile.objects.create(user=test_user, city="Tronheim", birth_year="1960", phone="33312333")

    @classmethod
    def tearDownClass(cls):
        # Sletter brukern
        user = User.objects.get(username="bruker_i_testene")
        user.delete()

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()

    def test_register(self):
        # Lager en post forespørsel
        d = {
            "user": {
                "email": "t@gmail.com",
                "password": "smith",
                "first_name": "Test",
                "last_name": "Tester",
                "username": "testtestD",
            },
            "birth_year": 2000,
            "city": "Trondheim",
            "phone": 22222222,
        }
        response = self.client.post("/api/user/register", d, format="json")

        # Sjekk at responsen er 201 user_created.
        self.assertEqual(response.status_code, 201)

        # Henter brukeren
        user = User.objects.get(username="testtestD")

        # Sjekk at attributtene er satt riktig
        self.assertEqual(user.first_name, d["user"]["first_name"])
        self.assertEqual(user.last_name, d["user"]["last_name"])
        self.assertEqual(user.email, d["user"]["email"])
        self.assertEqual(user.profile.phone, str(d["phone"]))
        self.assertEqual(user.profile.city, d["city"])
        self.assertEqual(user.profile.birth_year, str(d["birth_year"]))
        self.assertEqual(user.username, d["user"]["username"])

        # Tester ugyldig regsistrering av samme bruker
        d = {
            "user": {
                "email": "t@gmail.com",
                "password": "smith",
                "first_name": "Test",
                "last_name": "Tester",
                "username": "testtestD",
            },
            "birth_year": 2000,
            "city": "Trondheim",
            "phone": 22222222,
        }
        response = self.client.post("/api/user/register", d, format="json")
        self.assertEqual(response.status_code, 400)

        # Sletter brukeren
        user.delete()

        # Lager get request som ikke er støttet
        respons = self.client.get("/api/user/register")

        # sjekk at responsen er 405 method not allowed
        self.assertEqual(respons.status_code, 405)

    def test_login_logout(self):
        d = {"username": "bruker_i_testene", "password": "test1234"}
        response = self.client.post("/api/user/login", d)
        token_dict = response.data

        # Legger til autoriseringstoken
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token_dict["token"])

        # Henter brukeren
        user = User.objects.get(username="bruker_i_testene")

        # Sjekker at brukeren er innlogget.
        d = self.client.get("/api/user/user").data
        self.assertEqual(user.email, d["user"]["email"])
        self.assertEqual(user.profile.phone, d["phone"])
        self.assertEqual(user.profile.city, d["city"])
        self.assertEqual(user.profile.birth_year, d["birth_year"])
        self.assertEqual(user.username, d["user"]["username"])

        # Fjerner token
        self.client.credentials()

        # Sjekker at brukern er utlogget
        response = self.client.get("/api/user/user")
        if response.status_code == 403:
            pass
        else:
            raise Error()

    def test_edit_profile(self):
        d = {"username": "bruker_i_testene", "password": "test1234"}
        response = self.client.post("/api/user/login", d)
        token_dict = response.data

        # Legger til autoriseringstoken
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token_dict["token"])

        d = {
            "user": {
                "email": "t@gmail.com",
                "first_name": "Test",
                "last_name": "TesterENDRING",
                "username": "bruker_i_testene",
            },
            "birth_year": 2000,
            "city": "Trondheim",
            "phone": 22222222,
        }
        response = self.client.put("/api/user/edit_profile", d, format="json")
        self.assertEqual(response.status_code, 200)
        user = User.objects.get(username="bruker_i_testene")
        self.assertEqual(d["user"]["last_name"], user.last_name)

        # tester å endre brukernavn til et som er brukt
        test_user = User.objects.create_user(
            username="bruker_i_testeneENDRING",
            email="lennon@thebeatles.com",
            password="test1234",
            last_name="Tester",
            first_name="Test",
        )
        d = {
            "user": {
                "email": "t@gmail.com",
                "first_name": "Test",
                "last_name": "TesterENDRING",
                "username": "bruker_i_testeneENDRING",
            },
            "birth_year": 2000,
            "city": "Trondheim",
            "phone": 22222222,
        }
        response = self.client.put("/api/user/edit_profile", d, format="json")
        test_user.delete()
        self.assertEqual(response.status_code, 403)

    def test_set_password(self):
        d = {"username": "bruker_i_testene", "password": "test1234"}
        response = self.client.post("/api/user/login", d)
        token_dict = response.data

        # Legger til autoriseringstoken
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token_dict["token"])

        # Sjekker at man kan endre passord
        response = self.client.put("/api/user/edit_password", {"password": "test12345"}, format="json")
        self.assertEqual(response.status_code, 200)

        # sjekker at passordet må være langt nok
        response = self.client.put("/api/user/edit_password", {"password": "test"}, format="json")
        self.assertEqual(response.status_code, 403)

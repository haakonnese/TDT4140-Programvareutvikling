import unittest
from rest_framework.test import APIClient
from user.models import Profile
from .models import Ad, Category
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import os
from django.db import Error


class AdsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Lager to brukere som kan brukes i testene
        user1 = User.objects.create_user(
            username="user1",
            first_name="Hei",
            last_name="Test",
            password="test1234",
        )
        user1.save()
        test_user1 = Profile(user=user1, phone="3984503", city="Trondheim", birth_year="1990")
        test_user1.save()
        # Lager en kategori som kan brukes i testene.
        Category.objects.create(category="test")
        # Lager to annonser som kan brukes i testene.

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerne
        user1 = User.objects.get(username="user1")
        user1.delete()
        os.remove(os.path.dirname(__file__) + "/../media/product/test.jpg")
        # Sletter kategorien brukt i testene
        category1 = Category.objects.get(category="test")
        category1.delete()
        # Sletter annonsene brukt i testene
        # Ad.objects.get(name="Test").delete()
        # Ad.objects.get(name="Test1").delete()

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()

    def test_show_ad(self):
        # lager en get request
        user1 = User.objects.get(username="user1")

        d = {
            "created_by_user": "",
            "name": "Testannonse1",
            "description": "Dette er en test-annonse",
            "price": 4,
            "city": "Trondheim",
            "img": open(os.path.dirname(__file__) + "/../media/test/test.jpg", "rb"),
            "category": "test",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        response = self.client.post("/api/listing/register", d)
        # Sjekk at responsen er 201 user_created.
        self.assertEqual(response.status_code, 201)
        # henter brukere og annonser
        ad1 = Ad.objects.get(name="Testannonse1")
        # Sjekk at attributtene er satt riktig
        self.assertEqual(ad1.name, d["name"])
        self.assertEqual(ad1.description, d["description"])
        self.assertEqual(ad1.price, d["price"]),
        self.assertEqual(ad1.category, d["category"])

        # Sjekker responsen som funker
        # response = self.client.get("ad/view/1", d, format="json")
        # self.assertEqual(response.status_code, 200)
        # ad1.delete()

        # response2 = self.client.get("/ad/view/1", d, format="json")
        # self.assertEqual(response2.status_code, 404)

    def test_filter_category(self):
        user1 = User.objects.get(username="user1")
        d1 = {
            "created_by_user": "",
            "name": "Test",
            "description": "Dette er en test-annonse",
            "price": 4,
            "img": open(os.path.dirname(__file__) + "/../media/test/test.jpg", "rb"),
            "category": "test",
            "city": "Trondheim",
        }
        d2 = {
            "created_by_user": "",
            "name": "Test1",
            "description": "Dette er en test-annonse",
            "price": 4,
            "img": open(os.path.dirname(__file__) + "/../media/test/test.jpg", "rb"),
            "category": "test",
            "city": "Trondheim",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        self.client.post("/api/listing/register", d1)
        self.client.post("/api/listing/register", d2)
        # Sjekker at vi for en filtrert liste
        ads = self.client.get("/api/listing/filter/test").data
        for ad in ads:
            if ad["category"] != "test":
                raise Error()

import unittest
from rest_framework.test import APIClient
from user.models import Profile
from .models import Ad, Category, Favorite
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
        category = Category.objects.get(category="Test")
        category.delete()
        os.remove(os.path.dirname(__file__) + "/../media/product/test.jpg")
        os.remove(os.path.dirname(__file__) + "/../media/product/test1.jpg")
        os.remove(os.path.dirname(__file__) + "/../media/product/test2.jpg")
        # Sletter kategorien brukt i testene
        category1 = Category.objects.get(category="test")
        category1.delete()

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()
        category = Category("Test")
        category.save()

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
            "category": "Test",
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
        self.assertEqual(ad1.category, Category.objects.get(category=d["category"]))

        # Favoriser en annonse
        response = self.client.post("/api/listing/favorite/save", {"ad": ad1.id})
        # Sjekk at responsen er 201 favorite created.
        self.assertEqual(response.status_code, 201, "Post favorite failed")
        favorite = Favorite.objects.filter(profile=Profile.objects.get(user=user1), ad=ad1)
        self.assertEqual(len(favorite), 1, "Not correct response for post favorite")

        response = self.client.get("/api/listing/favorites")
        # Sjekk at responsen er 200.
        self.assertEqual(response.status_code, 200, "Get all favorites of user failed")
        favorite = Favorite.objects.filter(profile=Profile.objects.get(user=user1))
        self.assertEqual(len(favorite), 1, "Not correct response for getting all favorites")

        response = self.client.delete("/api/listing/favorite/delete/" + str(ad1.id))
        # Sjekk at responsen er 200.
        self.assertEqual(response.status_code, 200, "Delete favorite failed")
        favorite = Favorite.objects.filter(profile=Profile.objects.get(user=user1), ad=ad1)
        self.assertEqual(len(favorite), 0, "Favorite is not removed from user")

        # Sjekker responsen som funker
        # response = self.client.get("ad/view/1", d, format="json")
        # self.assertEqual(response.status_code, 200)
        # ad1.delete()

        # response2 = self.client.get("/ad/view/1", d, format="json")
        # self.assertEqual(response2.status_code, 404)

    def test_filter_ads(self):
        user1 = User.objects.get(username="user1")
        d1 = {
            "created_by_user": "",
            "name": "Test",
            "description": "Dette er en test-annonse",
            "price": 200,
            "img": open(os.path.dirname(__file__) + "/../media/test/test1.jpg", "rb"),
            "category": "test",
            "city": "Trondheim",
        }
        d2 = {
            "created_by_user": "",
            "name": "Test1",
            "description": "Dette er en test-annonse",
            "price": 150,
            "img": open(os.path.dirname(__file__) + "/../media/test/test2.jpg", "rb"),
            "category": "test",
            "city": "Trondheim",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        self.client.post("/api/listing/register", d1)
        self.client.post("/api/listing/register", d2)
        # Sjekker at vi får en filtrert liste tilbake
        data = {"category": "test", "price": 200, "city": "Trondheim", "min": 140, "max": 200}
        response = self.client.post("/api/listing/listings", data)
        ads = response.data
        for ad in ads:
            if ad["category"] != "test" or ad["city"] != "Trondheim" or ad["price"] > 200 or ad["price"] < 140:
                raise Error()

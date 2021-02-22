from django.test import TestCase

# Create your tests here.
import unittest
import datetime

from rest_framework.test import APIClient

from .models import Profile, Ad
from django.contrib.auth.models import User
from .serializers import AdSerializer

class AdsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):

        # Lager to brukere som kan brukes i testene
        user1 = User.objects.create_user(
            username="user1",
            email="test@thebeatles.com",
            password="test1234",
        )
        user1.save()
        test_user1 = Profile(user=user1, sellerTlf="3984503", city="Trondheim", birth_year="1990")
        test_user1.save()

        # Lager en annonse som kan brukes i testene
        Ad.objects.create(
            created_by_user=test_user1,
            pub_date="2021-01-01",
            name="Testannonse1",
            description="Dette er en test-annonse",
            price="4",
            imgUrl="backend/media/upload/Skjermbilde_2021-01-11_kl._14.18.14.png",
            category="test"
        )

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerne og annonsene
        user1 = User.objects.get(username="user1")
        user1.delete()

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()

    def test_show_ad(self):
        # lager en get request
        d = {
            "1": {
                "created_by_user": 1,
                "pub_date": datetime.date(2021, 1, 1),
                "name": "Testannonse1",
                "description": "Dette er en test-annonse",
                "price": "4",
                "imgUrl": "backend/media/upload/Skjermbilde_2021-01-11_kl._14.18.14.png",
                "category": "test",
            }
        }

        # henter brukere og annonser
        ad1 = Ad.objects.get(headline="Testannonse1")
        # Sjekk at attributtene er satt riktig
        #self.assertEqual(ad1.created_by_user.user_id, d["1"]["created_by_user"])
        self.assertEqual(ad1.pub_date, d["1"]["pub_date"])
        self.assertEqual(ad1.headline, d["1"]["name"])
        self.assertEqual(ad1.description, d["1"]["description"])
        self.assertEqual(ad1.price, d["1"]["price"]),
        self.assertEqual(ad1.img_URL, d["1"]["imgUrl"]),
        self.assertEqual(ad1.category, d["1"]["category"])

        #Sjekker responsen som funker
        # response = self.client.get("ad/view/1", d, format="json")
        # self.assertEqual(response.status_code, 200)
        #ad1.delete()

        response2 = self.client.get("/ad/view/1", d, format="json")
        self.assertEqual(response2.status_code, 404)

import datetime
import unittest

from rest_framework.test import APIClient

from .models import Profile, Ad
from django.contrib.auth.models import User


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
        test_user1 = Profile(user=user1, city="Trondheim", birth_year="1960", phone="33312333")
        test_user1.save()
        user2 = User.objects.create_user(
            username="user2",
            email="test@rolling.com",
            password="test4321",
        )
        user2.save()
        test_user2 = Profile(user=user2, city="Oslo", birth_year="2001", phone="23657634")
        test_user2.save()
        # Lager to annonser som kan brukes i testene
        Ad.objects.create(
            created_by_user=test_user1,
            pub_date="2021-01-01",
            headline="Testannonse1",
            description="Dette er en test-annonse",
            price="200",
            image="backend\\media\\images\\2021-02-19.png",
            category="test",
        )
        Ad.objects.create(
            created_by_user=test_user2,
            pub_date="1999-10-10",
            headline="Testannonse2",
            description="Dette er en annen test-annonse",
            price="300",
            image="backend\\media\\images\\bilde.png",
            category="test",
        )

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerne
        user1 = User.objects.get(username="user1")
        user2 = User.objects.get(username="user2")
        user1.delete()
        user2.delete()
        # Slettes annonsene automatisk med brukerne?

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()

    def test_show_all_ads(self):
        # lager en get request
        d = {
            "1": {
                "created_by_user": 1,
                "pub_date": datetime.date(2021, 1, 1),
                "headline": "Testannonse1",
                "description": "Dette er en test-annonse",
                "price": "200",
                "image": "backend\\media\\images\\2021-02-19.png",
                "category": "test",
            },
            "2": {
                "created_by_user": 2,
                "pub_date": datetime.date(1999, 10, 10),
                "headline": "Testannonse2",
                "description": "Dette er en annen test-annonse",
                "price": "300",
                "image": "backend\\media\\images\\bilde.png",
                "category": "test",
            },
        }
        response = self.client.get("/api/ads", d, format="json")
        # henter brukere og annonser
        ad1 = Ad.objects.get(headline="Testannonse1")
        ad2 = Ad.objects.get(headline="Testannonse2")
        # Sjekk at attributtene er satt riktig
        self.assertEqual(ad1.created_by_user.user_id, d["1"]["created_by_user"])
        self.assertEqual(ad2.created_by_user.user.id, d["2"]["created_by_user"])
        self.assertEqual(ad1.pub_date, d["1"]["pub_date"])
        self.assertEqual(ad1.headline, d["1"]["headline"])
        self.assertEqual(ad1.description, d["1"]["description"])
        self.assertEqual(ad1.category, d["1"]["category"])
        self.assertEqual(ad1.price, d["1"]["price"])
        self.assertEqual(ad1.image, d["1"]["image"])
        # Sjekker responsen som funker
        self.assertEqual(response.status_code, 200)
        # Sjekker respons for en annonse
        response2 = self.client.get("/api/ads/1", d["1"], format="json")
        self.assertEqual(response2.status_code, 200)
        ad1.delete()
        # Sjekker respons som ikke er støttet
        response2 = self.client.get("/api/ads/1", d["1"], format="json")
        self.assertEqual(response2.status_code, 404)

import unittest
from rest_framework.test import APIClient
from user.models import Profile
from ad.models import Ad, Category
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Rating
import os


class ratingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Lager en profil som skal legge ut en annonse for salg
        user1 = User.objects.create_user(
            username="user1",
            first_name="Hei",
            last_name="Test",
            password="test1234",
        )
        category = Category.objects.create(category="test")
        category.save()
        user1.save()
        test_user1 = Profile(user=user1, phone="3984503", city="Trondheim", birth_year="1990")
        test_user1.save()

        # Lager brukere som skal gi rating
        user2 = User.objects.create_user(
            username="user2",
            first_name="Hei",
            last_name="Test",
            password="test1234",
        )
        user3 = User.objects.create_user(
            username="user3",
            first_name="Hei",
            last_name="Test",
            password="test1234",
        )
        user2.save()
        test_user2 = Profile(user=user2, phone="3984503", city="Trondheim", birth_year="1990")
        test_user2.save()
        user3.save()
        test_user3 = Profile(user=user3, phone="3984503", city="Trondheim", birth_year="1990")
        test_user3.save()

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerene, kategorien og bildet.
        user1 = User.objects.get(username="user1")
        user1.delete()
        user2 = User.objects.get(username="user2")
        user2.delete()
        user3 = User.objects.get(username="user3")
        user3.delete()
        category = Category.objects.get(category="test")
        category.delete()
        os.remove(os.path.dirname(__file__) + "/../media/product/test_rating1.jpg")
        os.remove(os.path.dirname(__file__) + "/../media/product/test_rating2.jpg")

    def setUp(self):
        # Testen trenger en klient
        self.client = APIClient()

    def test_give_get_ratings(self):
        # Lager to ads som brukes i testene
        user1 = User.objects.get(username="user1")
        d = {
            "created_by_user": "",
            "name": "Testannonse1",
            "description": "Dette er en test-annonse",
            "price": 4,
            "city": "Trondheim",
            "img": open(os.path.dirname(__file__) + "/../media/test/test_rating1.jpg", "rb"),
            "category": "test",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        self.client.post("/api/listing/register", d)

        user1 = User.objects.get(username="user1")
        d = {
            "created_by_user": "",
            "name": "Testannonse2",
            "description": "Dette er en test-annonse",
            "price": 4,
            "city": "Trondheim",
            "img": open(os.path.dirname(__file__) + "/../media/test/test_rating2.jpg", "rb"),
            "category": "test",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        self.client.post("/api/listing/register", d)

        # Prøver å gi testannonse1 en rating
        user2 = User.objects.get(username="user2")
        ad = Ad.objects.get(name="Testannonse1")
        d = {"id": ad.pk, "stars": 10, "description": "Beskrivende test"}
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user2)))
        self.client.post("/api/rating/register", d, format="json")

        # tester at ad har fått en rating
        ad = Ad.objects.get(name="Testannonse1")
        self.assertIsNotNone(ad.rating)

        # tester at ad har fått 10 stjerner
        rating = Rating.objects.get(pk=ad.rating.pk)
        self.assertEqual(rating.stars, 10)

        # tester at rating objektet har riktig beskrivelse
        self.assertEqual(rating.description, "Beskrivende test")

        # Lager en rating fra bruker test3
        # på den andre annonsen til bruker test1
        ad = Ad.objects.get(name="Testannonse2")
        user3 = User.objects.get(username="user3")
        d = {"id": ad.pk, "stars": 9, "description": "Beskrivende test"}
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user3)))
        self.client.post("/api/rating/register", d, format="json")

        # Henter ut alle test1 sine ratings
        bruker_id = User.objects.get(username="user1").pk
        data = self.client.get("/api/rating/user/" + str(bruker_id), d, format="json").data

        # tester at vi fikk informasjonen til riktig bruker
        self.assertEqual(data.get("username"), user1.username)

        # Tester at bruker test1
        # har fått riktig antall stars fra de to brukerne
        ratings = data.get("ratings")
        self.assertEqual(ratings[0].get("stars"), 10)
        self.assertEqual(ratings[1].get("stars"), 9)

        # Tester at bruker test1 har fått riktig avg. rating
        self.assertEqual(data.get("avg_rating"), 9.5)

import unittest
from rest_framework.test import APIClient
from user.models import Profile
from ad.models import Ad
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Rating
import os


class ratingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):

        # Lager en profil som brukes i testene
        user1 = User.objects.create_user(
            username="user1",
            first_name="Hei",
            last_name="Test",
            password="test1234",
        )
        user1.save()
        test_user1 = Profile(user=user1, phone="3984503", city="Trondheim", birth_year="1990")
        test_user1.save()

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerne og annonsene
        user1 = User.objects.get(username="user1")
        user1.delete()
        os.remove(os.path.dirname(__file__) + "/../media/product/test_rating.jpg")

    def setUp(self):
        # Hver test trenger en klient
        self.client = APIClient()

    def test_give_rating(self):
        # Lager en ad som brukes i testene
        user1 = User.objects.get(username="user1")
        d = {
            "created_by_user": "",
            "name": "Testannonse1",
            "description": "Dette er en test-annonse",
            "price": 4,
            "city": "Trondheim",
            "img": open(os.path.dirname(__file__) + "/../media/test/test_rating.jpg", "rb"),
            "category": "test",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + str(Token.objects.get(user=user1)))
        self.client.post("/api/listing/register", d)

        # Prøver å gi test annonsen en rating
        ad = Ad.objects.get(name="Testannonse1")
        d = {"id": ad.pk, "stars": 10, "description": "Beskrivende test"}
        self.client.post("/api/rating/register", d, format="json")

        # tester at ad har fått en rating
        ad = Ad.objects.get(name="Testannonse1")
        self.assertIsNotNone(ad.rating)

        # tester at ad har fått 10 stjerner
        rating = Rating.objects.get(pk=ad.rating.pk)
        self.assertEqual(rating.stars, 10)

        # tester at rating objektet har riktige beskrivelse
        self.assertEqual(rating.description, "Beskrivende test")

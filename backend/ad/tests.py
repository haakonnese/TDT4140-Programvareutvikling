import unittest
from rest_framework.test import APIClient
from user.models import Profile
from .models import Ad, Category
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import os


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

    @classmethod
    def tearDownClass(cls):
        # Sletter brukerne og annonsene
        user1 = User.objects.get(username="user1")
        user1.delete()
        category = Category.objects.get(category="Test")
        category.delete()
        os.remove(os.path.dirname(__file__) + "/../media/product/test.jpg")
        os.remove(os.path.dirname(__file__) + "/../media/product/test2.jpg")

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

        # opprett annonse
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

        # tester å se en annonse og endre annonse
        ny = {
            "created_by_user": User.objects.get(username="user1").id,
            "name": "Annonsetest",
            "description": "Endret annonse",
            "price": 20,
            "city": "Oslo",
            "img": open(os.path.dirname(__file__) + "/../media/test/test2.jpg", "rb"),
            "category": "Test",
        }
        ad_id = ad1.id.__str__()

        # hent enkelt-annonse
        response2 = self.client.get("/api/listing/listing/" + ad_id)
        self.assertEqual(response2.status_code, 200)
        ad2 = response2.data
        self.assertEqual(ad2["name"], d["name"])
        self.assertEqual(ad2["description"], d["description"])
        self.assertEqual(ad2["price"], d["price"]),

        # endre annonse
        response3 = self.client.put("/api/listing/listing/" + ad_id + "/edit", ny)
        self.assertEqual(response3.status_code, 200)
        ny_ad = Ad.objects.get(name="Annonsetest")
        self.assertEqual(ny_ad.name, ny["name"])
        self.assertEqual(ny_ad.description, ny["description"])
        self.assertEqual(ny_ad.price, ny["price"])
        self.assertEqual(ny_ad.city, ny["city"])
        self.assertEqual(ny_ad.category, Category.objects.get(category=ny["category"]))

        # slett annonse
        response4 = self.client.delete("/api/listing/listing/" + ad_id + "/delete")
        self.assertEqual(response4.status_code, 204)
        try:
            Ad.objects.get(name="Annonsetest")
            self.assertFalse()
        except Ad.DoesNotExist:
            pass
        except Exception:
            self.assertFalse()
        # self.asserEquals(Ad.objects.get(name="Annonsetest"),0)

from django.test import TestCase
from .models import Profile
from django.contrib.auth.models import User


class ProfileModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        pass

    def test_it_has_information_fields(self):
        user = User.objects.create_user("john", "lennon@thebeatles.com", "johnpassword")
        # user = User.objects.get(username="john")
        profile = Profile(user, phone="22334455", birth_year="1990", city="Trondheim")
        self.assertEqual(profile.city, "Trondheim")
        self.assertEqual(profile.phone, "22334455")
        self.assertEqual(profile.birth_year, "1990")
        # self.assertEqual(profile.username, 'john')

# from django.test import TestCase
# from .models import Profile
# Create your tests here.
# """ from datetime import datetime
# from django.test import TestCase

# from .models import Profile, Ad

# # (1)
# class ProfileModelTest(TestCase):
#     # (2)
#     @classmethod
#     def setUpTestData(self):
#         self.user1 = Profile.objects.create()
#         first_name="John"
#         last_name="Doe"


#     # (3)
#     def test_it_has_information_fields(self):
#         self.assertIsInstance(self.user1.first_name, str)
#         self.assertIsInstance(self.user1.last_name, str)
#  """
# (4)
# def test_it_has_timestamps(self):
# self.assertIsInstance(self.user1.last_update, datetime)


# class ProfileModelTest(TestCase):
#     # (2)
#     @classmethod
#     def setUpTestData(cls):
#         user1 = Profile.objects.create()

#         ##user1.city = "Dee"
#         # print(user1)

#     # (3)
#     def test_it_has_information_fields(self):
#         user1.city = "Trondheim"
#         assertIsInstance(user1.city, str)
#         # self.assertIsInstance(self.user1.city, str)
#         # self.assertIsInstance(self.user1.last_name, str)

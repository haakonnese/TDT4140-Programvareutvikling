from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.contrib.auth import logout
from .serializers import ProfileSerializer
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt


# Postman mangler CSRF-token for å kunne sende POST-forespørsel.
# For at det skal fungere ble csrf_exempt lagt til,
# som fjerner beskyttelsen, dette bør kanskje endres senere.
# Vet ikke hvordan dette fikses enda.


@csrf_exempt
def register_profile(request):
    """Funksjon som registerer en ny profil."""
    respons = HttpResponse()
    if request.method == "POST":
        q_dict = request.POST
        user = User.objects.create_user(q_dict["username"], q_dict["email"], q_dict["password"])
        user.first_name = q_dict["firstname"]
        user.last_name = q_dict["lastname"]
        user.save()
        user.refresh_from_db()  # Hent profilen lagret i databasen
        user.profile.birth_year = q_dict["birth_year"]
        user.profile.city = q_dict["city"]
        user.profile.phone = q_dict["phone"]
        user.save()
        respons.status_code = 200
        json = JSONRenderer().render(ProfileSerializer(user.profile).data)
        respons.write(json)
        return respons
    else:
        respons.status_code = 405
        respons.write("Aksepterer kun POST forespørsel!")
        return respons


@csrf_exempt
def login_user(request):
    """Funksjon som logger en eksistrende bruker inn."""
    respons = HttpResponse()
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            respons.status_code = 200
            json = JSONRenderer().render(ProfileSerializer(request.user.profile).data)
            respons.write(json)
            return respons
        else:
            respons.status_code = 404
            return respons
    else:
        respons.status_code = 405
        return respons


def logout_view(request):
    """Funksjon som logger en pålogget bruker ut.
    Kaster ikke error hvis brukeren ikke er pålogget"""
    logout(request)
    return HttpResponse("Du er logget ut!")


def get_profile(request):
    """Returnerer profilen til den påloggede brukeren i JSON format."""
    respons = HttpResponse()
    if request.user.is_anonymous:
        respons.status_code = 403
        return respons
    json = JSONRenderer().render(ProfileSerializer(request.user.profile).data)
    respons.write(json)
    return respons

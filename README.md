# SellPoint - TDT4140 gruppe 63

Klon repo fra git

Ved terminalkommandoer, benytt ``python3`` og ``pip3`` for henholdsvis ``python`` og ``pip`` dersom man har både Python 2 og Python 3 installert.

## Installere avhengigheter
```
pip install pip --upgrade
pip install -r backend/requirements.txt

cd frontend
npm install
```

## Bygg og kjør appen
Fra frontend-mappa
```
npm run format
npm run start
```
Fra backend-mappa
```
pyhton manage.py makemigrations
pyhton manage.py migrate
python manage.py runserver
```

## Muligheter
Fra før av ligger en del annonser lagret i databasen. Dersom man ønsker å fjerne disse, fjern db.sqlite3 og alle filer i migrations-mappene bortsett fra ``__init__.py`` \
Man må deretter kjøre backend-kommandoene over igjen for å bygge appen. Før man kjører runserver, må kommandoen under kjøres. 
```
python manage.py createsuperuser
```
Man må deretter opprette minst en kategori via ``http://127.0.0.1:8000/admin``



## Python og npm
Dersom ``pip`` ikke finnes som en kommando, sjekk om python er installert

```
python -V
```

Dersom python er installert, kjør

```
python -m pip install -U pip
```

Hvis ikke, last ned python fra https://www.python.org/downloads/ \
Dersom npm ikke finnes, lastes Node.js ned fra https://nodejs.org/en/download/

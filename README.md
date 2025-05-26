
# PrezentOwO

Aplikacja skierowana do osób, chcących kupić prezent bliskim. Osobiście zapisywałam takie informacje w notatniku aktualizując imiona, zainteresowania i przeróżne pomysły na prezent. Nie jest to jednak najbardziej zabezpieczony przed "podglądaniem" sposób. Aplikacja wymagająca zalogowania powinna to ułatwić.


## Architektura
Projekt podzielony jest na *frontend* (React) i *backend* (Django).

Frontend z kolei podzielony jest na /assets (dodatkowe materiały), /components (elementy typu Sidebar), /pages (właściwe podstrony) oraz pliki: App.jsx, App.css i main.jsx służące za router oraz spis stylów CSS.


## Uruchomienie
Aby uruchomić należy:

BACKEND
1. przejść do podfolderu /frontend
2. wpisać komendę "python manage.py runserver"
*konieczne:
`pip install django djangorestframework`
`django-admin startproject backend .`  (utworzy w tym samym folderze)
`pip install django-cors-headers`  (wtmagane paczki)


FRONTEND
1. przejść do podfolderu /frontend
2. wpisać komendę "npm run dev"
*konieczne: `npm install`


## Użyte technologie
1. React
2. Django
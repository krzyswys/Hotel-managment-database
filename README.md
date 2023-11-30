# System zarządzania pokojami/hotelami

## O projekcie
System zarządzania hotelami - stwórz bazę danych przechowującą informacje o pokojach, rezerwacjach, klientach i pracownikach. System powinien umożliwiać zarządzanie rezerwacjami, płatnościami oraz przypisywanie zadań dla pracowników.
Sam projekt został stworzony na potrzeby przedmiotu Bazy Danych II na AGH.

## Dokumentacja:
https://docs.google.com/document/d/1s0k4Fd70ypCXCu_iY1hvGxTwPxoirSlNfc9ukp7B5XE/edit?usp=sharing

## Użyte technologie
- React
- Node.js + express.js
- MongoDB
- Docker

## Autorzy
- Jakub Kędra [@xramzesx](https://github.com/xramzesx)
- Paweł Konopka [@Nepommuck](https://github.com/Nepommuck)
- Krzysztof Wysocki [@krzyswys](https://github.com/krzyswys)

## Uruchamianie
### Server

Aby uruchomić projekt (serwer wraz z bazą MongoDB), niezbędne jest posiadanie zainstalowanego dockera na swoim urządzeniu, wraz z `docker-compose`. Następnie w głównym katalogu repozytorium wpisujemy:
```
npm start
```
### Client
Aby uruchomić aplikację webową, należy przejść do katalogu `client`, a następnie wewnątrz niego uruchomić to samo polecenie, co w przypadku servera, czyli: 
```
cd ./client
npm start
```
### Schemat bazy danych
![database_schema](https://github.com/krzyswys/Hotel-managment-database/assets/110239601/c58686f1-0446-4b0e-a47a-ae8e67f7130a)


###Prezentacja projektu:

<h4 align="center">Strona głowna: </h4>

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/53283bb3-e624-4b8c-b299-83ae05a47ff6

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/c0c3ce8f-2487-49a3-8c5c-713dd5326916

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/cf96c19d-b17c-4dfa-9288-138bf1bbd77a

<h4 align="center">Widok pojedynczego hotelu: </h4>

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/cf2d70b7-2999-4d1b-8a86-c154d5a35eeb

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/2112e95f-e34b-4698-aa75-4d1a9b068639

<h4 align="center">Logowanie i widok menadżera: </h4>

https://github.com/krzyswys/Hotel-managment-database/assets/110239601/d55aade8-92fc-4666-8952-1bc2653de8d4



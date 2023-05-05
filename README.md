# System zarządzania pokojami/hotelami

## O projekcie
System zarządzania hotelami - stwórz bazę danych przechowującą informacje o pokojach, rezerwacjach, klientach i pracownikach. System powinien umożliwiać zarządzanie rezerwacjami, płatnościami oraz przypisywanie zadań dla pracowników.
Sam projekt został stworzony na potrzeby przedmiotu Bazy Danych II na AGH.

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

Aby uruchomić projekt, niezbędne jest posiadanie zainstalowanego dockera na swoim urządzeniu, wraz z `docker-compose`. Następnie w głównym katalogu repozytorium wpisujemy:
```
npm start
```
### Client
Aby uruchomić aplikację webową, należy przejść do katalogu `client`, a następnie wewnątrz niego uruchomić to samo polecenie, co w przypadku servera, czyli: 
```
cd ./client
npm start
```
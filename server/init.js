/// TODO: finish this init file
console.log("Initialise database")

const mongoose = require('mongoose')
const models = require('models')
const utils = require('utils')
const Hotel = require('models/hotel.model')

const { addRoomReservation } = require('procedures/reservation.proc')

//// UTILS ////

const getRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomElement = array => {
    return array.length == 0 ? null : array[getRandom(0, array.length - 1)]
}

const getRandomDate = (from, to) => {
    return new Date(getRandom(from.getTime(), to.getTime()))
}

const getRandomPhone = () => {
    return "+48" + getRandom(100_000_000,999_999_999).toString()
}

const generateRandomHotelName = () => {
    const adjectives = ['Elegancki', 'Luksusowy', 'Przytulny', 'Nowoczesny', 'Urokliwy', 'Prestiżowy'];
    const nouns = ['Ośrodek', 'Pałac', 'Dwór', 'Resort', 'Kwatera', 'Dom'];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${randomAdjective} ${randomNoun}`;
}

//// SAFE INSERTIONS ////

const safeSave = async (model, type) => {
    try {
        await model.save()
    } catch (error) {
        if (error.code == 11000)
            console.warn(`[warn] ${type} with this keyValue already exists: ${error.keyValue}`)
    }
}

//// CONSTANTS ////

const usedPersonEmails = new Set()

const commonPassword = "zaq1@WSX"

const quantity = {
    person: 10,
    employee: 5
}
const images = {
    width: 1200,
    height: 1200
}

const exampleData = {
    firstnames: [
        "Andrzej",
        "Mariola",
        "Konrad",
        "Robert",
        "Szymon",
        "Karolina",
        "Alicja",
        "Jakub",
        "Krzystof",
        "Paweł",
        "Michał",
        "Piotr",
    ],
    lastnames: [
        "Nowak",
        "Makłowicz",
        "Krk",
        "Montata",
        "Jarzębina",
        "Bosak",
        "Kossak"
    ],
    roles : [
        "Manager",
        "Receptionist",
        "Cleaner"
    ],
    descriptions : [
        "Nasz hotel to miejsce doskonałe dla osób ceniących spokój i relaks. Znajdziesz u nas luksusowe pokoje z widokiem na morze, doskonałą kuchnię oraz kompleksowy pakiet usług spa i wellness.",
        "Zapraszamy do naszego eleganckiego hotelu, w którym każdy detal został starannie zaprojektowany. Nasza wysoka jakość obsługi i dostęp do wielu udogodnień sprawią, że Twój pobyt będzie niezapomniany.",
        "Odkryj niezwykłe piękno przyrody, zatrzymując się w naszym malowniczo położonym hotelu. Nasza przyjazna atmosfera oraz wysoka jakość usług zapewnią Ci pełen relaks i komfort.",
        "Nasz hotel to doskonałe miejsce na romantyczny wypad we dwoje. Zapewniamy intymność, elegancję oraz wyśmienitą kuchnię. Nasz personel zatroszczy się o każdy szczegół, abyś mógł się zrelaksować i cieszyć chwilą.",
        "Zapraszamy do naszego nowoczesnego hotelu, który oferuje luksusowe pokoje, restaurację z szerokim wyborem dań oraz bogaty program rozrywkowy. U nas nie będziesz się nudzić!",
        "Nasz hotel to prawdziwy raj dla miłośników sportów wodnych. Znajdziesz u nas prywatną plażę, centrum nurkowe oraz możliwość wypożyczenia sprzętu do surfingu. Czekamy na Ciebie!",
        "Jeśli szukasz idealnego miejsca na konferencję lub spotkanie biznesowe, nasz hotel jest właśnie dla Ciebie. Oferujemy nowoczesne sale konferencyjne oraz wysokiej jakości usługi cateringowe.",
        "Zapraszamy do naszego przytulnego hotelu, który oferuje wygodne pokoje, urokliwy ogród oraz pyszną kuchnię regionalną. Gwarantujemy Ci relaksujący i autentyczny pobyt.",
        "Nasz hotel to doskonałe miejsce na wakacje z rodziną. Oferujemy liczne atrakcje dla dzieci, baseny, plac zabaw oraz program animacyjny. U nas każdy znajdzie coś dla siebie.",
        "Zapraszamy do naszego luksusowego hotelu, w którym znajdziesz eleganckie pokoje, spa o najwyższej jakości oraz gourmetowską restaurację. U nas poczujesz się jak w raju.",
        "Nasz hotel oferuje wyjątkowe doświadczenie dla miłośników kultury i sztuki. Organizujemy wystawy, koncerty oraz warsztaty artystyczne. Przyjdź i zanurz się w naszej twórczej atmosferze.",
        "Zapraszamy do naszego przyjaznego hotelu, który oferuje wygodne pokoje, restaurację serwującą smaczne dania kuchni lokalnej oraz dogodną lokalizację blisko atrakcji turystycznych.",
        "Nasz hotel to idealne miejsce na romantyczny weekend dla zakochanych. Oferujemy pokoje z widokiem na góry, jacuzzi i romantyczne kolacje przy świecach. Czekamy na Was!",
        "Zapraszamy do naszego ekskluzywnego hotelu, który oferuje niezrównane luksusowe doświadczenie. Nasze apartamenty są urządzone z najwyższą dbałością o detale, a nasz personel zapewni Ci wysoki standard obsługi.",
        "Nasz hotel to idealne miejsce na aktywny wypoczynek. Oferujemy wiele atrakcji, takich jak wycieczki rowerowe, jazda konna i piesze wycieczki po okolicznych szlakach. Przyjdź i ciesz się naturą!",
        "Zapraszamy do naszego przyjaznego hotelu, który oferuje pokoje dla rodzin z dziećmi. Posiadamy plac zabaw, basen dla dzieci oraz animacje dla najmłodszych. Zapewniamy wspaniałą zabawę dla całej rodziny.",
        "Nasz hotel to idealne miejsce na relaksujący wypoczynek. Oferujemy kompleksowe usługi spa, basen z jacuzzi oraz pyszną kuchnię. Zostaw troski za drzwiami i zanurz się w naszej oazie spokoju.",
        "Zapraszamy do naszego stylowego hotelu, który oferuje piękne pokoje, elegancką restaurację oraz nowoczesne centrum fitness. Nasz personel zadba o to, abyś czuł się komfortowo podczas całego pobytu.",
        "Nasz hotel to doskonałe miejsce na romantyczny ślub i podróż poślubną. Oferujemy przepiękne wnętrza, urokliwe ogrody i kompleksowe usługi weselne. Stworzymy dla Was niezapomniane wspomnienia.",
        "Zapraszamy do naszego przyjaznego hotelu, który oferuje wygodne pokoje, taras z panoramicznym widokiem oraz pyszną kuchnię. Z nami Twój pobyt będzie pełen uśmiechu i pozytywnej energii.",
        "Nasz hotel to idealne miejsce na aktywny wypoczynek na łonie natury. Oferujemy liczne szlaki turystyczne, kajaki i możliwość wędkowania. Przyjdź i odkryj piękno naszej okolicy.",      
    ],
    reviews: [
        "Ten hotel był niesamowity! Pokoje były przestronne i czyste, personel był niesamowicie pomocny i uprzejmy. Lokalizacja była również świetna, blisko atrakcji turystycznych. Na pewno tu wrócę!",
        "Bardzo miło wspominam mój pobyt w tym hotelu. Obsługa była wyjątkowa, jedzenie było pyszne, a pokoje eleganckie i komfortowe. Gorąco polecam!",
        "Ten hotel spełnił moje wszystkie oczekiwania. Pokoje były piękne, a widok z okna był oszałamiający. Restauracja serwowała wyśmienite dania, a personel był bardzo przyjazny. Na pewno polecam to miejsce!",
        "Nie mogłem sobie wymarzyć lepszego hotelu na mój wyjazd. Pokoje były luksusowe, a personel zawsze służył pomocą. Dodatkowo, spa było rewelacyjne. Chętnie tu wrócę w przyszłości!",
        "Ten hotel to absolutna perełka. Pokoje były gustownie urządzone, a atmosfera była magiczna. Restauracja serwowała wyśmienite posiłki, a personel był niezwykle uprzejmy. Czułem się jak w raju!",
        "Mój pobyt w tym hotelu był po prostu doskonały. Pokoje były czyste i wygodne, a personel był niezwykle profesjonalny. Śniadanie było obfite i smaczne. Polecam to miejsce z całego serca!",
        "Ten hotel to najlepszy wybór na relaksujący pobyt. Pokoje są przestronne i eleganckie, a personel jest niezwykle uprzejmy i pomocny. Spa oferuje szeroki wybór zabiegów, które doskonale relaksują. Na pewno wrócę!",
        "Byłem zachwycony tym hotelem. Pokoje były piękne, czyste i wygodne. Obsługa była niezwykle profesjonalna, a jedzenie w restauracji wyśmienite. Zdecydowanie polecam to miejsce!",
        "To był mój najlepszy pobyt w hotelu do tej pory. Pokoje były przestronne i pięknie urządzone, a personel był niezwykle przyjazny i pomocny. Śniadanie było wyśmienite. Na pewno tu wrócę!",
        "Ten hotel przeszedł moje najśmielsze oczekiwania. Pokoje były luksusowe, a personel był niezwykle profesjonalny. Restauracja serwowała wyśmienite dania, a spa było relaksujące. Gorąco polecam to miejsce!",
        "To był absolutnie wspaniały hotel. Pokoje były gustownie urządzone, a personel był niezwykle uprzejmy. Restauracja serwowała pyszne dania, a widok z tarasu był przepiękny. Chciałbym tu wrócić jak najszybciej!",
        "Ten hotel był świetny! Pokoje były czyste i wygodne, a personel był bardzo przyjazny. Lokalizacja była również dogodna, blisko atrakcji turystycznych. Zdecydowanie polecam to miejsce!",
        "Byłem oczarowany tym hotelem. Pokoje były przepiękne, a personel był niesamowicie pomocny i uprzejmy. Restauracja serwowała wyśmienite dania, a spa było relaksujące. Na pewno jeszcze tu wrócę!",
        "Ten hotel to prawdziwa oaza spokoju. Pokoje są przestronne i eleganckie, a personel zawsze służy pomocą. Restauracja serwuje wyśmienite posiłki. Czułem się tu jak w domu!",
        "Mój pobyt w tym hotelu był absolutnie fantastyczny. Pokoje były czyste i wygodne, a personel był niezwykle uprzejmy. Śniadanie było obfite i smaczne. Zdecydowanie polecam to miejsce!",
        "To był doskonały hotel na romantyczny pobyt. Pokoje były piękne, a personel był bardzo przyjazny. Restauracja serwowała wyśmienite dania, a atmosfera była magiczna. Gorąco polecam!",
        "Ten hotel to idealne miejsce na relaksujący wypoczynek. Pokoje są wygodne, a personel jest niezwykle uprzejmy. Spa oferuje doskonałe zabiegi, które poprawiają samopoczucie. Na pewno tu wrócę!",      
    ],
    photos : [
        `https://picsum.photos/id/220/${images.width}/${images.height}`,
        `https://picsum.photos/id/268/${images.width}/${images.height}`,
        `https://picsum.photos/id/270/${images.width}/${images.height}`,
        `https://picsum.photos/id/253/${images.width}/${images.height}`,
        `https://picsum.photos/id/203/${images.width}/${images.height}`,
        `https://picsum.photos/id/270/${images.width}/${images.height}`,
        `https://picsum.photos/id/271/${images.width}/${images.height}`,
        `https://picsum.photos/id/200/${images.width}/${images.height}`,
        `https://picsum.photos/id/263/${images.width}/${images.height}`,
        `https://picsum.photos/id/231/${images.width}/${images.height}`,
        `https://picsum.photos/id/230/${images.width}/${images.height}`,
        `https://picsum.photos/id/263/${images.width}/${images.height}`,
        `https://picsum.photos/id/220/${images.width}/${images.height}`,
        `https://picsum.photos/id/268/${images.width}/${images.height}`,
        `https://picsum.photos/id/230/${images.width}/${images.height}`,
        `https://picsum.photos/id/233/${images.width}/${images.height}`,
        `https://picsum.photos/id/243/${images.width}/${images.height}`,
        `https://picsum.photos/id/251/${images.width}/${images.height}`,
        `https://picsum.photos/id/270/${images.width}/${images.height}`,
        `https://picsum.photos/id/251/${images.width}/${images.height}`,
        `https://picsum.photos/id/241/${images.width}/${images.height}`,
        `https://picsum.photos/id/241/${images.width}/${images.height}`,
        `https://picsum.photos/id/251/${images.width}/${images.height}`,
        `https://picsum.photos/id/240/${images.width}/${images.height}`,
        `https://picsum.photos/id/231/${images.width}/${images.height}`,
        `https://picsum.photos/id/221/${images.width}/${images.height}`,
        `https://picsum.photos/id/251/${images.width}/${images.height}`,
        `https://picsum.photos/id/267/${images.width}/${images.height}`,
        `https://picsum.photos/id/230/${images.width}/${images.height}`,
        `https://picsum.photos/id/251/${images.width}/${images.height}`,
    ]
}


const hotelGeneralData = [{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Kraków",
        street: "Styczna",
        houseNumber: "37d",
        postalCode: "32764"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Warszawa",
        street: "Fabryczna",
        houseNumber: "44",
        postalCode: "00446"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Łódź",
        street: "al. marsz. Józefa Piłsudskiego",
        houseNumber: "22",
        postalCode: "90051"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Katowice",
        street: "Grażyńskiego",
        houseNumber: "2",
        postalCode: "40126"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Gdańsk",
        street: "Miła",
        houseNumber: "14",
        postalCode: "80512"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Poznań",
        street: "Stary Rynek",
        houseNumber: "3",
        postalCode: "61772"
}},{
    floors: 3,
    roomsPerFloor: 6,
    address: {
        country : "Polska",
        city: "Białystok",
        street: "Jana Kilińskiego",
        houseNumber: "1",
        postalCode: "15089"
}}]

//// MAIN ////

utils.connect(async () => {

    //// GENERATE HOTELS ////
    console.log("Generating hotels")
    for (const { address, floors, roomsPerFloor } of hotelGeneralData) {
        
        const hotel = new models.Hotel({
            name: generateRandomHotelName(),
            address,
            phone: getRandomPhone(),
            email: `contact@${address.city.toLocaleLowerCase()}.hotel.com.pl`,
            rooms: [],
            photos : exampleData.photos.filter(photos => !!getRandom(0, 1)),
            description : getRandomElement(exampleData.descriptions)
        })

        for (let floor = 1; floor < floors; floor++) {
            for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
                const room = {
                    internalNumber: 100 * (floor - 1) + roomNumber,
                    floorNumber: floor,
                    beds: getRandom(1, 5),
                    pricePerDay: getRandom(100, 400),
                    conveniences: {
                        wifi: !!getRandom(0,1) ? true : undefined,
                        kitchen: !!getRandom(0,1) ? true : undefined,
                        smoking: !!getRandom(0,1) ? true : undefined,
                        pets: !!getRandom(0,1) ? true : undefined,
                        children: !!getRandom(0,1) ? true : undefined,
                        balcony: !!getRandom(0,1) ? true : undefined,
                        elevator: !!getRandom(0,1) ? true : undefined,
                        restaurant: !!getRandom(0,1) ? true : undefined,
                        parking: !!getRandom(0,1) ? true : undefined,
                        invlusiveMeals: !!getRandom(0,1) ? true : undefined 
                    }
                }

                hotel.rooms.push(room)
            }
        }

        await safeSave(hotel, "Hotel")
    }

    //// GENERATE PERSONS ////

    console.log("Generating persons")

    /// SPECIFIC ///

    const specificPerson = new models.Person({
        firstname: "Test",
        lastname: "Testowski",
        birthdate: new Date("2000-1-1"),
        password: commonPassword,
        email: "person@person.com",
        address : {
            country: "Polska",
            city : "Kraków",
            street: "Kawiory",
            houseNumber: "21",
            postalCode: "30055"
        }
    })

    await safeSave(specificPerson, "Person" )

    /// RANDOM ///

    for (let i = 0; i < quantity.person; i++ ) {
        const { address } = JSON.parse(JSON.stringify(getRandomElement(hotelGeneralData)))
        
        let firstname = ""
        let lastname  = ""
        let email = ""

        do {
            firstname = getRandomElement(exampleData.firstnames)
            lastname  = getRandomElement(exampleData.lastnames)

            email = `${firstname.toLocaleLowerCase()}.${lastname.toLocaleLowerCase()}@gmail.com`

        } while(usedPersonEmails.has(email))

        usedPersonEmails.add(email)
        
        const person = new models.Person({
            firstname,
            lastname,
            birthdate: getRandomDate(new Date("1980-1-1"), new Date("2002-12-31")),
            phone: !!getRandom(0,1) ? undefined : getRandomPhone(),
            password: commonPassword,
            email,
            address,
        })

        await safeSave(person, "Person")
    }

    ///// GENERATE EMPLOYEE /////

    const adminEmployee = new models.Employee({
        firstname: "Admin",
        lastname: "Admin",
        birthdate: new Date('2000-1-1'),
        email: "admin@admin.com",
        password: "admin",
        address: {
            country: "Polska",
            city : "Kraków",
            street: "Kawiory",
            houseNumber: "21a",
            postalCode: "30055"
        },
        salary: 15_000,
        position: "Admin"
    })


    await safeSave(adminEmployee, "Employee")

    const specificEmployee = new models.Employee({
        firstname: "Grzegorz",
        lastname: "Brzęczyszczykiewicz",
        birthdate: new Date('2000-1-1'),
        email: "manager@manager.com",
        address : {
            country: "Polska",
            city : "Kraków",
            street: "Kawiory",
            houseNumber: "21b",
            postalCode: "30055"
        },
        position: "Manager"
    })

    await safeSave(specificEmployee, "Employee")

    /// RANDOM ///

    
    for (let i = 0; i < quantity.employee; i++ ) {
        const { address } = JSON.parse(JSON.stringify(getRandomElement(hotelGeneralData)))
        
        let firstname = ""
        let lastname  = ""
        let email = ""

        do {
            firstname = getRandomElement(exampleData.firstnames)
            lastname  = getRandomElement(exampleData.lastnames)

            email = `${firstname.toLocaleLowerCase()}.${lastname.toLocaleLowerCase()}@gmail.com`

        } while(usedPersonEmails.has(email))

        usedPersonEmails.add(email)
        
        const employee = new models.Employee({
            firstname,
            lastname,
            birthdate: getRandomDate(new Date("1980-1-1"), new Date("2002-12-31")),
            phone: !!getRandom(0,1) ? undefined : getRandomPhone(),
            password: commonPassword,
            email,
            address,
            salary: getRandom(3000, 15_000),
            position : getRandomElement(exampleData.roles)
        })

        await safeSave(employee, "employee")
    }


    //// RESERVATIONS ////

    const config = {
        startDate: new Date('2021-1-1'),
        endDate: new Date('2021-12-12')
    }

    console.log("Generating reservations")

    const rooms = await Hotel.aggregate([{
        $unwind: "$rooms"
    },{
        $project : {
            _id: "$rooms._id"
        }
    }])

    const persons = await models.Person.find({},{_id: 1})
    
    for (const person of persons) {
        const numberOfReservations = getRandom(3, 100)
        for (let i = 0; i < numberOfReservations; i++) {
            try {
                const startDate = getRandomDate(config.startDate, config.endDate) 
                const dueDate = getRandomDate(startDate, new Date(startDate + 86400000 * getRandom(3,14)))
        
                await addRoomReservation(person._id, getRandomElement(rooms)._id, {
                    startDate,
                    dueDate,
                    review : !!getRandom(0,1) ? {
                        content: !!getRandom(0,1) ? getRandomElement(exampleData.reviews) : undefined,
                        stars: !!getRandom(0,1) ? getRandom(1,5) : undefined
                    } : undefined
                }, false)
            } catch (error) {
                i--
            }
        }
    }


    /// TODO: Add some reservations, which uses addReservation procedure

    console.log("Done")
    mongoose.disconnect()
})
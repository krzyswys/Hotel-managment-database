/// TODO: finish this init file
console.log("Initialise database")

const mongoose = require('mongoose')
const models = require('models')
const utils = require('utils')

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
    return getRandom(from.getTime(), to.getTime())
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
            rooms: []
        })

        for (let floor = 1; floor < floors; floor++) {
            for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
                const room = {
                    internalNumber: 100 * (floor - 1) + roomNumber,
                    floorNumber: floor,
                    beds: getRandom(1, 5),
                    pricePerDay: getRandom(100, 400)
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

    // console.log("Generating reservations")

    /// TODO: Add some reservations, which uses addReservation procedure

    console.log("Done")
    mongoose.disconnect()
})
import React, { useState } from 'react';

const SearchBar = ({onSubmit}) => {
    const [searchPhrase, setSearchPhrase] = useState(undefined)
    const [startDate, setStartDate] = useState(undefined)
    const [dueDate, setDueDate] = useState(undefined)
    const [capacity, setCapacity] = useState(undefined)
      
    const handleSearchPhrase = event => {
        setSearchPhrase(event.target.value)
    }
    
    const handleStartDate = event => {
        setStartDate(event.target.value)
    }
    
    const handleDueDate = event => {
        setDueDate(event.target.value)
    }

    const handleCapacity = event => {
        setCapacity(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit({
            searchPhrase,
            capacity,
            startDate,
            dueDate
        })
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text" onChange={handleSearchPhrase} placeholder="Wyszukaj" />
            <input type="date" onChange={handleStartDate} placeholder="Data" />
            <input type="date" onChange={handleDueDate} placeholder="Data" />
            <input type="number" onChange={handleCapacity} placeholder="Ilość osób" min={0} max={100}/>
            <button>Szukaj</button>
        </form>
    )
}

export default SearchBar
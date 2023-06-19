const conveniences = [
    "wifi",
    "kitchen",
    "smoking",
    "pets",
    "children",
    "balcony",
    "elevator",
    "restaurant",
    "parking",
    "invlusiveMeals"
]

module.exports = {
    isRangesOverlaping: (first, second) => {
        return first.start <= second.end && first.end >= second.start
    },
    getConveniences: query => {
        const result = {}
        for (const key of conveniences) {
            if (!!query[key])
                result[key] = true
        }

        return result
    }
}
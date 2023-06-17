module.exports = {
    isRangesOverlaping: (first, second) => {
        return first.start <= second.end && first.end >= second.start
    }
}
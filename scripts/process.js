const fs = require('fs')
const moment = require('moment')
const uniq = require('lodash.uniq')
const input = require('../data/countries-lifetime')

const startDates = []
const featureMap = []

input.features.forEach(f => {
  if (f.properties.COWSYEAR != -1) {
    const start = moment(`${f.properties.COWSYEAR}-${f.properties.COWSMONTH}-${f.properties.COWSDAY}`)
    const end = moment(`${f.properties.COWEYEAR}-${f.properties.COWEMONTH}-${f.properties.COWEDAY}`)
    const diffDays = end.diff(start, 'days')
    const diffMonths = end.diff(start, 'months')
    const diffYears = end.diff(start, 'years')

    f.properties.diffDays = diffDays
    f.properties.diffMonths = diffMonths
    f.properties.diffYears = diffYears
    f.properties.start_str = start.format('D-M-YYYY')
    f.properties.end_str = end.format('D-M-YYYY')

    startDates.push(start)
    startDates.push(end)

    featureMap.push({
      id: f.properties.FEATUREID,
      start: start.format('D-M-YYYY'),
      end: end.format('D-M-YYYY')
    })
  } else {
    f.properties.start_str = null
    f.properties.end_str = null
  }
})

startDates.sort((a, b) => a.isAfter(b) ? 1 : -1)
const strdates = []
startDates.forEach(s => {
  strdates.push(s.format('D-M-YYYY'))
})

console.log(JSON.stringify(input))
console.log(JSON.stringify(uniq(strdates)))
console.log(JSON.stringify(featureMap))
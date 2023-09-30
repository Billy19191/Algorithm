import jsonData from './result_quickselect.json' assert { type: 'json' }
import fs from 'fs'
const groupSize = 5
let groupSum = 0
let groupCount = 0
let averageData = []
for (let i = 0; i < jsonData.length; i++) {
  groupSum += jsonData[i].time
  groupCount++
  if (groupCount === groupSize) {
    const average = groupSum / groupSize
    groupSum = 0
    groupCount = 0
    averageData.push({ n: jsonData[i].n, k: jsonData[i].k, time: average })
  }
}
fs.writeFileSync(
  './TimeEfficient/result_quickselect_average.json',
  JSON.stringify(averageData)
)
console.log(averageData)

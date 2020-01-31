const testFolder = './';
const fs = require('fs');
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const helper = require('./helper')
// usage:
let promsifiedReadDir = helper.promisify(fs.readdir);
const timeTable = helper.getBlankTimeTable()
const classes = ['6th', '7th', '8th', '9th', '10th']
const subjects = ['Maths', 'English', 'Science', 'Kannada', 'Hindi']
async function getTimeTable(file) {
  const rl = createInterface({
    input: createReadStream(file)
  });
  const lang = file.substring(31, file.length - 4)
  for await (const line of rl) {
    // Process the line.
    if (line.substring(0, 2) !== '--') {
      let lineArr = line.split(',')
      for (let i = 1; i < lineArr.length; i++) {
        let day = helper.getDay(i)
        const time = lineArr[0]
        const _class = lineArr[i];
        if (_class) {
          timeTable[day][time][_class] = lang
        }
      }
    }
  };
}

(function () {
  promsifiedReadDir(testFolder).then(files => {
    let cnt = 0;
    files.forEach(file => {
      if (file.substring(file.length - 3) === 'csv') {
        ++cnt;
        getTimeTable(file).then(res => {
          file.substring(31, file.length - 4)
          --cnt;
          if (cnt === 0) {
            // console.log('>>>>>>>',JSON.stringify(timeTable))
            const classWiseTimeTable = getClassWiseTimeTable(timeTable)
            console.log('classwise Time table is as follows:', classWiseTimeTable)
            console.log('---------------------------------------------------------')
            const coTeacherResult = assignCoTeacher(timeTable)
            console.log('maximum coTeachers required:', coTeacherResult.maxCoTeachersRequired)
            console.log('---------------------------------------------------------')
            console.log('\n new time table is:', JSON.stringify(coTeacherResult.newTimeTable))
          }
        })
      }
    })
  }).catch(err => {
    console.log('error in main function')
  })
})()

function getClassWiseTimeTable(timeTable) {
  const classWiseTT = {};
  for (const day in timeTable) {
    if (timeTable.hasOwnProperty(day)) {
      const _day = timeTable[day];
      for (const time in _day) {
        if (_day.hasOwnProperty(time)) {
          const obj = _day[time];
          const keys = Object.keys(obj)
          const values = Object.values(obj)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = values[i]
            if (!classWiseTT[key]) {
              classWiseTT[key] = {}
            }
            if (!classWiseTT[key][day]) {
              classWiseTT[key] = {
                Monday: {},
                Tuesday: {},
                Wednesday: {},
                Thursday: {},
                Friday: {},
                Saturday: {}
              }
            }
            if (classWiseTT[key][day][time] === undefined) {
              classWiseTT[key][day] = {
                '8:00 AM': '',
                '9:00 AM': '',
                '10:00 AM': '',
                '11:00 AM': '',
                '12:00 PM': '',
                '1:00 PM': '',
                '2:00 PM': '',
                '3:00 PM': '',
                '4:00 PM': ''
              }
            }
            classWiseTT[key][day][time] = val
          }
        }
      }
    }
  }
  console.log('classWiseTT:', classWiseTT)
  return classWiseTT
}

function assignCoTeacher(timeTable) {
  const newTimeTable = Object.assign({}, timeTable);
  let maxCoTeachersRequired = 0;
  // console.log('timeTable is:', timeTable)
  for (const day in timeTable) {
    if (timeTable.hasOwnProperty(day)) {
      const _day = timeTable[day];
      for (const time in _day) {
        if (_day.hasOwnProperty(time)) {
          const obj = _day[time];
          const keys = Object.keys(obj)
          const values = Object.values(obj)
          let noOfCoTeachersRequired = 0;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = values[i]
            // console.log('key is:', key)
            // console.log('val is:', val)
            const coTeacher = subjects.filter(x => !values.includes(x))[0];
            if(!coTeacher) {
              noOfCoTeachersRequired++
            }
            newTimeTable[day][time][key] = {
              teacher : val,
              co_teacher : coTeacher ? coTeacher : 'required'
            }
            values.push(newTimeTable[day][time][key].co_teacher)
          }
          maxCoTeachersRequired = Math.max(maxCoTeachersRequired, noOfCoTeachersRequired)
        }
      }
    }
  }
  // console.log('new Time table is:', JSON.stringify(newTimeTable))
  // console.log('maxCoTeachersRequired :', maxCoTeachersRequired)
  return { newTimeTable: newTimeTable, maxCoTeachersRequired: maxCoTeachersRequired}
}

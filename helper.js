exports.promisify = function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
};

exports.getRowByTime = function(time) {
  switch (time) {
    case '8:00 AM':
      return 1;
    case '9:00 AM':
        return 2;
    case '10:00 AM':
      return 3;
    case '11:00 AM':
      return 4;
    case '12:00 PM':
      return 5;
    case '1:00 PM':
      return 6;
    case '2:00 PM':
      return 7;
    case '3:00 PM':
      return 8;
    case '4:00 PM':
      return 9;
    default:
      break;
  }
}

exports.getTimeTable = function* getTimeTable(timeTable) {
  yield {time: '8:00 AM',...timeTable['8:00 AM']};
  yield {time: '9:00 AM', ...timeTable['9:00 AM']};
  yield {time: '10:00 AM', ...timeTable['10:00 AM']};
  yield {time: '11:00 AM', ...timeTable['11:00 AM']};
  yield {time: '12:00 PM', ...timeTable['12:00 PM']};
  yield {time: '1:00 PM', ...timeTable['1:00 PM']};
  yield {time: '2:00 PM', ...timeTable['2:00 PM']};
  yield {time: '3:00 PM', ...timeTable['3:00 PM']};
  yield {time: '4:00 PM', ...timeTable['4:00 PM']};
}

exports.getDay = function(_dayNo) {
  switch (_dayNo) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
      
    default:
      break;
  }
}
exports.getBlankTimeTable = function() {
  return {
    Monday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    },
    Tuesday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    },
    Wednesday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    },
    Thursday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    },
    Friday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    },
    Saturday: {
      '8:00 AM': {},
      '9:00 AM': {},
      '10:00 AM': {},
      '11:00 AM': {},
      '12:00 PM': {},
      '1:00 PM': {},
      '2:00 PM': {},
      '3:00 PM': {},
      '4:00 PM': {}
    }
  }
}
const month = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const numericMonth = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
];

export default class ParseDate {
  static dmy(date) {
    // console.log('here!!');
    let temp = Date.parse(date);
    temp = new Date(temp);
    return temp.getDate() + ' ' + month[temp.getMonth()] + ' ' + temp.getFullYear().toString().slice(-2);
  }

  static mdy(date) {
    let temp = Date.parse(date);
    temp = new Date(temp);
    return month[temp.getMonth()] + ' ' + temp.getDate() + ', ' + temp.getFullYear().toString().slice(-2);
  }

  static ymd(date) {
    let temp = Date.parse(date);
    temp = new Date(temp);
    return temp.getFullYear() + '-' + numericMonth[temp.getMonth()] + '-' + temp.getDate();
  }

  static timeSince(date) {
    let thatTime = Date.parse(date);
    thatTime = new Date(thatTime);
    const currentTime = new Date();
    const diff = currentTime - thatTime;
    if (diff <= 60 * 1000) {
      const temp = parseInt(diff/1000);
      return temp === 1 ? '1 second ': temp + ' seconds ';
    } else if (diff <= 60*60*1000) {
      const temp = parseInt(diff/(60*1000));
      return temp === 1 ? '1 minute ' : temp + ' minutes ';
    } else {
      const temp = parseInt(diff/(60*60*1000));
      return temp === 1 ? '1 hour ': temp + ' hours ';
    }
  }
}

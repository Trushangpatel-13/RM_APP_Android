import moment from 'moment';

export const getDate=()=>{
    var date = moment()
                  .utcOffset('+05:30')
                  .format('DD-MM-YYYY');
    return date
}

export const getDateTime=()=>{
    var dateTime = moment()
                  .utcOffset('+05:30')
                  .format('YYYY-MM-DD HH:mm:ss');
    return dateTime
}

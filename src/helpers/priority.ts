import moment, {Moment} from 'moment'
import 'moment-timezone'

export const getPriority = (date: string) => {

    // date > 6 : LOW
    // date > 3 && date < 6: MEDIUM 
    // date < 3: HIGH

    const timeZone: string = moment.tz.guess()

    const currentDate: Moment = moment().tz(timeZone)
    const targetDate: Moment = moment(date, 'D [de] MMMM')

    const millisecondsDifference: number = targetDate.valueOf() - currentDate.valueOf();
    const dayLeft:number = Math.ceil(millisecondsDifference / (1000 * 60 * 60 * 24));

    if(dayLeft >= 6){
        return 'LOW'
    }else if(dayLeft > 3 && dayLeft < 6){
        return 'MEDIUM'
    }else {
        return 'HIGH'
    }

}
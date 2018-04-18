import * as moment from 'moment';

import { IDateService } from "./IDateService";

export class DateServiceImpl implements IDateService {
    public format(date: Date, emptySymbol: string): string {
        let result: string = emptySymbol;
        if (date) {
            result = moment(date).format('YYYY-MM-DD');
        }
        return result;
    }
}
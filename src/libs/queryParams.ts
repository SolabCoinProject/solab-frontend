import { parseISO } from 'date-fns';
import * as _ from 'lodash';

export const queryParamsHandler = (query: any) => {
    let docsQuery = _.omit(query, ['page', 'limit']);
    if (docsQuery.created_at_from) {
        docsQuery.created_at = {
            ...docsQuery.created_at,
            $gte: parseISO(docsQuery.created_at_from),
        };
    }
    if (docsQuery.created_at_to) {
        docsQuery.created_at = {
            ...docsQuery.created_at,
            $lte: parseISO(docsQuery.created_at_to),
        };
    }
    docsQuery = _.omit(docsQuery, ['created_at_from', 'created_at_to']);
    return docsQuery;
};

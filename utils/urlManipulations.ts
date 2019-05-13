import { Request } from 'express';

export class UrlManipulations {

    public static BuildFilterObj(request: Request) {

        let returnObj = { filters: {}, limit: 0, skip: 0 };

        returnObj.limit = parseInt(request.query.limit);
        returnObj.skip = parseInt(request.query.skip);
        if (!!request.query.website) returnObj.filters['domain'] = request.query.website;
        if (!!request.query.from || !!request.query.until) {
            returnObj.filters['createdAt'] = {};
            if (!!request.query.from) returnObj.filters['createdAt']['$gte'] = request.query.from;
            if (!!request.query.until) returnObj.filters['createdAt']['$lte'] = request.query.until;
        }

        return returnObj;
    }
}
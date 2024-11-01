import Request from '../models/requestModel';
import { getNextSequenceValue } from './idCounterController';
// save request
// get all request
// search filter including all types in one endpoint
// send the state of all filters which are initially 'all' / values when changed
// get all full names of customers/requestId to list in a datalist

const dateFilter = (date) => {
    const filteredDate = {};
    const now = new Date();

    switch (date) {
        case 'new-to-old':
            filteredDate.sortedDate = { date: -1 };
            break;
        case 'old-to-new':
            filteredDate.sortedDate = { date: 1 };
            break;
        case 'this-week':
            const startWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            const endWeek = new Date(now.setDate(startWeek.getDate() + 7));
            filteredDate.date = { $gte: startWeek, $lt: endWeek };
            break;
        case 'this-month':
            const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            filteredDate.date = { $gte: startMonth, $lt: endMonth };
            break;
        case 'this-year':
            const startYear = new Date(now.getFullYear(), 0, 1);
            const endYear = new Date(now.getFullYear() + 1, 0, 1);
            filteredDate.date = { $gte: startYear, $lt: endYear };
            break;
        default:
            break;
    }
}

export const saveRequest = async (req, res) => {
    const { fullName, companyName, email, mobileNumber, message, gemId } = req.body;

    try {
        let requestId = await getNextSequenceValue('request');
        const id = 'REQ-' + requestId;
        const request = await Request.save({ requestId: id, fullName: fullName, companyName: companyName, email: email, mobileNumber: mobileNumber, message: message, gemstoneId: gemId })

        if (!request) res.status(404).json({ message: 'Could Not Save Request, Please Try Again!' });
        res.status(200).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getRequest = async (req, res) => {
    const { date, responded } = req.body;
    let filter = {};

    if (date !== 'all') {
        filteredDate = dateFilter(date);
        filter.date = filteredDate.date;
    };
    responded !== 'all' && (filter.responded = responded);

    try {
        const requests = await Request.find(filter).sort(filteredDate.sortedDate ? filteredDate.sortedDate : {});

        if (!requests) res.status(404).json({ message: 'Could Not Find Any Requests!' });
        res.status(200).json({ requests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};


export const getSpecificRequest = async (req, res) => {
    const { reqId, name, gemId } = req.body;
    let filter = {};

    try {
        gemId !== '' && (filter.gemstoneId = { $in: [gemId] });
        reqId !== '' && (filter.requestId = reqId);
        name !== '' && (filter.fullName = name);

        const request = await Request.find(filter);

        if (!request) res.status(404).json({ message: 'Could Not Find A Request :(' });
        res.status(200).json({ request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}
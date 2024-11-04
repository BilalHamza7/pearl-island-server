import { Request } from '../models/requestModel.js';
import { getNextSequenceValue } from './idCounterController.js';
import { dateFilter } from './dateFilter.js';

// save request
// get all request
// search filter including all types in one endpoint
// send the state of all filters which are initially 'all' / values when changed
// get all full names of customers/requestId to list in a datalist

export const saveRequest = async (req, res) => {
    const { fullName, companyName, email, mobileNumber, message, gemId } = req.body;
    const date = new Date();

    try {
        let requestId = await getNextSequenceValue('request');
        const id = 'REQ-' + requestId;
        const newRequest = new Request({ requestId: id, fullName: fullName, companyName: companyName, email: email, mobileNumber: mobileNumber, message: message, gemstoneId: gemId, date: date, responded: false });
        const request = await newRequest.save();

        if (!request) {
            return res.status(200).json({ request });
        } else {
            return res.status(404).json({ message: 'Could Not Save Request, Please Try Again!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getRequests = async (req, res) => {
    const { date, responded } = req.body;
    let filter = {};

    if (date !== 'all') {
        filteredDate = await dateFilter(date);
        filter.date = filteredDate.date;
    };
    responded !== 'all' && (filter.responded = responded);

    try {
        const requests = await Request.find(filter).sort(filteredDate.sortedDate ? filteredDate.sortedDate : {});

        if (requests.length > 0) {
            return res.status(200).json({ requests });
        } else {
            return res.status(404).json({ message: 'Could Not Find Any Requests!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
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

        if (!request) {
            return res.status(200).json({ request });
        } else {
            return res.status(404).json({ message: 'Could Not Find A Request!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getLatestRequests = async (req, res) => {
    try {
        const requests = await Request.find().limit(5);

        if (requests.length > 0) {
            return res.status(200).json({ requests });
        } else {
            return res.status(404).json({ message: 'Could Not Find Any Requests!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const updateRequest = async (req, res) => {
    const id = req.params.id;
    const responded = req.body.responded;

    try {
        const request = Request.findOneAndUpdate({ requestId: id }, { $set: { responded: responded } }, { new: true });

        if (!request) {
            return res.status(200).json({ request });
        } else {
            return res.status(404).json({ message: 'Could Not Update Request!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}
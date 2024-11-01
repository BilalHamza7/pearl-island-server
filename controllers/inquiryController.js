import Inquiry from '../models/inquiryModel';
import { getNextSequenceValue } from './idCounterController';
// save inquiry
// get all Inquiries
// search filter including all types in one endpoint
// send the state of all filters which are initially 'all' / values when changed
// get all full names of customers/inquiryId to list in a datalist

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

export const saveInquiry = async (req, res) => {
    const { fullName, companyName, email, mobileNumber, message } = req.body;

    try {
        let inquiryId = getNextSequenceValue('inquiry');
        const id = 'INQ-' + inquiryId;
        const inquiry = await Inquiry.save({ inquiryId: id, fullName: fullName, companyName: companyName, email: email, mobileNumber: mobileNumber, message: message })

        if (!inquiry) res.status(404).json({ message: 'Could Not Save Inquiry, Please Try Again!' });
        res.status(200).json(inquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getInquiry = async (req, res) => {
    const { subject, date, responded } = req.body;
    let filter = {};

    subject !== 'all' && (filter.subject = subject);
    if (date !== 'all') {
        filteredDate = dateFilter(date);
        filter.date = filteredDate.date;
    };
    responded !== 'all' && (filter.responded = responded);

    try {
        const inquirys = await Inquiry.find(filter).sort(filteredDate.sortedDate ? filteredDate.sortedDate : {});

        if (!inquirys) res.status(404).json({ message: 'Could Not Find Any Inquiries!' });
        res.status(200).json({ inquirys });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};


export const getInquiryByIdAndName = async (req, res) => {
    const { id, name } = req.body;

    try {
        const inquiry = await Inquiry.find(id !== '' && { inquiryId: id } + name !== '' && { fullName: name });

        if (!inquiry) res.status(404).json({ message: 'Could Not Find An Inquiry with the ID: ' + id });
        res.status(200).json({ inquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}
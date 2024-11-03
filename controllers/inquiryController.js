import { Inquiry } from '../models/inquiryModel.js';
import { getNextSequenceValue } from './idCounterController.js';
import { dateFilter } from './dateFilter.js';
// save inquiry
// get all Inquiries
// search filter including all types in one endpoint
// send the state of all filters which are initially 'all' / values when changed
// get all full names of customers/inquiryId to list in a datalist

export const saveInquiry = async (req, res) => {
    const { fullName, subject, companyName, email, mobileNumber, message } = req.body;
    const date = new Date();

    try {
        let inquiryId = await getNextSequenceValue('inquiry');
        const id = 'INQ-' + inquiryId;
        const newInquiry = new Inquiry({ inquiryId: id, fullName: fullName, subject: subject, companyName: companyName, email: email, mobileNumber: mobileNumber, message: message, date: date, responded: false })
        const inquiry = await newInquiry.save();
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

        if (!inquiry) res.status(404).json({ message: 'Could Not Find An Inquiry :(' });
        res.status(200).json({ inquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const getLatestInquiry = async (req, res) => {
    try {
        const inquirys = await Inquiry.find().limit(5);

        if (!inquirys) res.status(404).json({ message: 'Could Not Find Any Inquiries!' });
        res.status(200).json({ inquirys });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};

export const updateInquiry = async (req, res) => {
    const id = req.params.id;
    const responded = req.body.responded;

    try {
        const inquiry = Inquiry.findOneAndUpdate({ inquiryId: id }, { $set: { responded: responded } }, { new: true });

        if (!inquiry) res.status(404).json({ message: 'Could Not Update Inquiry :(' });
        res.status(200).json({ inquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}
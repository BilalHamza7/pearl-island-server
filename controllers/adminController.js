import Admin from '../models/adminModel';
import bcrypt from 'bcrypt';
import { getNextSequenceValue } from './idCounterController';

{/**
    functions

    - log in using email and password.
    - when resetting password, first the email is verified and then the password is updated after verifying OTP.
    - update the details of the admin like the fullname, username, and email.
    - destroy the session when the user logs out.
    - get the details of the admin through the session
*/}

const hashPassword = async (newPassword) => { //for create admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return hashedPassword;
}

const verifyPassword = async (enteredPassword, hashedPassword) => {  // for login
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
}

export const getAdminDetails = async (req, res) => {
    try {
        const sessionAdmin = req.session;
        if(!sessionAdmin){
            res.status(500).json({ message: 'No Data In The Session!' });
        }
        res.status(200).json({ sessionAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const createAdmin = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        const id = getNextSequenceValue('admin');
        const hashedPassword = hashPassword(password);
        const admin = await Admin.save({
            adminId: id,
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword,
        });

        if (admin) {
            console.log(admin);
            res.status(200).json({ message: 'Admin Saved Successfully!', admin });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const verifyAdmin = async (req, res) => {  // for log in
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });  // verify Email
        if (!admin) {
            res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
        }

        const hashedPassword = admin.password;
        const isMatch = verifyPassword(password, hashedPassword); // verify entered Password
        if (!isMatch) {
            res.status(404).json({ message: 'Incorrect Password, Try Again!' });
        }

        //if login successful save credentials in the session 
        req.session = { fullName: admin.fullName, email: admin.email, username: admin.username };
        req.session.save();

        res.status(200).json({ message: 'Admin Found!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

export const searchAdmin = async (req, res) => { // before resetting password
    const email = req.body;
    try {
        const admin = await Admin.findOne({ email });  // Searching for account
        if (!admin) {
            res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
        }

        res.status(200).json(admin.email);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

export const updatePassword = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = hashPassword(password);
    try {
        const admin = await Admin.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        if (!admin) {
            res.status(404).json({ message: 'Could Not Update Password, Please Try Again!' });
        }

        res.status(200).json({ message: 'Password Updated Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const updateAdmin = async (req, res) => { // only admin details
    try {
        const admin = await Admin.findOneAndUpdate(
            { adminId: req.params.id },
            {
                fullname: req.body.fullName,
                username: req.body.username,
                email: req.body.email
            },
            { new: true }
        );
        if (admin) {
            res.status(200).json(admin);
        }
        else {
            res.status(404).json({ message: 'Admin Not Found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const logOut = (req, res) => { // destroy session when logging out
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: 'Could Not Log Out, Try Again Later.' });
        }
        res.status(200).json({ message: 'You have Been Logged Out.' });
    })
}
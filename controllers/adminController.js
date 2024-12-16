import { Admin } from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import { getNextSequenceValue } from './idCounterController.js';

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
        // Fetch admin _id from the session
        const adminId = req.session.admin.adminId;

        const admin = await Admin.findOne({ _id: adminId }).select('adminId fullName username email');

        if (admin) {
            return res.status(200).json({ admin });
        }

        return res.status(404).json({ message: 'Admin not found.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const createAdmin = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        let adminId = await getNextSequenceValue('admin');
        const id = 'ADMIN-' + adminId;
        const hashedPassword = await hashPassword(password);
        const newAdmin = new Admin({
            adminId: id,
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword,
        });

        const admin = await newAdmin.save();

        if (admin) {
            console.log(admin);
            res.status(200).json({ message: 'Admin Saved Successfully!', adminId: admin.adminId });
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
        if (admin) {
            const isMatch = await verifyPassword(password, admin.password); // verify entered Password
            if (isMatch) {
                req.session.admin = { adminId: admin.adminId };
                return res.status(200).json({ message: 'Admin Found!', adminId: admin.adminId, session: true });
            }
            return res.status(404).json({ message: 'Incorrect Password, Try Again!' });
        }   
        return res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

export const searchAdmin = async (req, res) => { // before resetting password
    const { email } = req.query;
    try {
        const admin = await Admin.findOne({ email });  // Searching for account

        if (admin) {
            res.status(200).json({ username: admin.username });
        } else {
            res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
}

export const updatePassword = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    try {
        const admin = await Admin.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        if (admin) {
            res.status(200).json({ message: 'Password Updated Successfully!' });
        } else {
            res.status(404).json({ message: 'Could Not Update Password, Please Try Again!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const updateAdmin = async (req, res) => { // only admin details
    const { adminId, fullName, username, email } = req.body;
    try {
        const admin = await Admin.findOneAndUpdate(
            { adminId: adminId },
            {
                fullName: fullName,
                username: username,
                email: email
            },
            { new: true }
        );
        if (admin) {
            res.status(200).json(admin.adminId);
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
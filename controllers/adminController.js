import Admin from '../models/adminModel';
import bcrypt from 'bcrypt';

const hashPassword = async (newPassword) => { //for create admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return hashedPassword;
}

const verifyPassword = async (enteredPassword, hashedPassword) => {  // for login
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
}

export const createAdmin = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        const hashedPassword = hashPassword(password);
        const admin = await Admin.save({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword,
        })
        if (admin) {
            res.status(200).json({ message: 'Admin Saved Successfully!', admin })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const verifyAdmin = async (req, res) => {  // for log in
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });  // verify Email or Username
        if (!admin) {
            res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
        }

        const hashedPassword = admin.password;
        const isMatch = verifyPassword(password, hashedPassword); // verify entered Password
        if (!isMatch) {
            res.status(404).json({ message: 'Incorrect Password, Try Again!' });
        }

        //if login successful save credentials in the session 
        req.session.fullName = admin.fullName;
        req.session.email = admin.email;
        req.session.username = admin.username;

        res.status(200).json({
            message: 'Admin Found!',
            session: {
                fullName: req.session.fullName,
                email: req.session.email,
                username: req.session.username
            }
        });
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

// update password
export const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });  // verify Email
        if (!admin) {
            res.status(404).json({ message: 'Please Check Your Email And Try Again!' });
        }

        const hashPassword = admin.password;
        const isMatch = verifyPassword(password, hashPassword);
        if (!isMatch) {
            res.status(404).json({ message: 'Incorrect Password, Try Again!' });
        }



    } catch (error) {
        console.error(error);
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
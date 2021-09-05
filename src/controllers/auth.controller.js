import User from '../models/User';
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async(req, res) => {
    try {

        const { username, email, password, roles } = req.body;

        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        });

        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        console.log(savedUser);

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400,
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const signIn = async(req, res) => {
    res.json('signin')
};
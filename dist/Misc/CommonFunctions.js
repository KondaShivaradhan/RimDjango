"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckID = exports.validate = void 0;
function validate(req, res, next) {
    var params = req.body;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const parsedDate = new Date(params.date);
    if (!params.name.match(/^[a-zA-Z\s]+$/) || params.name.length == 0 || params.age <= 0 || params.date.length == 0 || Date.parse(params.date) < 0 || !params.date.match(dateRegex) || isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid details!' });
    }
    const inputDate = new Date(params.date);
    const today = new Date();
    if (inputDate >= today) {
        return res.status(400).json({ message: 'Invalid Date!' });
    }
    else {
        next();
    }
}
exports.validate = validate;
function CheckID(req, res, next) {
    const { id } = req.body;
    if (!id || typeof id !== 'number') {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    else {
        next();
    }
}
exports.CheckID = CheckID;

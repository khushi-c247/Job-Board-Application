"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobsController = exports.updateJobsController = exports.addJobsController = void 0;
const addOpeningsServices_1 = require("../Services/addOpeningsServices");
const addJobsController = (req, res) => {
    const saved = (0, addOpeningsServices_1.addjobOpeninigs)(req.body);
    return res.send(`Job saved`);
};
exports.addJobsController = addJobsController;
const updateJobsController = (req, res) => {
    const id = req.params.id;
    const updated = (0, addOpeningsServices_1.updateJob)(req.body, id);
    return res.send(`Job updated`);
};
exports.updateJobsController = updateJobsController;
const deleteJobsController = (req, res) => {
    const id = req.params.id;
    const deleted = (0, addOpeningsServices_1.deleteJob)(id);
    return res.send(`Job updated`);
};
exports.deleteJobsController = deleteJobsController;

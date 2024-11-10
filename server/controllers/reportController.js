const reportModel = require('../models/reportModel');

exports.getStats = async (req, res) => {
    try {
        const ticketsToday = await reportModel.getTicketsToday();
        const totalTickets = await reportModel.getTotalTickets();
        const resolvedTickets = await reportModel.getResolvedTickets();
        const pendingTickets = await reportModel.getPendingTickets();

        res.json({
            ticketsToday,
            totalTickets,
            resolvedTickets,
            pendingTickets,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Error fetching stats' });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await reportModel.getAllReports();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
};

exports.createReport = async (req, res) => {
    const { name, status } = req.body;
    try {
        const newReport = await reportModel.createReport(name, status);
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
};

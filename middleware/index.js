// validate data is submitted for name and location
function validateFields(req, res, next) {
    const { name, location } = req.body;
    if (!name || !location) {
        return res.status(400).json({ error: "name and location are required" });
    }
    next();
}

// validate queried name exists
function validateExists(req, res, next) {
    const { name } = req.query;

    if (!rosterDB.some((student) => student.name === name)) {
        return res.status(400).json({ error: "name not found in roster" });
    }

    next();
}

module.exports = { validateFields, validateExists };

exports.allAccess = (req, res) => {
    res.status(200).send('Welcome! Please Register or Login to start using the App.');
};

exports.userBoard = (req, res) => {
    res.status(200).send('User Content.');
};
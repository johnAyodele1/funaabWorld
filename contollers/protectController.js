exports.protect = (...roles) => {
  async (req, res, next) => {
    if (!req.user) throw new Error("No user provided");
    return next();
  };
};

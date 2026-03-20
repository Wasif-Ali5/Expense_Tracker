import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;           // get token from header

        if (!token) {             // Check if token exists
            return res.status(401).json({
                message: "No token, access denied"   
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);        //  Verify token

        req.user = decoded;        // Save user data in request
        next();        //  Move to controller

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default authMiddleware;
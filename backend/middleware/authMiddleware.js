import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //Check header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "No token, access denied"
            });
        }

        //Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user:", decoded);
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
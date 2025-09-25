import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;
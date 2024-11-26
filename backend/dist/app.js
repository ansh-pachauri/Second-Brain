"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//making the routes
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.z.object({
        userName: zod_1.z.string().min(3).max(20),
        password: zod_1.z.string().min(3).max(20).trim()
    });
    //parsing the body 
    const parseBody = requireBody.safeParse(req.body);
    if (!parseBody.success) {
        res.json({
            message: "Formate is incorrect"
        });
        return;
    }
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        const user = yield db_1.UserModel.create({ userName, password });
        if (user) {
            res.status(200).json({
                message: "User crated succefully"
            });
        }
    }
    catch (e) {
        res.status(411).json({
            message: "User already exist"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        const exist = yield db_1.UserModel.findOne({
            userName,
            password
        });
        if (exist) {
            const token = jsonwebtoken_1.default.sign({
                id: exist._id
            }, config_1.jwtSecret);
            res.json({
                token
            });
            console.log(token);
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            });
        }
    }
    catch (_a) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    try {
        yield db_1.ContentModel.create({
            link,
            type,
            title: req.body.title,
            //@ts-ignore 
            userId: req.user._id,
            tags: []
        });
        res.json({ message: "content created" });
    }
    catch (err) {
        res.json({ message: "Content is not created" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "username"); //for getting the whole data of userId
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted"
    });
}));
app.post("/api/v1/brain/share", (req, res) => {
    const id = req.body.userId;
});
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const content = {
        title: req.query.title,
        links: req.query.links,
        type: req.query.type,
        tags: req.query.tags,
        id: req.query.id
    };
    try {
        const shareLink = yield db_1.LinkModel.create({
            userId: userId,
            content: content
        });
    }
    catch (_a) {
        res.json({ message: "Link is not created" });
    }
}));
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

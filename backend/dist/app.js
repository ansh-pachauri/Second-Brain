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
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const random_1 = require("./random");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//making the routes
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.z.object({
        userName: zod_1.z.string().min(3).max(20),
        password: zod_1.z.string().min(3).max(20).trim()
    });
    console.log(req.body);
    //parsing the body 
    const parseBody = requireBody.safeParse(req.body);
    console.log(parseBody);
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
// userMiddleware,
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore    
        userId: req.userId,
        tags: []
    });
    res.json({ message: "content created" });
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
app.delete("/api/v1/content/:contentId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    yield db_1.ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingShareLink = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingShareLink) {
            res.json({
                hash: existingShareLink.hash
            });
            return;
        }
        const hash = (0, random_1.random)(10);
        yield db_1.LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({ hash });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({ message: "share link deleted" });
    }
}));
app.get("/api/v1/brain/:shareLink", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.json({
            message: "link not found incorrest input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        userName: user.userName,
        content: content
    });
}));
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

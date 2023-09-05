"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import JobModel from "./JobModel";
const UserModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    experience: {
        type: Number,
        require: true,
    },
    discription: {
        type: String,
        require: true,
    },
    graduationYear: {
        type: Number,
        require: true,
    },
    appliedTo: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Job",
    },
    role: {
        type: String,
        enum: ["admin", "normal"],
        default: "normal",
    },
    token: {
        type: String,
    }
});
//while creating user it will bcrypt password
UserModel.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next;
    });
});
//Update bcrypt password
UserModel.pre(["findOneAndUpdate"], function (next) {
    let update = Object.assign({}, this.getUpdate());
    // console.log(update);
    if (update.password) {
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
            }
            bcryptjs_1.default.hash(update.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                update.password = hash;
                this.setUpdate(update);
                next();
            });
        });
    }
    else {
        next();
    }
});
UserModel.methods.checkPassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
UserModel.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = mongoose_1.default.model("User", UserModel);

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.cronList = void 0;
var path_1 = __importDefault(require("path"));
var file_time_stamp_1 = require("../helpers/file-time-stamp");
var helpers_1 = require("@gluestack/helpers");
function cronList(program, glueStackPlugin) {
    program
        .command("cron:list")
        .description("List all Crons")
        .action(function () { return list(glueStackPlugin); });
}
exports.cronList = cronList;
function list(_glueStackPlugin) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var cronsFilePath, head, rows, dataFilePath, fileData, _d, fileData_1, fileData_1_1, data, run, e_1_1, lastModified;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    cronsFilePath = "./backend/crons/crons.json";
                    head = [
                        "Schedule",
                        "Run",
                    ];
                    rows = [];
                    return [4, (0, helpers_1.fileExists)(cronsFilePath)];
                case 1:
                    if (!(_f.sent())) {
                        console.log("> Error: cron file missing!");
                        process.exit(0);
                    }
                    dataFilePath = path_1.default.join(process.cwd(), cronsFilePath.slice(2));
                    fileData = require(dataFilePath);
                    if (fileData.length <= 0) {
                        console.log("> Error: Cron.json file's empty! Please add one and try again.\n> You can add cron using \"node glue cron:add\" command.");
                        process.exit(0);
                    }
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 13]);
                    _d = true, fileData_1 = __asyncValues(fileData);
                    _f.label = 3;
                case 3: return [4, fileData_1.next()];
                case 4:
                    if (!(fileData_1_1 = _f.sent(), _a = fileData_1_1.done, !_a)) return [3, 6];
                    _c = fileData_1_1.value;
                    _d = false;
                    try {
                        data = _c;
                        run = data.type === 'function' ? "function() [".concat(data.value, "]") : "webhook-url [".concat(data.value, "]");
                        rows.push((_e = {}, _e[data.schedule] = [run], _e));
                    }
                    finally {
                        _d = true;
                    }
                    _f.label = 5;
                case 5: return [3, 3];
                case 6: return [3, 13];
                case 7:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 13];
                case 8:
                    _f.trys.push([8, , 11, 12]);
                    if (!(!_d && !_a && (_b = fileData_1.return))) return [3, 10];
                    return [4, _b.call(fileData_1)];
                case 9:
                    _f.sent();
                    _f.label = 10;
                case 10: return [3, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7];
                case 12: return [7];
                case 13:
                    helpers_1.ConsoleTable.print(head, rows);
                    return [4, (0, file_time_stamp_1.timeStamp)(cronsFilePath)];
                case 14:
                    lastModified = _f.sent();
                    console.log("Crons last updated: ".concat(lastModified));
                    return [2];
            }
        });
    });
}
exports.list = list;
//# sourceMappingURL=cron-list.js.map
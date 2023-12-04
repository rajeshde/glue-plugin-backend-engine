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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueStackPlugin = void 0;
var package_json_1 = __importDefault(require("../package.json"));
var PluginInstance_1 = require("./PluginInstance");
var commands_1 = require("./commands");
var helpers_1 = require("@gluestack/helpers");
var write_env_1 = require("./helpers/write-env");
var service_add_1 = require("./commands/service-add");
var rewrite_file_1 = require("./helpers/rewrite-file");
var add_main_cron_1 = require("./helpers/add-main-cron");
var add_main_events_1 = require("./helpers/add-main-events");
var GlueStackPlugin = (function () {
    function GlueStackPlugin(app, gluePluginStore) {
        this.type = "stateless";
        this.app = app;
        this.instances = [];
        this.gluePluginStore = gluePluginStore;
    }
    GlueStackPlugin.prototype.init = function () {
        var _this = this;
        this.app.addCommand(function (program) { return (0, service_add_1.serviceAdd)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.eventAdd)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.eventList)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.eventRemove)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.cronAdd)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.cronList)(program, _this); });
        this.app.addCommand(function (program) { return (0, commands_1.cronRemove)(program, _this); });
    };
    GlueStackPlugin.prototype.destroy = function () {
    };
    GlueStackPlugin.prototype.getName = function () {
        return package_json_1.default.name;
    };
    GlueStackPlugin.prototype.getVersion = function () {
        return package_json_1.default.version;
    };
    GlueStackPlugin.prototype.getType = function () {
        return this.type;
    };
    GlueStackPlugin.prototype.getTemplateFolderPath = function () {
        return "".concat(process.cwd(), "/node_modules/").concat(this.getName(), "/template");
    };
    GlueStackPlugin.prototype.getInstallationPath = function (target) {
        return "./backend/".concat(target);
    };
    GlueStackPlugin.prototype.runPostInstall = function (instanceName, target) {
        return __awaiter(this, void 0, void 0, function () {
            var engineInstance, pluginPackage, rootPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.checkAlreadyInstalled()];
                    case 1:
                        _a.sent();
                        if (instanceName !== "engine") {
                            console.log("\x1b[36m");
                            console.log("Install engine instance: `node glue add backend-engine engine`");
                            console.log("\x1b[31m");
                            throw new Error("engine supports instance name `engine` only");
                        }
                        return [4, this.app.createPluginInstance(this, instanceName, this.getTemplateFolderPath(), target)];
                    case 2:
                        engineInstance = _a.sent();
                        if (!engineInstance) return [3, 8];
                        return [4, (0, write_env_1.writeEnv)(engineInstance)];
                    case 3:
                        _a.sent();
                        return [4, (0, add_main_events_1.addMainEvents)(engineInstance)];
                    case 4:
                        _a.sent();
                        return [4, (0, add_main_cron_1.addMainCron)(engineInstance)];
                    case 5:
                        _a.sent();
                        pluginPackage = "".concat(engineInstance.getInstallationPath(), "/package.json");
                        return [4, (0, rewrite_file_1.reWriteFile)(pluginPackage, instanceName, 'INSTANCENAME')];
                    case 6:
                        _a.sent();
                        rootPackage = "".concat(process.cwd(), "/package.json");
                        return [4, helpers_1.Workspaces.append(rootPackage, engineInstance.getInstallationPath())];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    GlueStackPlugin.prototype.checkAlreadyInstalled = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var enginePlugin;
            return __generator(this, function (_b) {
                enginePlugin = this.app.getPluginByName("@gluestack/glue-plugin-backend-engine");
                if ((_a = enginePlugin === null || enginePlugin === void 0 ? void 0 : enginePlugin.getInstances()) === null || _a === void 0 ? void 0 : _a[0]) {
                    throw new Error("engine instance already installed as ".concat(enginePlugin
                        .getInstances()[0]
                        .getName()));
                }
                return [2];
            });
        });
    };
    GlueStackPlugin.prototype.createInstance = function (key, gluePluginStore, installationPath) {
        var instance = new PluginInstance_1.PluginInstance(this.app, this, key, gluePluginStore, installationPath);
        this.instances.push(instance);
        return instance;
    };
    GlueStackPlugin.prototype.getInstances = function () {
        return this.instances;
    };
    return GlueStackPlugin;
}());
exports.GlueStackPlugin = GlueStackPlugin;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGlueService = void 0;
var isValidGlueService = function (backendPlugins, name) {
    var validPlugins = [];
    backendPlugins.forEach(function (_plugin) {
        if (_plugin === name) {
            validPlugins.push(name);
        }
        if (_plugin.includes('*')) {
            var _name = '@gluestack/glue-plugin-service-';
            if (name && name.startsWith(_name)) {
                validPlugins.push(name);
            }
        }
    });
    return validPlugins;
};
exports.isValidGlueService = isValidGlueService;
//# sourceMappingURL=valid-service.js.map
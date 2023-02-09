"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daprServices = exports.noDockerfiles = exports.backendPlugins = void 0;
exports.backendPlugins = [
    '@gluestack/glue-plugin-postgres',
    '@gluestack/glue-plugin-graphql',
    '@gluestack/glue-plugin-backend-engine',
    '@gluestack/glue-plugin-auth',
    '@gluestack/glue-plugin-storage',
    '@gluestack/glue-plugin-service-*'
];
exports.noDockerfiles = [
    '@gluestack/glue-plugin-graphql',
    '@gluestack/glue-plugin-postgres'
];
exports.daprServices = [
    '@gluestack/glue-plugin-backend-engine',
    '@gluestack/glue-plugin-auth',
    '@gluestack/glue-plugin-storage',
    '@gluestack/glue-plugin-service-*'
];
//# sourceMappingURL=constants.js.map
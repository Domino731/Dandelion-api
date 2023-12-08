"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('v1');
    app.enableCors();
    await app.listen(constants_1.appConstants.port);
    console.log(`[bootstrap] server is running on port: ${constants_1.appConstants.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
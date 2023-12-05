"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
exports.JWT_KEY = '12312312';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map
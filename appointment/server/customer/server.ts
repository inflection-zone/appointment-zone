import dotenv from 'dotenv';
dotenv.config();

import { GrpcApplication } from "../index.grpc";

(async () => {
    const app = GrpcApplication.instance();
    await app.start();
})();





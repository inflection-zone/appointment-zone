import dotenv from 'dotenv';
dotenv.config();

import { GrpcApplication } from "../grpc.app";

(async () => {
    const app = GrpcApplication.instance();
    await app.start();
})();





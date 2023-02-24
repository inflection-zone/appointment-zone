import express from "express";
import { Logger } from "../common/logger";
import { register as registerCustomerRoutes}  from "../api/customer/customer.routes";
import { register as registerBusinessRoutes}  from "../api/business/business.routes";
import { register as registerApiClientRoutes}  from "../api/api.client/api.client.routes";
import { register as registerBusinessNodesRoutes } from "../api/business.nodes/business.nodes.routes";
import { register as registerUserRoleRoutes } from "../api/user.role/user.role.routes";
import { register as registerFileREsourceRoutes       } from "../api/file.resource/file.resource.routes";
import { register as registerTypesRoutes} from "../api/types/types.routes";
import { register as registerUserRoutes } from "../api/user/user.routes";


////////////////////////////////////////////////////////////////////////////////////

export class Router {

    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message : `Appointment Service API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerCustomerRoutes(this._app);
                registerBusinessRoutes(this._app);
                registerApiClientRoutes(this._app);
                registerBusinessNodesRoutes(this._app)
                registerUserRoleRoutes(this._app);
                registerFileREsourceRoutes(this._app);
                registerTypesRoutes(this._app);
                registerUserRoutes(this._app);

                

                resolve(true);

            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };

}

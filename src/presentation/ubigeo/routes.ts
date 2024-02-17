import { Router } from "express";
import { UbigeoController } from "./controller";

export class UbigeoRoutes {
    static get routes(): Router{
        const router = Router();

        const ubigeoController = new UbigeoController();

        router.get('/departments', ubigeoController.getDepartments );
        router.get('/department/:id', ubigeoController.getDepartmentById );

        router.get('/provinces', ubigeoController.getProvinces );
        router.get('/province/:id', ubigeoController.getProvinceById );

        router.get('/districts', ubigeoController.getDistricts );
        router.get('/district/:id', ubigeoController.getDistrictById );

        return router;
    }
}

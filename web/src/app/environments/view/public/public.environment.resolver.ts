import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Environment } from '../../../../models/environment.model';
import { EnvironmentService } from '../../../../services/environment.service';

@Injectable({
    providedIn: 'root'
})
export class PublicEnvironmentResolver implements Resolve<Environment> {

    constructor(private environmentService: EnvironmentService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Environment> {
        return this.environmentService
            .findPublicById(route.params.id);
    }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MainComponent } from './main.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { EnvironmentsAddComponent } from './environments/add/environments-add.component';
import { EnvironmentsListPublicComponent } from './environments/list/public/environments-list-public.component';
import { EnvironmentsListPrivateComponent } from './environments/list/private/environments-list-private.component';
import { EnvironmentsViewPublicComponent } from './environments/view/public/environments-view-public.component';
import { EnvironmentsViewPrivateComponent } from './environments/view/private/environments-view-private.component';
import { PublicEnvironmentsResolver } from './environments/list/public/public.environments.resolver';
import { PrivateEnvironmentResolver } from './environments/view/private/private.environment.resolver';
import { PublicEnvironmentResolver } from './environments/view/public/public.environment.resolver';
import { PrivateEnvironmentsResolver } from './environments/list/private/private.environments.resolver';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: EnvironmentsListPublicComponent,
                resolve: { environments: PublicEnvironmentsResolver }
            },
            {
                path: 'callback',
                pathMatch: 'full',
                component: CallbackComponent,
            },
            {
                path: 'environments',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'list',
                        pathMatch: 'full',
                        component: EnvironmentsListPrivateComponent,
                        resolve: { environments: PrivateEnvironmentsResolver },
                    },
                    {
                        path: 'add',
                        pathMatch: 'full',
                        component: EnvironmentsAddComponent,
                    },
                    {
                        path: ':id',
                        pathMatch: 'full',
                        component: EnvironmentsViewPrivateComponent,
                        resolve: { environment: PrivateEnvironmentResolver },
                    }
                ]
            },
            {
                path: 'environments/:id/view',
                pathMatch: 'full',
                component: EnvironmentsViewPublicComponent,
                resolve: { environment: PublicEnvironmentResolver },
            },
            { path: '**', redirectTo: '/' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {
}

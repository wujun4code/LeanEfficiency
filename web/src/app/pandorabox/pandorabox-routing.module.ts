import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './auth/login/login.component';
import { PandoraBoxComponent } from './pandorabox.component'

const routes: Routes = [
    {
        path: 'pandorabox',
        component: PandoraBoxComponent,
        children: [
            {
                path: 'login',
                component: LogInComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class PandoraBoxRoutingModule { }

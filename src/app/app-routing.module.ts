import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'weather', loadChildren: () => import('./weather/weather.module').then(x => x.WeatherModule) },
  { path: '', pathMatch: 'full', redirectTo: 'weather' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  { path: '', redirectTo: 'Pinterest', pathMatch: 'full' },
  { path: 'Pinterest', component: HomeComponent, title: 'Pinterest' },
  { path: 'Create', component: CreateComponent, title: 'Create' },
  { path: '**', redirectTo: 'Pinterest', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

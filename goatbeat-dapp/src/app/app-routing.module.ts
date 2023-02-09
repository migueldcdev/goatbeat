import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExploreComponent } from './explore/explore.component';
import { CreatorsComponent } from './creators/creators.component';
import { DocsComponent } from './docs/docs.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path:'', component:MainComponent },
  { path:'explore', component:ExploreComponent},
  { path:'creators', component:CreatorsComponent},
  { path:'docs', component:DocsComponent },
  { path:'explore/:address', component:DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

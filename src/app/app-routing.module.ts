import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'converter',
    loadChildren: () => import('./pages/converter/converter.module').then( m => m.ConverterPageModule)
  },
  {
    path: 'graph',
    loadChildren: () => import('./pages/graph/graph.module').then( m => m.GraphPageModule)
  },
  {
    path: 'my-coins',
    loadChildren: () => import('./pages/my-coins/my-coins.module').then( m => m.MyCoinsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

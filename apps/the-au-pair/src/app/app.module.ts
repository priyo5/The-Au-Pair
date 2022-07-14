import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(), 
    ShellModule, 
    HttpClientModule, 
    NavbarModule,
    NgxsModule.forRoot([
      
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { CardComponent } from 'src/app/components/reusable/card/card.component';
import { NavComponent } from 'src/app/components/reusable/nav/nav.component';
import { DropdownComponent } from 'src/app/components/reusable/dropdown/dropdown.component';
import { InputComponent } from 'src/app/components/reusable/input/input.component';
import { FormsModule } from '@angular/forms';
import { ProgressComponent } from 'src/app/components/reusable/progress/progress.component';
import { ButtonComponent } from 'src/app/components/reusable/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'button';

@NgModule({
  declarations: [
    OnboardingComponent,
    CardComponent,
    DropdownComponent,
    NavComponent,
    InputComponent,
    ProgressComponent,

    ButtonComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    OnboardingRoutingModule,
  ],
})
export class OnboardingModule {}

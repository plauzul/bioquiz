import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultQuestions } from './result-questions';

@NgModule({
  declarations: [
    ResultQuestions,
  ],
  imports: [
    IonicPageModule.forChild(ResultQuestions),
  ],
  exports: [
    ResultQuestions
  ]
})
export class ResultQuestionsModule {}

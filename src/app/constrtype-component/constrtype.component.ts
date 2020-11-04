import { Component, OnInit } from '@angular/core';
import { SelectTemplate } from '../actions/actions';
import { CommonComponent } from '../common/common.component';
import { Template } from '../interfaces/simple-json';

@Component({
  selector: 'app-constrtype',
  templateUrl: './constrtype.component.html',
  styleUrls: ['./constrtype.component.scss']
})
export class ConstrtypeComponent extends CommonComponent {
  title = 'Тип конструкции';
  comment = 'выберите тип контсрукции';

  changeTemplate(idx: Template) {
    this.stateProvider.process(new SelectTemplate(idx));
  }
}

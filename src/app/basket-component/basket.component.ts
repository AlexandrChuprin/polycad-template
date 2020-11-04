import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-basket-component',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends CommonComponent {
  title = 'Корзина';
  comment = 'ваш заказ';
}

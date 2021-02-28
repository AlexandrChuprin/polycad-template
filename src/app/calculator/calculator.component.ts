import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { KeyUpService } from '../keyup-service';
import { filter } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  @Input()
  initialValue = 0;

  @Output()
  calcAction = new EventEmitter<number>();
  firstNumberInput = true;
  keyUpServiceSubscription: Subscription;
  state: ICalcState;
  buttons = ['=', 'C', '<', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.'];
  order: any;

  get firstValue() {
    // console.log(`firstValue: ${this.state.firstValue}`);
    return this.round(this.state.firstValue);
  }
  get secondValue() {
    // console.log(`secondValue: ${this.state.secondValue}`);
    return this.round(this.state.secondValue);
  }
  get operator() {
    // console.log(`operator: ${this.state.operator}`);
    return this.state.operator;
  }

  constructor(public keyUpService: KeyUpService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.state = {
      firstValue: this.initialValue,
      secondValue: 0,
      order: 0,
      frac: 0,
      operator: '',
      visible: true,
    };

    this.keyUpServiceSubscription = this.keyUpService.lastKey
    .pipe(
      filter(_ => _ != null)
    )
    .subscribe((lastKey: string) => {
      this.useKey(lastKey);
    });
  }


  ngOnDestroy() {
    if (this.keyUpServiceSubscription) {
      this.keyUpServiceSubscription.unsubscribe();
      this.keyUpService.lastKey = new BehaviorSubject<string>(null);
    }
  }

  round(value: number) {
    return value.toFixed(1);
  }

  useKey(lastKey: string) {
    if (lastKey === 'Enter') {
      lastKey = 'ok';
    }
    if (lastKey === 'Escape') {
      lastKey = 'C';
    }
    if (lastKey === 'Backspace') {
      lastKey = '<';
    }
    if (this.buttons.indexOf(lastKey) > -1 || lastKey === 'ok') {
      const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const ops = ['/', '*', '-', '+', 'ok', '.', 'C', '<'];
      if (ops.indexOf(lastKey) > -1) {
        this.buttonPressed(lastKey);
      } else if (numbers.indexOf(lastKey) > -1) {
        if (this.firstNumberInput) {
          this.firstNumberInput = false;
          this.reset();
        }
        this.addNumber(lastKey);
      }
    }
  }

  setState(updateFn: Function) {
    if (updateFn) {
      const newState = updateFn.call(this, {});
      if (newState) {
        this.state = Object.assign(this.state, newState);
      }
      if (this.state.visible) {
        this.ref.detectChanges();
      }
    }
  }

  onCalc() {
    if (this.calcAction && this.state.firstValue > 10) {
      this.calcAction.emit(this.state.firstValue);
    }
  }

  changeResult() {
    if (!this.state.firstValue) { return; }
    if (!this.state.operator) { return; }
    if (!this.state.secondValue) { return; }
    let res = 0;
    switch (this.state.operator) {
      case '/': res = +this.state.firstValue / +this.state.secondValue; break;
      case '*': res = +this.state.firstValue * +this.state.secondValue; break;
      case '-': res = +this.state.firstValue - +this.state.secondValue; break;
      case '+': res = +this.state.firstValue + +this.state.secondValue; break;
    }
    this.setState(() => {
      return {
        firstValue: res,
        order: 0,
        secondValue: 0,
        operator: '',
      };
    });
  }

  addNumber(num: string) {
    let res = this.state.order ? this.state.secondValue : this.state.firstValue;
    if (this.state.frac) {
      if (res.toString().includes('.')) {
        res = +(res + num);
      } else {
        res = +(res + '.' + num);
      }
    } else {
      res = +(res + num);
    }

    if (this.state.order) {
      this.setState(() => {
        return {
          secondValue: res,
        };
      });
    } else {
      this.setState(() => {
        return {
          firstValue: res,
        };
      });
    }
  }

  addOperator(op: string) {
    if (this.state.order) {
      this.changeResult();
    }
    this.setState(() => {
      return {
        order: 1,
        operator: op,
      };
    });
  }

  reset() {
    this.setState(() => {
      return {
        firstValue: 0,
        secondValue: 0,
        order: 0,
        frac: 0,
        operator: '',
      };
    });
  }

  remLast() {
    let res = this.state.order ? this.state.secondValue.toString() : this.state.firstValue.toString();
    if (res.length > 0) {
      res = res.substring(0, res.length - 1);
    } else {
      res = '0';
    }
    if (res[res.length - 1] === '.') {
      this.setState(() => {
        return {
          frac: 0,
        };
      });
    }
    if (this.state.order) {
      this.setState(() => ({ secondValue: +res }));
    } else {
      this.setState(() => ({ firstValue: +res }));
    }
  }

  buttonPressed(button) {
    const btn = button.toLowerCase();
    switch (btn) {
      case '=': this.changeResult(); break;
      case 'c': this.reset(); break;
      case '<': this.remLast(); break;
      case '/': this.addOperator(btn); break;
      case '*': this.addOperator(btn); break;
      case '-': this.addOperator(btn); break;
      case '+': this.addOperator(btn); break;
      case '+/-':
        if (this.order) {
          this.setState((prevState) => ({ secondValue: -1 * prevState.secondValue }));
        } else {
          this.setState((prevState) => ({ firstValue: -1 * prevState.firstValue }));
        }
        break;
      case '.': this.setState(() => ({ frac: 1 })); break;
      case 'ok': this.changeResult(); this.onCalc(); this.hide(); return;
      default: this.addNumber(btn); break;
    }
  }

  hide() {
    this.setState(() =>  {
        visible: false
      }
    );
  }

  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log(event);
    }

  }
}

interface ICalcState {
  firstValue: number;
  secondValue: number;
  order: number;
  frac: number;
  operator: string;
  visible: boolean;
}

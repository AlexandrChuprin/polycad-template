import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KeyUpService {
    public lastKey: BehaviorSubject<string> = new BehaviorSubject<string>(null);
}

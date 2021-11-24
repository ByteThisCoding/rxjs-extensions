import { BehaviorSubject, of } from "rxjs";
import { switchMap, take, filter } from "rxjs/operators";
import { ByteThisAbstractSubject } from "../abstract-subject";
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
export class ByteThisBehaviorSubject extends ByteThisAbstractSubject {
    constructor() {
        super(...arguments);
        this.initializer = null;
    }
    get value() {
        return this.subject.value;
    }
    nextIfVoid(observableInit) {
        this.initializer = observableInit;
        return this.identity();
    }
    clear() {
        this.subject.next(void 0);
        return this.identity();
    }
    createSubject() {
        return new BehaviorSubject(void 0);
    }
    pipeRequired(obs) {
        return obs.pipe(switchMap((value) => {
            if (this.initializer && typeof value === 'undefined') {
                this.initializer().pipe(take(1)).subscribe((initializerValue) => {
                    this.next(initializerValue);
                });
                return of(void 0);
            }
            else {
                return of(value);
            }
        }), filter((value) => typeof value !== 'undefined'));
    }
}

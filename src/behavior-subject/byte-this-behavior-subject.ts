import { BehaviorSubject, Observable, of } from "rxjs";
import { filter, switchMap, take } from "rxjs/Operators";
import { ByteThisAbstractSubject } from "../abstract-subject";
import { iByteThisAbstractSubject, iByteThisBehaviorSubject } from "../models/byte-this-subject";

/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
 export class ByteThisBehaviorSubject<T> extends ByteThisAbstractSubject<T, BehaviorSubject<T>, ByteThisBehaviorSubject<T>> implements iByteThisBehaviorSubject<T> {

    private initializer: (() => Observable<T>) | null = null;

    get value(): T | void {
        return this.subject.value;
    }

    nextIfVoid(observableInit: () => Observable<T>): iByteThisBehaviorSubject<T> {
        this.initializer = observableInit;
        return this.identity();
    }

    clear(): ByteThisBehaviorSubject<T> {
        this.subject.next(void 0 as any);
        return this.identity();
    }

    protected createSubject(): BehaviorSubject<T> {
        return new BehaviorSubject<T | void>(void 0) as BehaviorSubject<T>;
    }

    protected pipeRequired(obs: Observable<T>): Observable<T> {
        return obs.pipe(switchMap((value: T) => {
            if (this.initializer && typeof value === 'undefined') {
                this.initializer().pipe(take(1)).subscribe((initializerValue: T) => {
                    this.next(initializerValue);
                });
                return of(void 0) as unknown as Observable<T>;
            } else {
                return of(value);
            }
        }), filter((value: T) => typeof value !== 'undefined'));
    }
    
}
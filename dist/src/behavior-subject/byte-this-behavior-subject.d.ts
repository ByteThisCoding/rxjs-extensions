import { BehaviorSubject, Observable } from "rxjs";
import { ByteThisAbstractSubject } from "../abstract-subject";
import { iByteThisBehaviorSubject } from "../models/byte-this-subject";
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
export declare class ByteThisBehaviorSubject<T> extends ByteThisAbstractSubject<T, BehaviorSubject<T>, ByteThisBehaviorSubject<T>> implements iByteThisBehaviorSubject<T> {
    private initializer;
    get value(): T | void;
    nextIfVoid(observableInit: () => Observable<T>): iByteThisBehaviorSubject<T>;
    clear(): ByteThisBehaviorSubject<T>;
    protected createSubject(): BehaviorSubject<T>;
    protected pipeRequired(obs: Observable<T>): Observable<T>;
}

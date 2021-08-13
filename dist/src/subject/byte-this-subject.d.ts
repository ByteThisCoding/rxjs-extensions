import { Subject } from "rxjs";
import { ByteThisAbstractSubject } from "../abstract-subject";
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
export declare class ByteThisSubject<T> extends ByteThisAbstractSubject<T, Subject<T>, ByteThisSubject<T>> {
    protected createSubject(): Subject<T>;
}

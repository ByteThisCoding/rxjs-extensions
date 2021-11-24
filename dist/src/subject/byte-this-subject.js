import { Subject } from "rxjs";
import { ByteThisAbstractSubject } from "../abstract-subject";
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
export class ByteThisSubject extends ByteThisAbstractSubject {
    createSubject() {
        return new Subject();
    }
}

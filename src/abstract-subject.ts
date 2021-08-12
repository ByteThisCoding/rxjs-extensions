import { Observable, Subscription } from "rxjs";
import { iByteThisAbstractSubject, iPartialSubject } from "./models/byte-this-subject";

/**
 * This abstract class will provide the core functionality for subjects
 * The subclasses will provide Subject-specific behaviors
 */
export abstract class ByteThisAbstractSubject<DataType, SubjectType extends iPartialSubject<DataType>, ContainerType> implements iByteThisAbstractSubject<DataType, SubjectType, ContainerType> {

    //inner subject to be used for operations
    private subject: SubjectType;

    //keep track of registered reactions
    private reactions: {[key: string]: Subscription} = {};

    constructor() {
        this.subject = this.createSubject();
    }

    hasReaction(keyName: string): boolean {
        return !!this.reactions[keyName];
    }

    setReaction(keyName: string, observable: Observable<DataType>): ContainerType {
        this.stopReaction(keyName);

        this.reactions[keyName] = observable.subscribe(value => this.subject.next(value));

        return this.identity();
    }
    
    stopReaction(keyName: string): ContainerType {
        if (this.hasReaction(keyName)) {
            this.reactions[keyName].unsubscribe();
            delete this.reactions[keyName];
        }
        return this.identity();
    }
    
    stopAllReactions(): ContainerType {
        Object.keys(this.reactions).forEach(key => {
            this.stopReaction(key);
        });
        return this.identity();
    }
    
    asSubject(): SubjectType {
        return this.subject;
    }

    asObservable(): Observable<DataType> {
        return this.subject.asObservable();
    }

    protected identity(): ContainerType {
        return this as unknown as ContainerType;
    }

    protected abstract createSubject(): SubjectType;

}
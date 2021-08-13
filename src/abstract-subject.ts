import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/Operators";
import { iByteThisAbstractSubject, iPartialSubject } from "./models/byte-this-subject";
import { v4 as uuidV4 } from "uuid";

/**
 * This abstract class will provide the core functionality for subjects
 * The subclasses will provide Subject-specific behaviors
 */
export abstract class ByteThisAbstractSubject<DataType, SubjectType extends iPartialSubject<DataType>, ContainerType> implements iByteThisAbstractSubject<DataType, ContainerType> {

    //inner subject to be used for operations
    protected subject: SubjectType;

    //keep track of registered reactions
    private reactions: { [key: string]: Subscription } = {};

    constructor() {
        this.subject = this.createSubject();
    }

    hasReaction(keyName: string): boolean {
        return !!this.reactions[keyName];
    }

    setReaction(keyName: string | null, observable: Observable<DataType>): ContainerType {
        if (keyName === null) {
            keyName = uuidV4();
        }

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

    /**
     * Send a new piece of data
     * @param data 
     */
    next(data: DataType): ContainerType {
        this.subject.next(data);
        return this.identity();
    }

    /**
     * Send a piece of data from a promise
     * @param data 
     */
    nextFromPromise(data: Promise<DataType>): ContainerType {
        data.then(value => this.next(value));
        return this.identity();
    }

    /**
     * Send a piece of data from the first emit value of an observable
     * For more than one emit, use "setReaction"
     * @param data 
     */
    nextFromObservableFirstEmit(data: Observable<DataType>): ContainerType {
        data.pipe(take(1)).subscribe(value => this.next(value));
        return this.identity();
    }

    /**
     * Mark the subject as complete
     */
    complete(): ContainerType {
        this.stopAllReactions();
        this.subject.complete();
        return this.identity();
    }

    subscribe(callback: (data: DataType) => any): Subscription {
        return this.asObservable().subscribe(callback);
    }

    asObservable(): Observable<DataType> {
        return this.subject.asObservable().pipe(this.pipeRequired.bind(this));
    }

    protected identity(): ContainerType {
        return this as unknown as ContainerType;
    }

    /**
     * If any special processing needs to happen, do so here
     * Subclass can override if needed
     * @param obs 
     * @returns 
     */
    protected pipeRequired(obs: Observable<DataType>): Observable<DataType> {
        return obs;
    }

    protected abstract createSubject(): SubjectType;

}
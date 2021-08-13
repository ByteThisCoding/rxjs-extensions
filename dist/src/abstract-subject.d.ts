import { Observable, Subscription } from "rxjs";
import { iByteThisAbstractSubject, iPartialSubject } from "./models/byte-this-subject";
/**
 * This abstract class will provide the core functionality for subjects
 * The subclasses will provide Subject-specific behaviors
 */
export declare abstract class ByteThisAbstractSubject<DataType, SubjectType extends iPartialSubject<DataType>, ContainerType> implements iByteThisAbstractSubject<DataType, ContainerType> {
    protected subject: SubjectType;
    private reactions;
    constructor();
    hasReaction(keyName: string): boolean;
    setReaction(keyName: string | null, observable: Observable<DataType>): ContainerType;
    stopReaction(keyName: string): ContainerType;
    stopAllReactions(): ContainerType;
    /**
     * Send a new piece of data
     * @param data
     */
    next(data: DataType): ContainerType;
    /**
     * Send a piece of data from a promise
     * @param data
     */
    nextFromPromise(data: Promise<DataType>): ContainerType;
    /**
     * Send a piece of data from the first emit value of an observable
     * For more than one emit, use "setReaction"
     * @param data
     */
    nextFromObservableFirstEmit(data: Observable<DataType>): ContainerType;
    /**
     * Mark the subject as complete
     */
    complete(): ContainerType;
    subscribe(callback: (data: DataType) => any): Subscription;
    asObservable(): Observable<DataType>;
    protected identity(): ContainerType;
    /**
     * If any special processing needs to happen, do so here
     * Subclass can override if needed
     * @param obs
     * @returns
     */
    protected pipeRequired(obs: Observable<DataType>): Observable<DataType>;
    protected abstract createSubject(): SubjectType;
}

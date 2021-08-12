import { BehaviorSubject, Observable, Subject } from "rxjs";

/**
 * Utility type, encapsulates the properties of an rxjs subject which are needed by this library
 */
export interface iPartialSubject<T> {
    
    next(value: T): void;
    
    asObservable(): Observable<T>;

    subscribe(callback: (data: T) => any): void;
    
}

/**
 * A utility type to be used internally
 * Certain methods are chainable
 */
export interface iByteThisAbstractSubject<DataType, SubjectType extends iPartialSubject<DataType>, ContainerType> {

    /**
     * A "reaction" is a behavior: the subject will emit a value in reaction to a particular observable's emit
     * @param keyName : an identifier for the reaction (so we can manage it in the future)
     * @param observable : observable in which to react to
     */
    setReaction(keyName: string, observable: Observable<DataType>): ContainerType;

    /**
     * Stop a particular reaction if it exists, do nothing otherwise
     * @param keyName : identifier used for the initial reaction
     */
    stopReaction(keyName: string): ContainerType;

    /**
     * Clear all registered reactions
     */
    stopAllReactions(): ContainerType;

    /**
     * Check if a particular reaction has been set
     * @param keyName : identifier used for the initial reaction
     */
    hasReaction(keyName: string): boolean;

    /**
     * Subscribe to the end result 
     * @param callback 
     */
    subscribe(callback: (data: DataType) => any): void;

    /**
     * Get the inner subject
     */
    asSubject(): SubjectType;

    /**
     * Get the observable
     */
    asObservable(): Observable<DataType>;

}

/**
 * Wrap a Subject with additional functionality
 * Provides methods to get the wrapped Subject/Observable
 */
export interface iByteThisSubject<T> extends iByteThisAbstractSubject<T, Subject<T>, iByteThisSubject<T>> {}

/**
 * Wrap a Behavior Subject with additional functionality
 * Provides methods to get the wrapped Subject/Observable
 */
export interface iByteThisBehaviorSubject<T> extends iByteThisAbstractSubject<T, BehaviorSubject<T>, iByteThisBehaviorSubject<T>> {

    /**
     * Initialize the value of a behavior subject using an asynchronous callback
     * Useful when we want to lazily load some resource, for example
     * @param observableInit : function to invoke if the initial value has not yet been initialized
     */
    lazilyInitializeWith(observableInit: () => Observable<T>): iByteThisBehaviorSubject<T>;

}
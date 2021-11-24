import { v4 as uuidV4 } from "uuid";
import { take } from "rxjs/operators";
/**
 * This abstract class will provide the core functionality for subjects
 * The subclasses will provide Subject-specific behaviors
 */
export class ByteThisAbstractSubject {
    constructor() {
        //keep track of registered reactions
        this.reactions = {};
        this.subject = this.createSubject();
    }
    hasReaction(keyName) {
        return !!this.reactions[keyName];
    }
    setReaction(keyName, observable) {
        if (keyName === null) {
            keyName = uuidV4();
        }
        this.stopReaction(keyName);
        this.reactions[keyName] = observable.subscribe(value => this.subject.next(value));
        return this.identity();
    }
    stopReaction(keyName) {
        if (this.hasReaction(keyName)) {
            this.reactions[keyName].unsubscribe();
            delete this.reactions[keyName];
        }
        return this.identity();
    }
    stopAllReactions() {
        Object.keys(this.reactions).forEach(key => {
            this.stopReaction(key);
        });
        return this.identity();
    }
    /**
     * Send a new piece of data
     * @param data
     */
    next(data) {
        this.subject.next(data);
        return this.identity();
    }
    /**
     * Send a piece of data from a promise
     * @param data
     */
    nextFromPromise(data) {
        data.then(value => this.next(value));
        return this.identity();
    }
    /**
     * Send a piece of data from the first emit value of an observable
     * For more than one emit, use "setReaction"
     * @param data
     */
    nextFromObservableFirstEmit(data) {
        data.pipe(take(1)).subscribe(value => this.next(value));
        return this.identity();
    }
    /**
     * Mark the subject as complete
     */
    complete() {
        this.stopAllReactions();
        this.subject.complete();
        return this.identity();
    }
    subscribe(callback) {
        return this.asObservable().subscribe(callback);
    }
    asObservable() {
        return this.subject.asObservable().pipe(this.pipeRequired.bind(this));
    }
    identity() {
        return this;
    }
    /**
     * If any special processing needs to happen, do so here
     * Subclass can override if needed
     * @param obs
     * @returns
     */
    pipeRequired(obs) {
        return obs;
    }
}

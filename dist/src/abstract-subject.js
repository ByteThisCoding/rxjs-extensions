"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteThisAbstractSubject = void 0;
var uuid_1 = require("uuid");
var take_1 = require("rxjs/internal/operators/take");
/**
 * This abstract class will provide the core functionality for subjects
 * The subclasses will provide Subject-specific behaviors
 */
var ByteThisAbstractSubject = /** @class */ (function () {
    function ByteThisAbstractSubject() {
        //keep track of registered reactions
        this.reactions = {};
        this.subject = this.createSubject();
    }
    ByteThisAbstractSubject.prototype.hasReaction = function (keyName) {
        return !!this.reactions[keyName];
    };
    ByteThisAbstractSubject.prototype.setReaction = function (keyName, observable) {
        var _this = this;
        if (keyName === null) {
            keyName = uuid_1.v4();
        }
        this.stopReaction(keyName);
        this.reactions[keyName] = observable.subscribe(function (value) { return _this.subject.next(value); });
        return this.identity();
    };
    ByteThisAbstractSubject.prototype.stopReaction = function (keyName) {
        if (this.hasReaction(keyName)) {
            this.reactions[keyName].unsubscribe();
            delete this.reactions[keyName];
        }
        return this.identity();
    };
    ByteThisAbstractSubject.prototype.stopAllReactions = function () {
        var _this = this;
        Object.keys(this.reactions).forEach(function (key) {
            _this.stopReaction(key);
        });
        return this.identity();
    };
    /**
     * Send a new piece of data
     * @param data
     */
    ByteThisAbstractSubject.prototype.next = function (data) {
        this.subject.next(data);
        return this.identity();
    };
    /**
     * Send a piece of data from a promise
     * @param data
     */
    ByteThisAbstractSubject.prototype.nextFromPromise = function (data) {
        var _this = this;
        data.then(function (value) { return _this.next(value); });
        return this.identity();
    };
    /**
     * Send a piece of data from the first emit value of an observable
     * For more than one emit, use "setReaction"
     * @param data
     */
    ByteThisAbstractSubject.prototype.nextFromObservableFirstEmit = function (data) {
        var _this = this;
        data.pipe(take_1.take(1)).subscribe(function (value) { return _this.next(value); });
        return this.identity();
    };
    /**
     * Mark the subject as complete
     */
    ByteThisAbstractSubject.prototype.complete = function () {
        this.stopAllReactions();
        this.subject.complete();
        return this.identity();
    };
    ByteThisAbstractSubject.prototype.subscribe = function (callback) {
        return this.asObservable().subscribe(callback);
    };
    ByteThisAbstractSubject.prototype.asObservable = function () {
        return this.subject.asObservable().pipe(this.pipeRequired.bind(this));
    };
    ByteThisAbstractSubject.prototype.identity = function () {
        return this;
    };
    /**
     * If any special processing needs to happen, do so here
     * Subclass can override if needed
     * @param obs
     * @returns
     */
    ByteThisAbstractSubject.prototype.pipeRequired = function (obs) {
        return obs;
    };
    return ByteThisAbstractSubject;
}());
exports.ByteThisAbstractSubject = ByteThisAbstractSubject;

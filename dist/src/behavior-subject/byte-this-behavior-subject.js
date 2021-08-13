"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteThisBehaviorSubject = void 0;
var rxjs_1 = require("rxjs");
var Operators_1 = require("rxjs/Operators");
var abstract_subject_1 = require("../abstract-subject");
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
var ByteThisBehaviorSubject = /** @class */ (function (_super) {
    __extends(ByteThisBehaviorSubject, _super);
    function ByteThisBehaviorSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initializer = null;
        return _this;
    }
    Object.defineProperty(ByteThisBehaviorSubject.prototype, "value", {
        get: function () {
            return this.subject.value;
        },
        enumerable: false,
        configurable: true
    });
    ByteThisBehaviorSubject.prototype.nextIfVoid = function (observableInit) {
        this.initializer = observableInit;
        return this.identity();
    };
    ByteThisBehaviorSubject.prototype.clear = function () {
        this.subject.next(void 0);
        return this.identity();
    };
    ByteThisBehaviorSubject.prototype.createSubject = function () {
        return new rxjs_1.BehaviorSubject(void 0);
    };
    ByteThisBehaviorSubject.prototype.pipeRequired = function (obs) {
        var _this = this;
        return obs.pipe(Operators_1.switchMap(function (value) {
            if (_this.initializer && typeof value === 'undefined') {
                _this.initializer().pipe(Operators_1.take(1)).subscribe(function (initializerValue) {
                    _this.next(initializerValue);
                });
                return rxjs_1.of(void 0);
            }
            else {
                return rxjs_1.of(value);
            }
        }), Operators_1.filter(function (value) { return typeof value !== 'undefined'; }));
    };
    return ByteThisBehaviorSubject;
}(abstract_subject_1.ByteThisAbstractSubject));
exports.ByteThisBehaviorSubject = ByteThisBehaviorSubject;

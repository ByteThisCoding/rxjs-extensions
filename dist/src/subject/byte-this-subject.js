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
exports.ByteThisSubject = void 0;
var rxjs_1 = require("rxjs");
var abstract_subject_1 = require("../abstract-subject");
/**
 * ByteThis Subject instantiation which exibits RxJs Subject behaviors
 */
var ByteThisSubject = /** @class */ (function (_super) {
    __extends(ByteThisSubject, _super);
    function ByteThisSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ByteThisSubject.prototype.createSubject = function () {
        return new rxjs_1.Subject();
    };
    return ByteThisSubject;
}(abstract_subject_1.ByteThisAbstractSubject));
exports.ByteThisSubject = ByteThisSubject;

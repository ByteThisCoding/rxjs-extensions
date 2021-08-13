"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var byte_this_subject_1 = require("./byte-this-subject");
describe("ByteThisSubject", function () {
    it("should call next and trigger subscriptions", function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var testValues, curTest, subject;
        return __generator(this, function (_a) {
            testValues = [17, 12, 11, 15, 18, 564654, -1];
            curTest = 0;
            subject = new byte_this_subject_1.ByteThisSubject();
            subject.subscribe(function (value) {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });
            testValues.forEach(function (tv) { return subject.next(tv); });
            return [2 /*return*/];
        });
    }); }, 100);
    it("should react to another observable and update itself", function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var testValues, curTest, subjectToReactTo;
        return __generator(this, function (_a) {
            testValues = [17, 12, 11, 15, 18, 564654, -1];
            curTest = 0;
            subjectToReactTo = new byte_this_subject_1.ByteThisSubject();
            new byte_this_subject_1.ByteThisSubject()
                .setReaction(null, subjectToReactTo.asObservable())
                .subscribe(function (value) {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });
            testValues.forEach(function (tv) { return subjectToReactTo.next(tv); });
            return [2 /*return*/];
        });
    }); }, 100);
    it("should react to multiple observables and update itself", function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var testValues, curTest, subjectToReactToA, subjectToReactToB;
        return __generator(this, function (_a) {
            testValues = [17, 12, 11, 15, 18, 564654, -1];
            curTest = 0;
            subjectToReactToA = new byte_this_subject_1.ByteThisSubject();
            subjectToReactToB = new byte_this_subject_1.ByteThisSubject();
            new byte_this_subject_1.ByteThisSubject()
                .setReaction(null, subjectToReactToA.asObservable())
                .setReaction(null, subjectToReactToB.asObservable())
                .subscribe(function (value) {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });
            testValues.forEach(function (tv, index) {
                if (index % 2 === 0) {
                    subjectToReactToA.next(tv);
                }
                else {
                    subjectToReactToB.next(tv);
                }
            });
            return [2 /*return*/];
        });
    }); }, 100);
    it("should stop reacting if stop is called", function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var testValues, curTest, numToTest, subjectToReactTo, testSubject;
        return __generator(this, function (_a) {
            testValues = [17, 12, 11, 15, 18, 564654, -1];
            curTest = 0;
            numToTest = testValues.length - 2;
            subjectToReactTo = new byte_this_subject_1.ByteThisSubject();
            testSubject = new byte_this_subject_1.ByteThisSubject()
                .setReaction("t", subjectToReactTo.asObservable());
            testSubject.subscribe(function (value) {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === numToTest) {
                    fail("Stop reaction did not work");
                }
            });
            testValues.forEach(function (value, index) {
                if (index === numToTest - 1) {
                    testSubject.stopReaction("t");
                }
                subjectToReactTo.next(value);
            });
            done();
            return [2 /*return*/];
        });
    }); }, 100);
    it("should stop reacting to all if stop all is called", function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var testValues, curTest, numToTest, subjectToReactToA, subjectToReactToB, testSubject;
        return __generator(this, function (_a) {
            testValues = [17, 12, 11, 15, 18, 564654, -1];
            curTest = 0;
            numToTest = testValues.length - 4;
            subjectToReactToA = new byte_this_subject_1.ByteThisSubject();
            subjectToReactToB = new byte_this_subject_1.ByteThisSubject();
            testSubject = new byte_this_subject_1.ByteThisSubject()
                .setReaction(null, subjectToReactToA.asObservable())
                .setReaction(null, subjectToReactToB.asObservable());
            testSubject
                .subscribe(function (value) {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === numToTest) {
                    fail("Stop reaction did not work");
                }
            });
            testValues.forEach(function (tv, index) {
                if (index === numToTest - 1) {
                    testSubject.stopAllReactions();
                }
                if (index % 2 === 0) {
                    subjectToReactToA.next(tv);
                }
                else {
                    subjectToReactToB.next(tv);
                }
            });
            testSubject.complete();
            done();
            return [2 /*return*/];
        });
    }); }, 100);
});

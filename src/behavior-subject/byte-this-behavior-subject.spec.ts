import { BehaviorSubject, of } from "rxjs";
import { ByteThisBehaviorSubject } from "./byte-this-behavior-subject";

describe("ByteThisBehaviorSubject", () => {

    it("should call next and trigger subscriptions", async (done) => {

        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;

        const subject = new ByteThisBehaviorSubject();

        subject.subscribe((value) => {
            expect(value).toBe(testValues[curTest]);
            curTest++;
            if (curTest === testValues.length) {
                done();
            }
        });

        testValues.forEach(tv => subject.next(tv));

    }, 100);

    it("should react to another observable and update itself", async (done) => {
        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;

        const subjectToReactTo = new ByteThisBehaviorSubject();

        const subject = new ByteThisBehaviorSubject()
            .setReaction(null, subjectToReactTo.asObservable());

        subject
            .subscribe((value) => {
                expect(value).toBe(testValues[curTest]);
                expect(subject.value).toBe(value);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });

        testValues.forEach(tv => subjectToReactTo.next(tv));

    }, 100);

    it("should set nextIfVoid to initialize subject's value", async (done) => {

        const testValue = 123456;
        const initializer = () => of(testValue);

        new ByteThisBehaviorSubject()
            .nextIfVoid(initializer)
            .subscribe((value) => {
                expect(value).toBe(testValue);
                done();
            });

    }, 100);

});
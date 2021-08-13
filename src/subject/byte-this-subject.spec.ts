import { ByteThisSubject } from "./byte-this-subject";

describe("ByteThisSubject", () => {


    it("should call next and trigger subscriptions", async (done) => {

        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;

        const subject = new ByteThisSubject();

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

        const subjectToReactTo = new ByteThisSubject();

        new ByteThisSubject()
            .setReaction(null, subjectToReactTo.asObservable())
            .subscribe((value) => {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });

        testValues.forEach(tv => subjectToReactTo.next(tv));

    }, 100);

    it("should react to multiple observables and update itself", async (done) => {
        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;

        const subjectToReactToA = new ByteThisSubject();
        const subjectToReactToB = new ByteThisSubject();

        new ByteThisSubject()
            .setReaction(null, subjectToReactToA.asObservable())
            .setReaction(null, subjectToReactToB.asObservable())
            .subscribe((value) => {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === testValues.length) {
                    done();
                }
            });

        testValues.forEach((tv, index) => {
            if (index % 2 === 0) {
                subjectToReactToA.next(tv);
            } else {
                subjectToReactToB.next(tv);
            }
        });
    }, 100);


    it("should stop reacting if stop is called", async (done) => {

        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;
        const numToTest = testValues.length - 2;

        const subjectToReactTo = new ByteThisSubject();

        const testSubject = new ByteThisSubject()
            .setReaction("t", subjectToReactTo.asObservable());

        testSubject.subscribe((value) => {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === numToTest) {
                    fail("Stop reaction did not work");
                }
            })

        testValues.forEach((value, index) => {
            if (index === numToTest - 1) {
                testSubject.stopReaction("t");
            }
            subjectToReactTo.next(value);
        });

        done();

    }, 100);

    it("should stop reacting to all if stop all is called", async (done) => {
        const testValues = [17, 12, 11, 15, 18, 564654, -1];
        let curTest = 0;
        const numToTest = testValues.length - 4;

        const subjectToReactToA = new ByteThisSubject();
        const subjectToReactToB = new ByteThisSubject();

        const testSubject = new ByteThisSubject()
            .setReaction(null, subjectToReactToA.asObservable())
            .setReaction(null, subjectToReactToB.asObservable());

        testSubject
            .subscribe((value) => {
                expect(value).toBe(testValues[curTest]);
                curTest++;
                if (curTest === numToTest) {
                    fail("Stop reaction did not work");
                }
            });

        testValues.forEach((tv, index) => {
            if (index === numToTest - 1) {
                testSubject.stopAllReactions();
            }

            if (index % 2 === 0) {
                subjectToReactToA.next(tv);
            } else {
                subjectToReactToB.next(tv);
            }
        });

        testSubject.complete();
        done();
    }, 100);

});
import { Work } from "./types";

export async function getWorkList() {
    const response = await fetch(process.env.REACT_APP_API_URL!);
    const body = (await response.json()) as unknown;
    assertIsWorkList(body);
    return body;
}

export function assertIsWorkList(workList: unknown): asserts workList is Work[] {
    if (!Array.isArray(workList)) {
      throw new Error("Works isn't an array");
    }
    if (workList.length === 0) {
      return;
    }
    workList.forEach((work) => {
        if (!('id' in work)) {
            throw new Error("work doesn't contain id");
        }
        if (typeof work.id !== 'string') {
            throw new Error('id is not a string');
        }
        if (!('title' in work)) {
            throw new Error("work doesn't contain title");
        }
        if (typeof work.title !== 'string') {
            throw new Error('title is not a string');
        }
        if (!('objectName' in work)) {
            throw new Error("work doesn't contain objectName");
        }
        if (typeof work.objectName !== 'string') {
            throw new Error('objectName is not a string');
        }
        if (!('workingDate' in work)) {
            throw new Error("work doesn't contain workingDate");
        }
        if (typeof work.workingDate !== 'string') {
            throw new Error('Working date is not a string');
        }
        if (!('sumFact' in work)) {
            throw new Error("work doesn't contain sumFact");
        }
        if (typeof work.sumFact !== 'number') {
            throw new Error('sumFact is not a number');
        }
        if (!('sumPlan' in work)) {
            throw new Error("work doesn't contain sumPlan");
        }
        if (typeof work.sumPlan !== 'number') {
            throw new Error('sumPlan is not a number');
        }
    });
}
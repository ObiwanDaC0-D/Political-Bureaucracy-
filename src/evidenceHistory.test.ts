import {describe,it,expect} from "vitest";
import {evidence,history,validateEvidence} from "./evidenceHistory";
describe("research evidence and historical timeline",()=>{
it("has unique evidence and event IDs",()=>expect(validateEvidence()).toBe(true));
it("does not mislabel source leads as verified claims",()=>expect(evidence.every(e=>e.status!=="claim-verified"||Boolean(e.reviewedOn))).toBe(true));
it("includes dated, source-linked institutional milestones",()=>expect(history.every(h=>Number.isInteger(h.year)&&h.sourceUrl.startsWith("https://"))).toBe(true));
it("sorts historical milestones without treating them as complete snapshots",()=>expect([...history].sort((a,b)=>a.year-b.year).map(h=>h.year)).toEqual(history.map(h=>h.year)));
});

import {describe,it,expect} from "vitest";
import {researchLibrary,studyQuestions,validateResearch} from "./researchLibrary";
import {tracePaths} from "./AuthorityPaths";
import {getHierarchy} from "./OrganizationGraph";
describe("research and learning",()=>{
it("validates references and answers",()=>expect(validateResearch()).toBe(true));
it("includes CAP and federal budgeting",()=>{expect(researchLibrary.some(r=>r.id==="cap")).toBe(true);expect(researchLibrary.some(r=>r.id==="omb")).toBe(true)});
it("provides explanatory feedback for every question",()=>expect(studyQuestions.every(q=>q.explanation.length>10)).toBe(true));
});
describe("institutional exploration",()=>{
it("keeps USACE in hierarchy root",()=>expect(getHierarchy("usace").some(n=>n.id==="usace")).toBe(true));
it("respects empty relationship filter",()=>expect(tracePaths("lrh","usace",[])).toEqual([]));
it("does not invent path to self",()=>expect(tracePaths("lrh","lrh",["administrative"])).toEqual([]));
});

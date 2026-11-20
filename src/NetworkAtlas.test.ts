import {describe,it,expect} from "vitest";
import {entities,relations} from "./data";
describe("network atlas data",()=>{
it("all directed links have valid endpoints",()=>{const ids=new Set(entities.map(e=>e.id));expect(relations.every(r=>ids.has(r.from)&&ids.has(r.to))).toBe(true)});
it("does not silently reverse stored links",()=>{const edges=relations.filter(r=>r.from==="usace"||r.to==="usace");expect(edges.every(r=>typeof r.from==="string"&&typeof r.to==="string")).toBe(true)});
it("research-needed relationships can be excluded",()=>expect(relations.filter(r=>r.status!=="research-needed").every(r=>r.status==="source-linked")).toBe(true));
});

import {describe,it,expect} from "vitest";
import {entities} from "./data";
import {hierarchyChildren,hierarchyRoots,hierarchySource,traceHierarchy,visibleHierarchy} from "./presidentialHierarchy";
const types=["administrative","civilian-oversight"] as const;
describe("Presidential to Huntington hierarchy",()=>{
it("includes all selectable roots",()=>expect(hierarchyRoots.every(id=>entities.some(e=>e.id===id))).toBe(true));
it("traces the president to Huntington through typed relationships",()=>{
const path=traceHierarchy("president","lrh",[...types]);expect(path).not.toBeNull();expect(path?.[0].from).toBe("president");expect(path?.[path.length-1]?.to).toBe("lrh");expect(path?.every(s=>types.includes(s.relation.type as typeof types[number]))).toBe(true);
});
it("finds the Civil Works oversight route separately",()=>{const path=traceHierarchy("secarmy","lrh",[...types]);expect(path?.some(s=>s.to==="asacw")).toBe(true)});
it("does not fabricate a command-only route",()=>expect(traceHierarchy("president","lrh",["command"])).toBeNull());
it("does not invent a reverse path",()=>expect(traceHierarchy("lrh","president",[...types])).toBeNull());
it("respects expansion state",()=>{const closed=visibleHierarchy("president",new Set(),[...types]);expect(closed.map(r=>r.id)).toEqual(["president"]);const open=visibleHierarchy("president",new Set(["president"]),[...types]);expect(open.length).toBeGreaterThan(1)});
it("marks unverified relationships as optional",()=>{expect(hierarchyChildren("lrh",["administrative"],false).some(s=>s.to==="planning")).toBe(false);expect(hierarchyChildren("lrh",["administrative"],true).some(s=>s.to==="planning")).toBe(true)});
it("provides source leads where available",()=>{const steps=hierarchyChildren("usace",["administrative"]);expect(steps.some(s=>s.to==="lrd"&&hierarchySource(s)?.startsWith("https://"))).toBe(true)});
});

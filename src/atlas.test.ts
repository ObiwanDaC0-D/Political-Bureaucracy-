import {describe,it,expect} from "vitest";
import {getHierarchy} from "./OrganizationGraph";
import {tracePaths} from "./AuthorityPaths";
import {relations,type RelationType} from "./data";
const all:RelationType[]=["administrative","command","civilian-oversight","coordination","statutory","policy"];
describe("organization graph",()=>{
it("shows USACE > LRD > Huntington",()=>{const nodes=getHierarchy("usace");expect(nodes.find(x=>x.id==="lrd")?.depth).toBe(1);expect(nodes.find(x=>x.id==="lrh")?.depth).toBe(2)});
it("excludes research-needed reporting by default",()=>{expect(getHierarchy("lrh").some(x=>x.id==="planning")).toBe(false);expect(getHierarchy("lrh",true).some(x=>x.id==="planning")).toBe(true)});
it("does not treat civilian oversight as an administrative child",()=>expect(getHierarchy("usace").some(x=>x.id==="asacw")).toBe(false));
});
describe("authority path tracer",()=>{
it("finds an institutional connection without claiming an approval chain",()=>expect(tracePaths("lrh","usace",all)[0].length).toBe(2));
it("honors relationship-type filters",()=>expect(tracePaths("lrh","usace",["statutory"]).length).toBe(0));
it("does not expose research-needed links by default",()=>expect(tracePaths("lrh","formulation",all).length).toBe(0));
it("does not include an edge without its endpoints",()=>expect(relations.every(r=>r.from&&r.to)).toBe(true));
});

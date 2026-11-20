import {describe,it,expect} from "vitest";
import {buildNetwork,directedPaths} from "./institutionalGraph";
describe("institutional graph",()=>{
it("preserves recorded direction",()=>{const graph=buildNetwork({focus:"usace",kind:"administrative",includeResearch:false});expect(graph.edges.some(e=>e.from==="usace"&&e.to==="lrd")).toBe(true);expect(graph.edges.some(e=>e.from==="lrd"&&e.to==="usace")).toBe(false)});
it("filters unverified relationships",()=>expect(buildNetwork({focus:"lrh",kind:"all",includeResearch:false}).edges.every(e=>e.status!=="research-needed")).toBe(true));
it("limits nodes without dangling edges",()=>{const g=buildNetwork({focus:"lrd",kind:"all",includeResearch:true,limit:3});expect(g.nodes.length).toBeLessThanOrEqual(3);expect(g.edges.every(e=>g.nodes.some(n=>n.id===e.from)&&g.nodes.some(n=>n.id===e.to))).toBe(true)});
it("finds directed administrative path from USACE to Huntington",()=>expect(directedPaths("usace","lrh",["administrative"]).some(p=>p.length===2&&p[0].to==="lrd"&&p[1].to==="lrh")).toBe(true));
it("does not silently reverse directed paths",()=>expect(directedPaths("lrh","usace",["administrative"])).toEqual([]));
});

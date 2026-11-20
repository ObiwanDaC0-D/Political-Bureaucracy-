import {describe,it,expect} from "vitest";
import {entities,relations} from "./data";
import {getInstitutionProfile,getInstitutionConnections} from "./institutionProfiles";
describe("institution profiles",()=>{
it("returns a profile for every entity",()=>{for(const e of entities){const p=getInstitutionProfile(e.id);expect(p.mission.length).toBeGreaterThan(0);expect(p.scope.length).toBeGreaterThan(0);expect(p.authorityNote.length).toBeGreaterThan(0)}});
it("distinguishes Civil Works oversight from military command",()=>expect(getInstitutionProfile("asacw").authorityNote).toMatch(/not establish.*military command/i));
it("identifies illustrative roles as unverified",()=>expect(getInstitutionProfile("formulation").researchNote).toMatch(/not.*verified|role anchor/i));
it("summarizes actual directed relationships",()=>{const c=getInstitutionConnections("lrh");expect(c.incoming.length).toBe(relations.filter(r=>r.to==="lrh").length);expect(c.outgoing.length).toBe(relations.filter(r=>r.from==="lrh").length)});
it("does not return fabricated records",()=>expect(()=>getInstitutionProfile("not-a-real-id")).toThrow());
});

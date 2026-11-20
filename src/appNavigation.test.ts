import {describe,it,expect} from "vitest";
import {navigationGroups,explorerLevels,visibleInstitution,migratePage} from "./appNavigation";
describe("consolidated institutional explorer navigation",()=>{
it("has unique destinations and one institutional explorer",()=>{const pages=navigationGroups.flatMap(g=>[...g.items]);expect(new Set(pages).size).toBe(pages.length);expect(pages.filter(p=>p==="Institutional Explorer")).toHaveLength(1);expect(pages).not.toContain("Atlas");expect(pages).not.toContain("History")});
it("supports all requested organizational levels",()=>expect(explorerLevels.map(l=>l.value)).toEqual(["all","executive","defense","army","usace","lrd","lrh"]));
it("migrates prior navigation labels without deleting features",()=>{for(const page of ["Overview","Atlas","USACE","Army & DoD","Federal Government"])expect(migratePage(page)).toBe("Institutional Explorer");expect(migratePage("History")).toBe("Institutional Workbench");expect(migratePage("Research")).toBe("Research & Notes")});
it("keeps Secretary of Defense visible in defense",()=>expect(visibleInstitution("secdef","defense")).toBe(true));
it("keeps Huntington District visible in USACE and LRD",()=>{expect(visibleInstitution("lrh","usace")).toBe(true);expect(visibleInstitution("lrh","lrd")).toBe(true)});
it("does not classify Congress as a USACE institution",()=>expect(visibleInstitution("congress","usace")).toBe(false));
});

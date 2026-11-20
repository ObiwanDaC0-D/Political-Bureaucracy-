import {describe,it,expect} from "vitest";
import {navigationGroups,isAtlasView,visibleInstitution} from "./appNavigation";
describe("application navigation and directory",()=>{
it("has unique destinations in coherent groups",()=>{const pages=navigationGroups.flatMap(g=>[...g.items]);expect(new Set(pages).size).toBe(pages.length);expect(pages).toContain("Atlas");expect(pages).toContain("Institutional Workbench")});
it("recognizes only directory-capable views",()=>{expect(isAtlasView("Overview")).toBe(true);expect(isAtlasView("USACE")).toBe(true);expect(isAtlasView("Learning Lab")).toBe(false)});
it("keeps Secretary of Defense visible in federal and defense directories",()=>{expect(visibleInstitution("secdef","Federal Government")).toBe(true);expect(visibleInstitution("secdef","Army & DoD")).toBe(true)});
it("keeps Huntington District visible in USACE",()=>expect(visibleInstitution("lrh","USACE")).toBe(true));
it("does not misclassify Congress as a USACE unit",()=>expect(visibleInstitution("congress","USACE")).toBe(false));
});

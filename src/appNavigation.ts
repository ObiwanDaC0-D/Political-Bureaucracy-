export const navigationGroups=[
{label:"Explore",items:["Overview","Atlas","USACE","Army & DoD","Federal Government"]},
{label:"Understand",items:["Missions & Authorities","Decision Explorer","History","Institutional Workbench"]},
{label:"Study & Save",items:["Learning Lab","Research","My Role"]}
] as const;
export const atlasViews=["Atlas","USACE","Army & DoD","Federal Government","Overview"] as const;
export function isAtlasView(page:string){return (atlasViews as readonly string[]).includes(page)}
export function visibleInstitution(id:string,page:string){
if(page==="USACE")return ["usace","lrd","lrh","planning","formulation","asacw"].includes(id)||id.startsWith("lr");
if(page==="Army & DoD")return ["dod","secdef","army","secarmy","usace","asacw"].includes(id);
if(page==="Federal Government")return ["president","secdef","congress","omb","epa","dhs","fema","dod"].includes(id);
return true;
}

export const navigationGroups=[
{label:"Explore",items:["Institutional Explorer","Missions & Authorities","Decision Explorer"]},
{label:"Research & Learning",items:["Institutional Workbench","Learning Lab","Research & Notes","My Role"]}
] as const;
export const explorerLevels=[
{value:"all",label:"All federal institutions"},
{value:"executive",label:"Executive branch & partners"},
{value:"defense",label:"Department of Defense"},
{value:"army",label:"Department of the Army"},
{value:"usace",label:"USACE"},
{value:"lrd",label:"Great Lakes and Ohio River Division"},
{value:"lrh",label:"Huntington District"}
] as const;
export type ExplorerLevel=typeof explorerLevels[number]["value"];
export type ExplorerMode="hierarchy"|"network"|"directory";
const levelIds:Record<Exclude<ExplorerLevel,"all">,string[]>={
executive:["president","secdef","dod","army","secarmy","asacw","congress","omb","epa","dhs","fema"],
defense:["dod","secdef","army","secarmy","asacw","usace","lrd","lrh"],
army:["army","secarmy","asacw","usace","lrd","lrh"],
usace:["usace","lrd","lrh","asacw","planning","formulation"],
lrd:["lrd","lrh"],
lrh:["lrh","planning","formulation"]
};
export function visibleInstitution(id:string,level:ExplorerLevel){
if(level==="all")return true;
if(level==="usace"||level==="lrd"||level==="lrh")return levelIds[level].includes(id)||(level==="usace"&&id.startsWith("lr"))||(level==="lrd"&&id.startsWith("lr"));
return levelIds[level].includes(id);
}
export function migratePage(page:string):string{
return ["Overview","Atlas","USACE","Army & DoD","Federal Government"].includes(page)?"Institutional Explorer":page==="History"?"Institutional Workbench":page==="Research"?"Research & Notes":page;
}

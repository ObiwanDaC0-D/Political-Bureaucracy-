import type {Entity,Relation} from "./data";
const source="https://www.lrd.usace.army.mil/About/Districts/";
export const phase2Entities:Entity[]=[
{id:"lrb",name:"Buffalo District",acronym:"LRB",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lrc",name:"Chicago District",acronym:"LRC",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lre",name:"Detroit District",acronym:"LRE",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lrl",name:"Louisville District",acronym:"LRL",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lrn",name:"Nashville District",acronym:"LRN",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lrp",name:"Pittsburgh District",acronym:"LRP",category:"USACE district",description:"One of seven districts within Great Lakes and Ohio River Division.",source,status:"source-linked"},
{id:"lrd-commander",name:"Commander, Great Lakes and Ohio River Division",category:"Military leadership position",description:"Division commander position; do not confuse the position with the current officeholder.",source:"https://www.lrd.usace.army.mil/About/Leadership.aspx",status:"source-linked"},
{id:"lrh-commander",name:"Commander, Huntington District",category:"Military leadership position",description:"District commander position; officeholder and tenure require dated source verification.",source:"https://www.lrd.usace.army.mil/About/Leadership.aspx",status:"source-linked"},
{id:"lrh-civilworks",name:"Huntington Civil Works Programs",category:"Mission function",description:"Huntington District delivers flood risk management, navigation and other Civil Works activities. This is a functional grouping, not an asserted branch-level reporting line.",source:"https://www.lrd.usace.army.mil/huntington/",status:"source-linked"},
{id:"lrh-regulatory",name:"Huntington Regulatory Program",category:"Mission function",description:"Regulatory responsibilities under Clean Water Act Section 404 and Rivers and Harbors Act Section 10; this is not an asserted internal supervisory chain.",source:"https://www.lrd.usace.army.mil/Public-Notices/Programs/Article/3647597/regulatory-program-ohio/",status:"source-linked"},
{id:"lrh-emergency",name:"Huntington Emergency Response",category:"Mission function",description:"District emergency response activities; organizational office reporting details require additional research.",source:"https://www.lrd.usace.army.mil/huntington/",status:"source-linked"}
];
const districtIds=["lrb","lrc","lre","lrl","lrn","lrp"];
export const phase2Relations:Relation[]=[
...districtIds.map(id=>({from:"lrd",to:id,type:"administrative" as const,note:"LRD subordinate district, listed on official division website.",status:"source-linked" as const})),
{from:"lrd",to:"lrd-commander",type:"command",note:"Identifies the division commander position, not a claim about individual officeholder tenure.",status:"source-linked"},
{from:"lrh",to:"lrh-commander",type:"command",note:"Identifies the district commander position, not a personnel reporting line.",status:"source-linked"},
...["lrh-civilworks","lrh-regulatory","lrh-emergency"].map(id=>({from:"lrh",to:id,type:"coordination" as const,note:"District mission function; internal supervisory placement not established.",status:"source-linked" as const}))
];
export const phase2SourceInventory=[
{id:"lrd-districts",url:source,scope:"LRD subordinate districts",reviewed:"2026-11-19",verification:"official-source-reviewed"},
{id:"usace-locations",url:"https://www.usace.army.mil/Locations/",scope:"USACE division/district hierarchy",reviewed:"2026-11-19",verification:"official-source-reviewed"},
{id:"lrd-leadership",url:"https://www.lrd.usace.army.mil/About/Leadership.aspx",scope:"Division and district leadership positions",reviewed:"2026-11-19",verification:"official-source-reviewed"},
{id:"lrh-missions",url:"https://www.lrd.usace.army.mil/huntington/",scope:"Huntington District mission descriptions",reviewed:"2026-11-19",verification:"official-source-reviewed"}
] as const;

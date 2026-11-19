import {phase2Entities,phase2Relations} from "./usace-phase2";
export type RelationType = "administrative" | "command" | "civilian-oversight" | "coordination" | "statutory" | "policy";
export type Entity = { id:string; name:string; acronym?:string; category:string; description:string; source?:string; status:"source-linked"|"research-needed" };
export type Relation = { from:string; to:string; type:RelationType; note:string; source?:string; status:"source-linked"|"research-needed" };
export const entities:Entity[] = [
...phase2Entities,
{id:"president",name:"President of the United States",category:"Executive",description:"Head of the executive branch and Commander in Chief.",source:"https://www.whitehouse.gov/",status:"source-linked"},
{id:"dod",name:"Department of Defense",acronym:"DoD",category:"Department",description:"Executive department responsible for national defense.",source:"https://www.defense.gov/",status:"source-linked"},
{id:"army",name:"Department of the Army",category:"Military department",description:"Military department within DoD; civilian and military leadership roles must be distinguished.",source:"https://www.army.mil/",status:"source-linked"},
{id:"secarmy",name:"Secretary of the Army",category:"Civilian leadership",description:"Civilian head of the Department of the Army.",source:"https://www.army.mil/",status:"source-linked"},
{id:"asacw",name:"Assistant Secretary of the Army for Civil Works",acronym:"ASA(CW)",category:"Civilian oversight",description:"Civil Works policy and oversight role; not an intermediate military commander.",source:"https://www.usace.army.mil/Missions/Civil-Works/",status:"source-linked"},
{id:"usace",name:"U.S. Army Corps of Engineers",acronym:"USACE",category:"Army organization",description:"Army organization with Civil Works and military mission responsibilities.",source:"https://www.usace.army.mil/",status:"source-linked"},
{id:"lrd",name:"Great Lakes and Ohio River Division",acronym:"LRD",category:"USACE division",description:"USACE regional division.",source:"https://www.lrd.usace.army.mil/",status:"source-linked"},
{id:"lrh",name:"Huntington District",acronym:"LRH",category:"USACE district",description:"USACE district in Huntington, West Virginia.",source:"https://www.lrh.usace.army.mil/",status:"source-linked"},
{id:"planning",name:"Huntington District Planning",category:"Functional office",description:"Planning function; exact internal reporting structure requires verification.",status:"research-needed"},
{id:"formulation",name:"Plan Formulation / Sociology",category:"Professional specialization",description:"Illustrative role anchor, not a verified reporting unit.",status:"research-needed"},
{id:"congress",name:"United States Congress",category:"Legislative branch",description:"Enacts authorizations and appropriations; not subordinate to the President.",source:"https://www.congress.gov/",status:"source-linked"},
{id:"omb",name:"Office of Management and Budget",acronym:"OMB",category:"Executive Office",description:"Coordinates executive budget development and reviews.",source:"https://www.whitehouse.gov/omb/",status:"source-linked"},
{id:"epa",name:"Environmental Protection Agency",acronym:"EPA",category:"Independent agency",description:"Environmental regulatory and interagency coordination partner.",source:"https://www.epa.gov/",status:"source-linked"},
{id:"fema",name:"Federal Emergency Management Agency",acronym:"FEMA",category:"DHS component",description:"Federal disaster management agency within DHS.",source:"https://www.fema.gov/",status:"source-linked"},
{id:"dhs",name:"Department of Homeland Security",acronym:"DHS",category:"Department",description:"Cabinet department containing FEMA.",source:"https://www.dhs.gov/",status:"source-linked"}
];
export const relations:Relation[] = [
...phase2Relations,
{from:"president",to:"dod",type:"civilian-oversight",note:"Executive branch oversight; not a complete operational command depiction.",status:"source-linked"},
{from:"dod",to:"army",type:"administrative",note:"Departmental organizational relationship.",status:"source-linked"},
{from:"army",to:"secarmy",type:"civilian-oversight",note:"Civilian leadership position.",status:"source-linked"},
{from:"army",to:"usace",type:"administrative",note:"Army organizational affiliation; command specifics require source-level refinement.",status:"source-linked"},
{from:"usace",to:"lrd",type:"administrative",note:"USACE division structure.",status:"source-linked"},
{from:"lrd",to:"lrh",type:"administrative",note:"Regional district structure.",status:"source-linked"},
{from:"lrh",to:"planning",type:"administrative",note:"Functional relationship; detailed reporting unverified.",status:"research-needed"},
{from:"planning",to:"formulation",type:"coordination",note:"Illustrative specialization, not a confirmed supervisory chain.",status:"research-needed"},
{from:"asacw",to:"usace",type:"civilian-oversight",note:"Civil Works policy oversight, distinct from military command.",status:"source-linked"},
{from:"secarmy",to:"asacw",type:"administrative",note:"Secretariat relationship.",status:"source-linked"},
{from:"congress",to:"usace",type:"statutory",note:"Statutory authorizations and appropriations; program-specific rules apply.",status:"source-linked"},
{from:"omb",to:"usace",type:"policy",note:"Executive budget and policy processes, not military command.",status:"source-linked"},
{from:"epa",to:"usace",type:"coordination",note:"Environmental and regulatory coordination; context-dependent.",status:"source-linked"},
{from:"fema",to:"usace",type:"coordination",note:"Disaster response coordination; mission-dependent.",status:"source-linked"},
{from:"dhs",to:"fema",type:"administrative",note:"FEMA is within DHS.",status:"source-linked"}
];
export const authorities = [
{id:"cwa404",name:"Clean Water Act §404",kind:"Regulatory jurisdiction",source:"https://www.epa.gov/cwa-404"},
{id:"rha10",name:"Rivers and Harbors Act §10",kind:"Regulatory jurisdiction",source:"https://www.usace.army.mil/Missions/Civil-Works/Regulatory-Program-and-Permits/"},
{id:"pl8499",name:"Public Law 84-99",kind:"Emergency assistance authority",source:"https://www.usace.army.mil/Missions/Emergency-Operations/"},
{id:"cap205",name:"CAP Section 205",kind:"Flood risk management program authority",source:"https://www.usace.army.mil/Missions/Civil-Works/Project-Planning/Continuing-Authorities-Program/"},
{id:"cap206",name:"CAP Section 206",kind:"Aquatic ecosystem restoration program authority",source:"https://www.usace.army.mil/Missions/Civil-Works/Project-Planning/Continuing-Authorities-Program/"},
{id:"cap208",name:"CAP Section 208",kind:"Snagging and clearing program authority",source:"https://www.usace.army.mil/Missions/Civil-Works/Project-Planning/Continuing-Authorities-Program/"}
];
export function validateData(){const ids=new Set(entities.map(e=>e.id));return entities.length===ids.size&&relations.every(r=>ids.has(r.from)&&ids.has(r.to));}

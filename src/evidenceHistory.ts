export type Evidence={id:string;claim:string;sourceUrl:string;status:"research-needed"|"source-linked"|"claim-verified";effectiveFrom?:string;effectiveTo?:string;reviewedOn?:string;notes:string};
export const evidence:Evidence[]=[
{id:"usace-lrd",claim:"USACE includes the Great Lakes and Ohio River Division",sourceUrl:"https://www.lrd.usace.army.mil/",status:"source-linked",notes:"Division homepage is a research entry point; dated relationship evidence remains to be attached."},
{id:"lrd-lrh",claim:"Huntington District is within Great Lakes and Ohio River Division",sourceUrl:"https://www.lrd.usace.army.mil/",status:"source-linked",notes:"Verify against current official division district listing."},
{id:"civil-works",claim:"Assistant Secretary of the Army for Civil Works has a distinct civilian oversight role",sourceUrl:"https://www.usace.army.mil/Missions/Civil-Works/",status:"source-linked",notes:"Not a military command link; source requires claim-level confirmation."}
];
export type HistoricalEvent={id:string;year:number;title:string;summary:string;sourceUrl:string;status:"research-needed"|"source-linked"};
export const history:HistoricalEvent[]=[
{id:"constitution",year:1789,title:"Constitutional federal government begins operations",summary:"The constitutional structure establishes separate legislative, executive, and judicial functions. This is a historical milestone, not a present-day organizational chart.",sourceUrl:"https://www.archives.gov/founding-docs/constitution",status:"source-linked"},
{id:"engineers",year:1802,title:"Permanent Corps of Engineers established",summary:"An early institutional milestone in the Army's engineering organization; later missions and structures evolved through legislation and administration.",sourceUrl:"https://www.usace.army.mil/About/History/",status:"source-linked"},
{id:"dhs",year:2003,title:"Department of Homeland Security begins operations",summary:"DHS consolidated multiple federal functions; verify agency transfers and effective dates separately.",sourceUrl:"https://www.dhs.gov/history",status:"source-linked"}
];
export function validateEvidence(){const ids=[...evidence.map(e=>e.id),...history.map(h=>h.id)];return new Set(ids).size===ids.length&&evidence.every(e=>e.sourceUrl.startsWith("https://")&&(e.status!=="claim-verified"||Boolean(e.reviewedOn)))&&history.every(h=>Number.isInteger(h.year)&&h.sourceUrl.startsWith("https://"));}

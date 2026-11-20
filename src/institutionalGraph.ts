import {entities,relations,type Relation,type RelationType} from "./data";
export type NetworkOptions={focus:string;kind:RelationType|"all";includeResearch:boolean;limit?:number};
export function buildNetwork({focus,kind,includeResearch,limit=18}:NetworkOptions){
const available=relations.filter(r=>(kind==="all"||r.type===kind)&&(includeResearch||r.status!=="research-needed"));
const adjacent=available.filter(r=>r.from===focus||r.to===focus);
const ids=[focus,...new Set(adjacent.map(r=>r.from===focus?r.to:r.from))].slice(0,Math.max(1,limit));
return {nodes:ids.map(id=>entities.find(e=>e.id===id)).filter((e):e is (typeof entities)[number]=>Boolean(e)),edges:adjacent.filter(r=>ids.includes(r.from)&&ids.includes(r.to))};
}
export function directedPaths(start:string,end:string,types:RelationType[],includeResearch=false,maxHops=7):Relation[][]{
if(start===end||maxHops<1)return [];
const paths:Relation[][]=[];const queue:{id:string;path:Relation[];seen:Set<string>}[]=[{id:start,path:[],seen:new Set([start])}];
while(queue.length&&paths.length<15){const current=queue.shift()!;if(current.path.length>=maxHops)continue;
for(const r of relations){if(r.from!==current.id||!types.includes(r.type)||(!includeResearch&&r.status==="research-needed")||current.seen.has(r.to))continue;
const path=[...current.path,r];if(r.to===end){paths.push(path);continue}
queue.push({id:r.to,path,seen:new Set([...current.seen,r.to])});
}}
return paths.sort((a,b)=>a.length-b.length);
}

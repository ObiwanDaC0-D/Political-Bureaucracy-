import {entities,relations,type Relation,type RelationType} from "./data";
export const hierarchyTypes:RelationType[]=["administrative","civilian-oversight","command","policy","statutory","coordination"];
export const hierarchyRoots=["president","dod","army","secarmy","asacw","usace","lrd","lrh"] as const;
export type HierarchyStep={from:string;to:string;relation:Relation};
export function hierarchyChildren(id:string,types:RelationType[],includeResearch=false):HierarchyStep[]{
return relations.filter(r=>r.from===id&&types.includes(r.type)&&(includeResearch||r.status!=="research-needed")&&entities.some(e=>e.id===r.to)).map(relation=>({from:relation.from,to:relation.to,relation}));
}
export function traceHierarchy(start:string,target:string,types:RelationType[],includeResearch=false):HierarchyStep[]|null{
if(start===target)return [];
const queue:{id:string;path:HierarchyStep[];visited:Set<string>}[]=[{id:start,path:[],visited:new Set([start])}];
while(queue.length){const current=queue.shift()!;
for(const step of hierarchyChildren(current.id,types,includeResearch)){if(current.visited.has(step.to))continue;
const path=[...current.path,step];if(step.to===target)return path;
queue.push({id:step.to,path,visited:new Set([...current.visited,step.to])});}}
return null;
}
export function visibleHierarchy(root:string,expanded:ReadonlySet<string>,types:RelationType[],includeResearch=false,maxDepth=9){
const rows:{id:string;depth:number;via?:HierarchyStep}[]=[];const visited=new Set<string>();const queue:{id:string;depth:number;via?:HierarchyStep}[]=[{id:root,depth:0}];
while(queue.length){const current=queue.shift()!;if(visited.has(current.id))continue;visited.add(current.id);rows.push(current);
if(current.depth>=maxDepth||!expanded.has(current.id))continue;
for(const step of hierarchyChildren(current.id,types,includeResearch)){if(!visited.has(step.to))queue.push({id:step.to,depth:current.depth+1,via:step});}}
return rows;
}
export function hierarchySource(step:HierarchyStep){return step.relation.source||entities.find(e=>e.id===step.to)?.source||entities.find(e=>e.id===step.from)?.source||null;}

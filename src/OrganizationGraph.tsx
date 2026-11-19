import {useMemo,useState} from "react";
import {entities,relations,type RelationType} from "./data";
const root="usace";
const typeLabels:Record<RelationType,string>={administrative:"Administrative",command:"Command","civilian-oversight":"Civilian oversight",coordination:"Coordination",statutory:"Statutory",policy:"Policy"};
export function getHierarchy(rootId:string,includeResearch=false){
const visited=new Set<string>();const levels:{id:string;depth:number}[]=[];const queue=[{id:rootId,depth:0}];
while(queue.length){const current=queue.shift()!;if(visited.has(current.id)||current.depth>3)continue;visited.add(current.id);levels.push(current);
for(const edge of relations){if(edge.from===current.id&&edge.type==="administrative"&&(includeResearch||edge.status==="source-linked"))queue.push({id:edge.to,depth:current.depth+1});}}
return levels;
}
export default function OrganizationGraph({onSelect}:{onSelect:(id:string)=>void}){
const [includeResearch,setIncludeResearch]=useState(false);const [focus,setFocus]=useState(root);const nodes=useMemo(()=>getHierarchy(focus,includeResearch),[focus,includeResearch]);
const groups=[0,1,2,3].map(depth=>nodes.filter(n=>n.depth===depth)).filter(g=>g.length);
return <section className="panel org-graph" aria-label="Interactive organizational hierarchy">
<div className="panel-head"><h2>Organizational hierarchy</h2><span>Administrative links only</span></div>
<p className="muted">Choose a node to inspect its profile. Use Focus to explore its descendants. This diagram excludes civilian oversight, statutory authority, coordination and command relationships; those are available in the institution profile and Decision Explorer.</p>
<div className="path-controls"><label>Hierarchy root<select value={focus} onChange={e=>setFocus(e.target.value)}>{entities.filter(e=>["usace","lrd","lrh","lrh-regulatory","army","dod"].includes(e.id)).map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label><label className="graph-toggle"><input type="checkbox" checked={includeResearch} onChange={e=>setIncludeResearch(e.target.checked)}/> Show research-needed links</label></div>
<div className="graph-levels">{groups.map((group,i)=><div className="graph-level" key={i}>{group.map(n=>{const entity=entities.find(e=>e.id===n.id)!;return <div className="graph-node" key={n.id}><button onClick={()=>onSelect(n.id)}><strong>{entity.name}</strong><small>{entity.acronym||entity.category}</small>{entity.status==="research-needed"?<em>Research needed</em>:null}</button>{n.depth>0?<span className="graph-connector" title="Administrative relationship">↑ {typeLabels.administrative}</span>:null}</div>})}</div>)}</div>
<p className="muted">Showing {nodes.length} entities within three administrative levels. Layout is schematic, not a geographic map or exhaustive organizational chart.</p></section>
}

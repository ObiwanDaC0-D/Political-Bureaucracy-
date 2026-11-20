import {useMemo,useRef,useState} from "react";
import {hierarchyChildren,hierarchyRoots,hierarchySource,hierarchyTypes,traceHierarchy,visibleHierarchy} from "./presidentialHierarchy";
import {entities,relations,type RelationType} from "./data";
const root="usace";
const typeLabels:Record<RelationType,string>={administrative:"Administrative",command:"Command","civilian-oversight":"Civilian oversight",coordination:"Coordination",statutory:"Statutory",policy:"Policy"};
export function getHierarchy(rootId:string,includeResearch=false){
const visited=new Set<string>();const levels:{id:string;depth:number}[]=[];const queue=[{id:rootId,depth:0}];
while(queue.length){const current=queue.shift()!;if(visited.has(current.id)||current.depth>3)continue;visited.add(current.id);levels.push(current);
for(const edge of relations){if(edge.from===current.id&&edge.type==="administrative"&&(includeResearch||edge.status==="source-linked"))queue.push({id:edge.to,depth:current.depth+1});}}
return levels;
}
export default function OrganizationGraph({selected,onSelect}:{selected:string;onSelect:(id:string)=>void}){
const [rootId,setRootId]=useState<string>("president");
const [enabled,setEnabled]=useState<RelationType[]>(["administrative","civilian-oversight"]);
const [includeResearch,setIncludeResearch]=useState(false);
const [expanded,setExpanded]=useState<Set<string>>(()=>new Set(["president","secdef","dod","army","usace","lrd"]));
const [zoom,setZoom]=useState(100);
const [trace,setTrace]=useState<string[]>([]);
const viewport=useRef<HTMLDivElement>(null);
const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
const rows=useMemo(()=>visibleHierarchy(rootId,expanded,enabled,includeResearch),[rootId,expanded,enabled,includeResearch]);
const path=useMemo(()=>traceHierarchy(rootId,"lrh",enabled,includeResearch),[rootId,enabled,includeResearch]);
const traceToDistrict=()=>{if(!path)return;setExpanded(old=>new Set([...old,rootId,...path.map(p=>p.from)]));setTrace([rootId,...path.map(p=>p.to)]);};
const toggle=(id:string)=>setExpanded(old=>{const next=new Set(old);if(next.has(id))next.delete(id);else next.add(id);setTrace([]);return next});
const changeRoot=(id:string)=>{setRootId(id);setTrace([]);setExpanded(old=>new Set([...old,id]));};
const changeType=(type:RelationType)=>{setEnabled(old=>old.includes(type)?old.filter(t=>t!==type):[...old,type]);setTrace([])};
return <section className="panel org-graph" aria-label="Interactive presidential-to-Huntington hierarchy">
<div className="panel-head"><h2>Organizational hierarchy</h2><span>President → Huntington District</span></div>
<p className="muted">Explore directed institutional relationships. Arrows show the direction recorded in the dataset, not necessarily military command or approval authority. Position, department, and organization are different kinds of nodes.</p>
<div className="path-controls"><label>Start from<select value={rootId} onChange={e=>changeRoot(e.target.value)}>{hierarchyRoots.map(id=>{const e=entities.find(x=>x.id===id)!;return <option key={id} value={id}>{e.name}</option>})}</select></label><label className="graph-toggle"><input type="checkbox" checked={includeResearch} onChange={e=>{setIncludeResearch(e.target.checked);setTrace([])}}/> Include research-needed relationships</label></div>
<div className="filters" aria-label="Hierarchy relationship filters">{hierarchyTypes.map(t=><label key={t}><input type="checkbox" checked={enabled.includes(t)} onChange={()=>changeType(t)}/>{typeLabels[t]}</label>)}</div>
<div className="hierarchy-toolbar"><button className="primary" onClick={traceToDistrict} disabled={path===null}>Trace to Huntington District</button><button className="primary" onClick={()=>{setExpanded(new Set([rootId]));setTrace([])}}>Collapse all</button><button className="primary" onClick={()=>setExpanded(new Set(entities.map(e=>e.id)))}>Expand all</button><label>Zoom <button type="button" onClick={()=>setZoom(z=>Math.max(60,z-10))} aria-label="Zoom out">−</button><output>{zoom}%</output><button type="button" onClick={()=>setZoom(z=>Math.min(160,z+10))} aria-label="Zoom in">+</button><button type="button" onClick={()=>setZoom(100)}>Reset</button></label></div>
{path===null?<p className="warning" role="status">No directed path to Huntington District with these filters. Enable relevant relationship types; missing links are not inferred.</p>:<p className="muted" role="status">A {path.length}-relationship route to Huntington District is available. Select “Trace” to reveal it. Paths are institutional connections, not a single chain of command.</p>}
<div className="hierarchy-viewport" ref={viewport} aria-label="Scrollable and draggable organizational tree" onPointerDown={e=>{if((e.target as HTMLElement).closest("button,a,input,select"))return;const el=viewport.current;if(!el)return;drag.current={x:e.clientX,y:e.clientY,left:el.scrollLeft,top:el.scrollTop};el.setPointerCapture(e.pointerId)}} onPointerMove={e=>{const el=viewport.current;if(!el||!drag.current)return;el.scrollLeft=drag.current.left+drag.current.x-e.clientX;el.scrollTop=drag.current.top+drag.current.y-e.clientY}} onPointerUp={e=>{drag.current=null;if(viewport.current?.hasPointerCapture(e.pointerId))viewport.current.releasePointerCapture(e.pointerId)}} onPointerCancel={()=>{drag.current=null}}>
<div className="hierarchy-canvas" style={{zoom:zoom/100}}>
{rows.map(row=>{const e=entities.find(x=>x.id===row.id)!;const children=hierarchyChildren(row.id,enabled,includeResearch);const isOpen=expanded.has(row.id);const isTraced=trace.includes(row.id);const source=row.via?hierarchySource(row.via):e.source;
return <div className={"hierarchy-row"+(isTraced?" traced":"")} key={row.id} style={{marginLeft:row.depth*34}}>
{row.via?<div className="hierarchy-edge"><span aria-hidden="true">↓</span> {typeLabels[row.via.relation.type]} · {row.via.relation.status==="research-needed"?"Research needed":"Source-linked"}{source?<a href={source} target="_blank" rel="noreferrer" aria-label={"Source for "+e.name}>Source ↗</a>:<span className="warning">No direct source</span>}</div>:null}
<div className="hierarchy-entry"><button className="hierarchy-expand" disabled={children.length===0} aria-expanded={children.length?isOpen:undefined} aria-label={(isOpen?"Collapse ":"Expand ")+e.name} onClick={()=>toggle(row.id)}>{children.length?(isOpen?"−":"+"):"·"}</button><button className={"hierarchy-entity"+(selected===row.id?" selected":"")} aria-pressed={selected===row.id} onClick={()=>onSelect(row.id)}><strong>{e.name}</strong><small>{e.acronym||e.category} · {e.status==="research-needed"?"Research needed":"Source-linked"}</small></button></div>
</div>})}
</div></div>
<p className="muted">{rows.length} visible institutions. Use expand/collapse buttons, scroll or drag empty space to pan, and zoom controls to resize. Official source links are research leads, not independent verification of dated claims.</p>
</section>;
}

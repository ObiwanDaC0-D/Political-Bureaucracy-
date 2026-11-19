import {useMemo,useState} from "react";
import {entities,relations,type Relation,type RelationType} from "./data";
const labels:Record<RelationType,string>={administrative:"Administrative",command:"Command", "civilian-oversight":"Civilian oversight",coordination:"Coordination",statutory:"Statutory",policy:"Policy"};
export function tracePaths(start:string,end:string,enabled:RelationType[],includeResearch=false,maxHops=7):Relation[][]{
if(start===end)return [];
const paths:Relation[][]=[];const queue:{id:string;edges:Relation[];seen:Set<string>}[]=[{id:start,edges:[],seen:new Set([start])}];
while(queue.length&&paths.length<15){const current=queue.shift()!;if(current.edges.length>=maxHops)continue;
for(const r of relations){if(!enabled.includes(r.type)||(!includeResearch&&r.status==="research-needed"))continue;
const next=r.from===current.id?r.to:r.to===current.id?r.from:null;
if(!next||current.seen.has(next))continue;
const edges=[...current.edges,r];if(next===end){paths.push(edges);continue}
queue.push({id:next,edges,seen:new Set([...current.seen,next])});
}}
return paths.sort((a,b)=>a.length-b.length);
}
const allTypes=Object.keys(labels) as RelationType[];
export default function AuthorityPaths(){const[start,setStart]=useState("lrh");const[end,setEnd]=useState("usace");const[enabled,setEnabled]=useState<RelationType[]>(allTypes);const[includeResearch,setIncludeResearch]=useState(false);
const paths=useMemo(()=>tracePaths(start,end,enabled,includeResearch),[start,end,enabled,includeResearch]);
return <section className="panel"><h2>Authority Path Explorer</h2><p className="muted">Explore institutional connections as an undirected network. Each step shows its recorded direction and relationship type. A path is not necessarily an approval chain, reporting line, or legal delegation.</p>
<div className="path-controls"><label>From<select value={start} onChange={e=>setStart(e.target.value)}>{entities.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label><label>To<select value={end} onChange={e=>setEnd(e.target.value)}>{entities.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label></div>
<div className="filters">{allTypes.map(t=><label key={t}><input type="checkbox" checked={enabled.includes(t)} onChange={()=>setEnabled(s=>s.includes(t)?s.filter(x=>x!==t):[...s,t])}/>{labels[t]}</label>)}<label><input type="checkbox" checked={includeResearch} onChange={e=>setIncludeResearch(e.target.checked)}/>Include research-needed links</label></div>
{paths.length===0?<p className="warning">No path found with these filters. This does not establish that no institutional relationship exists.</p>:<><p className="muted">{paths.length} possible connection path{paths.length===1?"":"s"} (up to 15 shown), shortest first.</p>{paths.map((path,i)=>{let node=start;return <article className="path-result" key={i}><h3>Path {i+1} · {path.length} links</h3><div className="path-node">{entities.find(e=>e.id===start)?.name}</div>{path.map((r,j)=>{const next=r.from===node?r.to:r.from;const direction=r.from===node?"→":"←";node=next;return <div key={j} className="path-step"><div className="path-link"><strong>{direction} {labels[r.type]}</strong> · {r.status==="research-needed"?"Research needed":"Source-linked"}<p>{r.note}</p>{r.source?<a href={r.source} target="_blank" rel="noreferrer">Evidence source ↗</a>:<span className="warning">No relationship-specific evidence URL recorded</span>}</div><div className="path-node">{entities.find(e=>e.id===next)?.name}</div></div>})}</article>})}</>}
</section>}

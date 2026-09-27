const departments = [
  {
    id:"admin", icon:"⌘", category:"support", tag:"Administration",
    title:"Administration & Human Resources",
    lead:"Provides the administrative backbone of the council, coordinating personnel, records, office procedures and internal workforce support.",
    responsibilities:["Personnel administration and staff records","Recruitment, postings, training and staff development support","Registry, correspondence and records management","General office administration and coordination"],
    chips:["Human resources","Personnel records","Registry","Staff development","Administration"]
  },
  {
    id:"finance", icon:"₦", category:"core", tag:"Core",
    title:"Finance & Accounts",
    lead:"Manages the council's financial administration, accounting processes, budgeting support, expenditure records and financial reporting.",
    responsibilities:["Accounting and financial record keeping","Budget preparation and financial monitoring","Revenue and expenditure administration","Payroll-related financial processing and reporting"],
    chips:["Accounts","Budget","Revenue","Expenditure","Financial reports"]
  },
  {
    id:"works", icon:"⌂", category:"core", tag:"Core",
    title:"Works & Infrastructure",
    lead:"Supports the planning, maintenance and coordination of local public infrastructure and physical development works.",
    responsibilities:["Local road and drainage maintenance coordination","Public building maintenance and works supervision","Technical assessment of council infrastructure","Project monitoring and maintenance planning"],
    chips:["Roads","Drainage","Public buildings","Maintenance","Works supervision"]
  },
  {
    id:"health", icon:"+", category:"service", tag:"Service",
    title:"Primary Healthcare",
    lead:"Supports accessible primary healthcare and community-level public health activities in coordination with the relevant health authorities.",
    responsibilities:["Primary healthcare service coordination","Preventive health and community outreach","Health education and awareness","Support for immunisation and maternal/child health activities"],
    chips:["Primary care","Health outreach","Immunisation","Health education","Wellness"]
  },
  {
    id:"education", icon:"◎", category:"service", tag:"Service",
    title:"Education & Library Services",
    lead:"Supports local education administration, school-related development initiatives and access to learning and library resources.",
    responsibilities:["Support for local education programmes","School maintenance and improvement coordination","Library and reading services","Educational and youth development support"],
    chips:["Schools","Libraries","Learning","Youth","Education support"]
  },
  {
    id:"environment", icon:"◒", category:"service", tag:"Service",
    title:"Environmental Health Services",
    lead:"Works around environmental sanitation, public hygiene and community health protection through environmental health activities.",
    responsibilities:["Environmental sanitation and hygiene activities","Public health inspection and awareness","Community sanitation education","Environmental nuisance and hygiene monitoring"],
    chips:["Sanitation","Hygiene","Inspection","Public health","Environment"]
  },
  {
    id:"wapa", icon:"♡", category:"service", tag:"Service",
    title:"Women Affairs & Poverty Alleviation",
    lead:"Supports women-focused initiatives, social welfare interventions, empowerment activities and poverty alleviation programmes.",
    responsibilities:["Women empowerment and development programmes","Social welfare support and referrals","Skills acquisition and livelihood initiatives","Community sensitisation and family support"],
    chips:["Women empowerment","Welfare","Skills","Livelihoods","Social support"]
  },
  {
    id:"agriculture", icon:"✿", category:"service", tag:"Service",
    title:"Agriculture & Social Services",
    lead:"Supports community agriculture, social development and programmes that strengthen livelihoods and local participation.",
    responsibilities:["Agricultural extension and community support","Livelihood and social development initiatives","Support for farmers and local producers","Community development activities"],
    chips:["Agriculture","Farmers","Livelihoods","Social services","Community"]
  },
  {
    id:"planning", icon:"▦", category:"core", tag:"Core",
    title:"Planning, Budget, Research & Statistics",
    lead:"Provides planning and evidence support for development priorities through budgeting coordination, research and statistical information.",
    responsibilities:["Development planning and programme coordination","Budget planning support","Research and data gathering","Statistics and performance information"],
    chips:["Planning","Research","Statistics","Budgeting","Data"]
  },
  {
    id:"legal", icon:"§", category:"support", tag:"Support",
    title:"Legal Unit",
    lead:"Provides legal guidance and support to the council on administrative matters, compliance, agreements and the protection of council interests.",
    responsibilities:["Legal advice on council activities","Review of agreements and documents","Regulatory and compliance guidance","Support on legal correspondence and matters"],
    chips:["Legal advice","Compliance","Contracts","Documentation","Counsel"]
  },
  {
    id:"public-affairs", icon:"◉", category:"support", tag:"Support",
    title:"Public Affairs Unit",
    lead:"Connects the council with residents, communities and the media through public information, communication and engagement.",
    responsibilities:["Public information and official communication","Media and community engagement","Publication of council announcements","Public awareness and stakeholder relations"],
    chips:["Public information","Media","Community engagement","Announcements","Outreach"]
  },
  {
    id:"procurement", icon:"◇", category:"support", tag:"Support",
    title:"Procurement Unit",
    lead:"Supports procurement planning and due-process administration for the acquisition of goods, works and services required by the council.",
    responsibilities:["Procurement planning and documentation","Tender and quotation process support","Procurement records and compliance","Coordination with user departments and vendors"],
    chips:["Procurement","Tendering","Due process","Contracts","Records"]
  },
  {
    id:"ict", icon:"⌁", category:"support", tag:"Support",
    title:"Information & Communication Technology",
    lead:"Supports digital systems, information technology, connectivity and technology-enabled administrative services across the council.",
    responsibilities:["ICT infrastructure and user support","Digital records and information systems","Network and device support","Technology-enabled public service improvements"],
    chips:["ICT","Digital services","Networks","Systems","Technical support"]
  },
  {
    id:"audit", icon:"✓", category:"support", tag:"Support",
    title:"Internal Audit Unit",
    lead:"Provides internal review and assurance support around financial controls, records, processes and compliance within the council.",
    responsibilities:["Internal review of financial processes","Control and compliance checks","Audit documentation and reporting","Follow-up on identified control issues"],
    chips:["Audit","Controls","Compliance","Assurance","Reports"]
  },
  {
    id:"tourism", icon:"✦", category:"service", tag:"Service",
    title:"Tourism & Cultural Affairs",
    lead:"Supports local culture, heritage, tourism awareness and community activities that contribute to the identity and social life of the area.",
    responsibilities:["Cultural and heritage promotion","Community events and tourism support","Local attractions and identity initiatives","Creative and cultural engagement"],
    chips:["Culture","Heritage","Tourism","Events","Community identity"]
  }
];

const grid = document.getElementById("departmentGrid");
const search = document.getElementById("departmentSearch");
const noResults = document.getElementById("noResults");
let activeFilter = "all";

function renderDepartments(){
  const q = search.value.trim().toLowerCase();
  const filtered = departments.filter(d => {
    const matchesFilter = activeFilter === "all" || d.category === activeFilter;
    const haystack = [d.title,d.tag,d.lead,...d.responsibilities,...d.chips].join(" ").toLowerCase();
    return matchesFilter && haystack.includes(q);
  });

  grid.innerHTML = filtered.map((d,i) => `
    <article class="department-card" data-dept="${d.id}" tabindex="0" role="button" aria-label="Open ${d.title}">
      <span class="dept-index">${String(i+1).padStart(2,"0")} / ${d.category.toUpperCase()}</span>
      <span class="dept-tag">${d.tag}</span>
      <div class="dept-icon">${d.icon}</div>
      <h3>${d.title}</h3>
      <p>${d.lead}</p>
      <span class="dept-link">View details →</span>
    </article>
  `).join("");

  noResults.hidden = filtered.length !== 0;
  document.querySelectorAll(".department-card").forEach(card => {
    card.addEventListener("click", () => openDepartment(card.dataset.dept));
    card.addEventListener("keydown", e => { if(e.key==="Enter" || e.key===" ") { e.preventDefault(); openDepartment(card.dataset.dept); }});
  });
}

const modal = document.getElementById("departmentModal");
function openDepartment(id){
  const d = departments.find(x => x.id === id);
  if(!d) return;
  document.getElementById("modalIcon").textContent = d.icon;
  document.getElementById("modalTag").textContent = `${d.tag} • DEPARTMENT PROFILE`;
  document.getElementById("modalTitle").textContent = d.title;
  document.getElementById("modalLead").textContent = d.lead;
  document.getElementById("modalResponsibilities").innerHTML = d.responsibilities.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("modalChips").innerHTML = d.chips.map(x=>`<span>${x}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeModal()});
search.addEventListener("input",renderDepartments);

document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderDepartments();
  });
});

document.querySelectorAll("[data-open-dept]").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    document.getElementById("departments").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>openDepartment(link.dataset.openDept),500);
  });
});

const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

renderDepartments();

async function loadProfile(){
  const res = await fetch('data/profile.json');
  const profile = await res.json();
  const $ = (sel)=>document.querySelector(sel);

  $('#objective').textContent = profile.objective;
  $('#location').textContent = profile.location;
  $('#email').textContent = profile.email;
  $('#email').href = `mailto:${profile.email}`;
  $('#phone').textContent = profile.phone;
  $('#phone').href = `tel:${profile.phone}`;
  $('#year').textContent = new Date().getFullYear();
  if (profile.links?.linkedin) { 
    const l = document.getElementById('linkedin'); l.href = profile.links.linkedin; 
  }
  if (profile.links?.github) { 
    const g = document.getElementById('github'); g.href = profile.links.github; 
  }

  // Experience
  const exWrap = document.getElementById('experience-list');
  profile.experience.forEach(exp=>{
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <h3>${exp.role} — ${exp.company}</h3>
      <div class="when">${exp.period}</div>
      <ul>${exp.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
    `;
    exWrap.appendChild(div);
  });

  // Projects
  const pg = document.getElementById('project-grid');
  profile.projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project';
    card.innerHTML = `
      <div class="cover">${p.image ? `<img src="${p.image}" alt="">` : `<span>📦</span>`}</div>
      <div class="body">
        <h3>${p.name}</h3>
        <p>${p.summary}</p>
      </div>
      ${p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noreferrer">View</a>` : ''}
    `;
    pg.appendChild(card);
  });

  // Skills
  const sc = document.getElementById('skill-chips');
  profile.skills.forEach(s=>{
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = s;
    sc.appendChild(span);
  });

  // Certifications
  const certList = document.getElementById('cert-list');
  profile.certifications.forEach(c=>{
    const li = document.createElement('li');
    li.textContent = c;
    certList.appendChild(li);
  });

  // Education
  const eduList = document.getElementById('edu-list');
  profile.education.forEach(e=>{
    const li = document.createElement('li');
    li.textContent = `${e.institution} — ${e.credential} (${e.year})`;
    eduList.appendChild(li);
  });

  // References
  const refList = document.getElementById('ref-list');
  profile.references.forEach(r=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.name}</strong> — ${r.title} • <a href="tel:${r.phone}">${r.phone}</a> • <a href="mailto:${r.email}">${r.email}</a>`;
    refList.appendChild(li);
  });
}
loadProfile();

/* Sample 3: Strategy Compass — three.js
   A 3D radar with floating decision-nodes orbiting at different radii.
   Mouse tilts the disc; clicking a node "focuses" it (pulls camera + label). */

(function(){
  const root = document.getElementById('scene-3');
  if(!root) return;

  const W = ()=> root.clientWidth;
  const H = ()=> root.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W()/H(), 0.1, 200);
  camera.position.set(0, 8, 22);
  camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x000000, 0);
  root.appendChild(renderer.domElement);

  const root3 = new THREE.Group();
  scene.add(root3);

  // Concentric ring grid (radar)
  const ringRadii = [3, 6, 9, 12];
  ringRadii.forEach((r,i)=>{
    const seg = 96;
    const pts = [];
    for(let a=0;a<=seg;a++){
      const ang = (a/seg)*Math.PI*2;
      pts.push(new THREE.Vector3(Math.cos(ang)*r, 0, Math.sin(ang)*r));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: 0x3a4255, transparent:true, opacity: 0.4 - i*0.06
    });
    root3.add(new THREE.Line(geo, mat));
  });

  // Radial spokes
  for(let k=0;k<8;k++){
    const ang = (k/8)*Math.PI*2;
    const pts = [
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(Math.cos(ang)*13, 0, Math.sin(ang)*13)
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x2a3140, transparent:true, opacity:0.4 });
    root3.add(new THREE.Line(geo, mat));
  }

  // Sweeping radar arc
  const sweepGeo = new THREE.RingGeometry(0.4, 12.5, 64, 1, 0, Math.PI/4);
  const sweepMat = new THREE.MeshBasicMaterial({
    color: 0xff7a45, transparent:true, opacity: 0.13, side: THREE.DoubleSide
  });
  const sweep = new THREE.Mesh(sweepGeo, sweepMat);
  sweep.rotation.x = -Math.PI/2;
  root3.add(sweep);

  // Decision nodes
  const labels = [
    { name: "Build vs Buy",     r: 3,  ang: 0,           v:1.0 },
    { name: "Pricing Tier",     r: 6,  ang: Math.PI*0.3, v:0.9 },
    { name: "RAG vs Fine-tune", r: 6,  ang: Math.PI*0.9, v:0.7 },
    { name: "Hire vs Outsource",r: 9,  ang: Math.PI*0.2, v:0.6 },
    { name: "GTM Channel",      r: 9,  ang: Math.PI*1.4, v:0.85 },
    { name: "Latency Budget",   r: 6,  ang: Math.PI*1.6, v:0.55 },
    { name: "Eval Strategy",    r: 9,  ang: Math.PI*0.7, v:0.75 },
    { name: "Data Retention",   r: 12, ang: Math.PI*0.15,v:0.4 },
    { name: "Fine-tune Budget", r: 12, ang: Math.PI*0.85,v:0.5 },
    { name: "Open vs Closed",   r: 12, ang: Math.PI*1.7, v:0.65 },
  ];

  const nodeMeshes = [];
  labels.forEach(L=>{
    const x = Math.cos(L.ang)*L.r;
    const z = Math.sin(L.ang)*L.r;
    // pillar
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, L.v*3.5, 6);
    const pillarMat = new THREE.MeshBasicMaterial({ color: 0x6b7585, transparent:true, opacity:0.5 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(x, L.v*1.75, z);
    root3.add(pillar);

    // node sphere
    const nodeGeo = new THREE.SphereGeometry(0.22 + L.v*0.18, 18, 18);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff7a45 });
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, L.v*3.5, z);
    node.userData = { ...L, baseY: L.v*3.5, x, z };
    root3.add(node);

    // halo
    const haloGeo = new THREE.RingGeometry(0.4, 0.5, 24);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xff7a45, transparent:true, opacity:0.4, side:THREE.DoubleSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(node.position);
    halo.rotation.x = -Math.PI/2;
    root3.add(halo);
    node.userData.halo = halo;
    node.userData.pillar = pillar;

    nodeMeshes.push(node);
  });

  // Particle dust
  const dustCount = 400;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount*3);
  for(let i=0;i<dustCount;i++){
    const a = Math.random()*Math.PI*2;
    const r = 1 + Math.random()*14;
    dustPos[i*3] = Math.cos(a)*r;
    dustPos[i*3+1] = Math.random()*4;
    dustPos[i*3+2] = Math.sin(a)*r;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x5ce0ff, size: 0.05, transparent:true, opacity:0.5
  }));
  scene.add(dust);

  // Label overlay
  const labelEl = document.createElement('div');
  labelEl.className = 's3-label';
  labelEl.style.cssText = `
    position:absolute; pointer-events:none;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    color:#e8ecf2; background: rgba(10,13,18,0.85);
    border: 1px solid #3a4255; padding: 6px 10px;
    border-radius: 4px;
    transform: translate(-50%, -130%);
    opacity: 0; transition: opacity .2s;
    text-transform: uppercase; letter-spacing: 0.06em;
    white-space: nowrap;
  `;
  root.style.position = 'relative';
  root.appendChild(labelEl);

  // Mouse + raycaster
  let mx = 0, my = 0;
  const raycaster = new THREE.Raycaster();
  const mouseV = new THREE.Vector2();

  root.addEventListener('mousemove', e=>{
    const r = root.getBoundingClientRect();
    mx = (e.clientX - r.left)/r.width - 0.5;
    my = (e.clientY - r.top)/r.height - 0.5;
    mouseV.x = mx*2;
    mouseV.y = -my*2;

    raycaster.setFromCamera(mouseV, camera);
    const hits = raycaster.intersectObjects(nodeMeshes);
    if(hits.length){
      const n = hits[0].object;
      const sp = toScreen(n.position);
      labelEl.style.left = sp.x + 'px';
      labelEl.style.top = sp.y + 'px';
      labelEl.textContent = n.userData.name + ' · w=' + n.userData.v.toFixed(2);
      labelEl.style.opacity = 1;
      // pulse this node
      anime({
        targets: n.scale,
        x:1.4, y:1.4, z:1.4,
        duration: 200, easing:'easeOutQuad'
      });
    } else {
      labelEl.style.opacity = 0;
      nodeMeshes.forEach(n=> {
        anime({ targets: n.scale, x:1, y:1, z:1, duration: 200 });
      });
    }
  });

  function toScreen(v){
    const p = v.clone().project(camera);
    const r = root.getBoundingClientRect();
    return {
      x: (p.x*0.5+0.5)*r.width,
      y: (-p.y*0.5+0.5)*r.height
    };
  }

  // Click → ripple
  root.addEventListener('click', e=>{
    raycaster.setFromCamera(mouseV, camera);
    const hits = raycaster.intersectObjects(nodeMeshes);
    if(!hits.length) return;
    const n = hits[0].object;
    // ring expand
    const ringGeo = new THREE.RingGeometry(0.5, 0.6, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff7a45, transparent:true, opacity:0.9, side:THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(n.position);
    ring.rotation.x = -Math.PI/2;
    root3.add(ring);
    anime({
      targets: ring.scale, x:8, y:8, z:8,
      duration: 1200, easing:'easeOutQuart'
    });
    anime({
      targets: ringMat, opacity: 0,
      duration: 1200, easing:'easeOutQuart',
      complete: ()=> root3.remove(ring)
    });
  });

  // Animate sweeping arc
  const clock = new THREE.Clock();
  function tick(){
    const t = clock.getElapsedTime();
    sweep.rotation.z = -t*0.6;
    root3.rotation.y = t*0.05 + mx*0.6;
    root3.rotation.x = -my*0.25 - 0.05;
    dust.rotation.y = -t*0.04;

    // Bob nodes
    nodeMeshes.forEach((n,i)=>{
      n.position.y = n.userData.baseY + Math.sin(t*1.2 + i)*0.12;
      if(n.userData.halo){
        n.userData.halo.position.y = n.position.y;
        n.userData.halo.rotation.z = t*0.5 + i;
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  function onResize(){
    if(!root.clientWidth) return;
    camera.aspect = W()/H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }
  window.addEventListener('resize', onResize);
  new ResizeObserver(onResize).observe(root);
})();

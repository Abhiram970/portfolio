/* Sample 1: Neural Network Bloom — three.js
   A 3D rotating MLP. Click "Forward Pass" → data lights up node-by-node, layer-by-layer,
   with activation glow + signal traveling along edges. */

(function(){
  const root = document.getElementById('scene-1');
  if(!root) return;

  const W = ()=> root.clientWidth;
  const H = ()=> root.clientHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0d12, 0.04);

  const camera = new THREE.PerspectiveCamera(45, W()/H(), 0.1, 200);
  camera.position.set(0, 4, 28);
  camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x000000, 0);
  root.appendChild(renderer.domElement);

  // Layout: input(8) → hidden1(12) → hidden2(12) → hidden3(8) → output(3)
  const layers = [8, 12, 12, 8, 3];
  const layerSpacing = 7;
  const totalW = (layers.length - 1) * layerSpacing;
  const startX = -totalW/2;

  const COLORS = {
    accent: 0xff7a45,
    cyan: 0x5ce0ff,
    magenta: 0xc66dff,
    ink: 0xe8ecf2,
  };

  const group = new THREE.Group();
  scene.add(group);

  const allNodes = [];   // [layerIdx][i] → mesh
  const allEdges = [];   // {line, from, to, layer}

  layers.forEach((count, li) => {
    const layerNodes = [];
    const x = startX + li*layerSpacing;
    for(let i=0;i<count;i++){
      const t = (i - (count-1)/2);
      const y = t * 1.2;
      // Two stacked spheres: solid core + wireframe halo
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0x222831, transparent:true, opacity:0.85 })
      );
      core.position.set(x, y, (Math.random()-0.5)*0.6);
      core.userData = { baseColor: 0x222831, activation: 0, layer: li, idx: i };
      group.add(core);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 18, 18),
        new THREE.MeshBasicMaterial({ color: COLORS.accent, wireframe:true, transparent:true, opacity:0.15 })
      );
      halo.position.copy(core.position);
      core.userData.halo = halo;
      group.add(halo);

      layerNodes.push(core);
    }
    allNodes.push(layerNodes);
  });

  // Edges between consecutive layers
  for(let li=0; li<allNodes.length-1; li++){
    const A = allNodes[li], B = allNodes[li+1];
    A.forEach(a=>{
      B.forEach(b=>{
        // skip ~30% to keep it readable
        if(Math.random() < 0.3) return;
        const geo = new THREE.BufferGeometry().setFromPoints([a.position, b.position]);
        const mat = new THREE.LineBasicMaterial({ color: 0x3a4255, transparent:true, opacity:0.18 });
        const line = new THREE.Line(geo, mat);
        line.userData = { from: a, to: b, layer: li, baseOpacity: 0.18 };
        group.add(line);
        allEdges.push(line.userData);
      });
    });
  }

  // Particle aurora background
  const auroraCount = 200;
  const auroraGeo = new THREE.BufferGeometry();
  const auroraPos = new Float32Array(auroraCount*3);
  for(let i=0;i<auroraCount;i++){
    auroraPos[i*3]   = (Math.random()-0.5)*60;
    auroraPos[i*3+1] = (Math.random()-0.5)*30;
    auroraPos[i*3+2] = (Math.random()-0.5)*30 - 15;
  }
  auroraGeo.setAttribute('position', new THREE.BufferAttribute(auroraPos, 3));
  const aurora = new THREE.Points(auroraGeo, new THREE.PointsMaterial({
    color: COLORS.accent, size: 0.06, transparent:true, opacity:0.4
  }));
  scene.add(aurora);

  // Mouse parallax
  let mx=0, my=0;
  root.addEventListener('mousemove', e=>{
    const r = root.getBoundingClientRect();
    mx = (e.clientX - r.left)/r.width - 0.5;
    my = (e.clientY - r.top)/r.height - 0.5;
  });

  // Forward pass animation
  function forwardPass(){
    // Reset all
    allNodes.flat().forEach(n=>{
      n.userData.activation = 0;
      n.material.color.setHex(0x222831);
      n.userData.halo.material.color.setHex(COLORS.accent);
      n.userData.halo.material.opacity = 0.15;
    });
    allEdges.forEach(e => e.line && (e.line.material.opacity = 0.18));

    layers.forEach((count, li)=>{
      setTimeout(()=>{
        const nodes = allNodes[li];
        // Light up edges going INTO this layer
        if(li > 0){
          const liveEdges = [];
          // pick ~each node's strongest connection
          nodes.forEach(n=>{
            const incoming = [];
            // find some edges ending in n
            // simpler: pick random previous-layer node
            const prev = allNodes[li-1];
            const numConn = 2 + Math.floor(Math.random()*3);
            for(let k=0;k<numConn;k++){
              const src = prev[Math.floor(Math.random()*prev.length)];
              liveEdges.push({src, dst:n});
            }
          });
          liveEdges.forEach((e, idx)=>{
            // create a temporary signal mesh that travels src→dst
            const sphere = new THREE.Mesh(
              new THREE.SphereGeometry(0.08, 8, 8),
              new THREE.MeshBasicMaterial({ color: COLORS.cyan, transparent:true, opacity:0.9 })
            );
            sphere.position.copy(e.src.position);
            group.add(sphere);
            anime({
              targets: sphere.position,
              x: e.dst.position.x,
              y: e.dst.position.y,
              z: e.dst.position.z,
              duration: 600,
              delay: idx * 6,
              easing: 'easeOutCubic',
              complete: ()=>{
                group.remove(sphere);
                sphere.geometry.dispose();
                sphere.material.dispose();
              }
            });
          });
        }

        // Light up nodes themselves with stagger (anime.js)
        nodes.forEach((n, i)=>{
          anime({
            targets: n.userData,
            activation: [0, 1, 0.7],
            duration: 1100,
            delay: i * 40 + 200,
            easing: 'easeOutQuad',
            update: ()=>{
              const a = n.userData.activation;
              const c = new THREE.Color().lerpColors(
                new THREE.Color(0x222831),
                new THREE.Color(li === layers.length-1 ? COLORS.magenta : COLORS.accent),
                a
              );
              n.material.color.copy(c);
              n.userData.halo.material.opacity = 0.15 + a*0.5;
              n.scale.setScalar(1 + a*0.6);
              n.userData.halo.scale.setScalar(1 + a*0.8);
            },
            complete: ()=>{ n.scale.setScalar(1); n.userData.halo.scale.setScalar(1); }
          });
        });
      }, li * 700);
    });
  }

  // Hook up button
  const btn = document.getElementById('s1-btn');
  if(btn){
    btn.addEventListener('click', forwardPass);
  }
  // Auto-fire once
  setTimeout(forwardPass, 800);
  // Loop every 6s
  setInterval(forwardPass, 6000);

  // Animate
  const clock = new THREE.Clock();
  function tick(){
    const t = clock.getElapsedTime();
    group.rotation.y = Math.sin(t*0.15) * 0.18 + mx * 0.4;
    group.rotation.x = Math.cos(t*0.12) * 0.06 + my * 0.2;
    aurora.rotation.y = t*0.02;
    aurora.rotation.x = t*0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // Resize
  function onResize(){
    if(!root.clientWidth) return;
    camera.aspect = W()/H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }
  window.addEventListener('resize', onResize);
  new ResizeObserver(onResize).observe(root);
})();

/* Sample 5: Code → Insight type morph — anime.js
   Two states displayed: a code snippet and a strategic insight.
   Characters fade/scramble between the two with stagger. */

(function(){
  const root = document.getElementById('scene-5');
  if(!root) return;

  const STATES = [
    {
      label: "code",
      lines: [
        "def predict_churn(user):",
        "    x = featurize(user)",
        "    p = model.predict_proba(x)",
        "    return p[1]"
      ],
      tag: "Python · production",
      cls: "mono"
    },
    {
      label: "insight",
      lines: [
        "8.4% of revenue lives",
        "in 412 high-risk accounts.",
        "We'll save 60% of it",
        "with a one-touch intervention."
      ],
      tag: "Board memo · Q3",
      cls: "serif"
    },
    {
      label: "decision",
      lines: [
        "Ship a save-flow.",
        "$2.1M lift, 11 days,",
        "owned by Growth.",
        "Approved."
      ],
      tag: "Decision log · #047",
      cls: "serif"
    }
  ];

  // Layout
  const wrap = document.createElement('div');
  wrap.className = 's5-wrap';
  wrap.innerHTML = `
    <div class="s5-tag" id="s5-tag"></div>
    <div class="s5-lines" id="s5-lines"></div>
    <div class="s5-controls">
      <button class="btn-ghost" data-state="0">def predict_churn()</button>
      <button class="btn-ghost" data-state="1">$2.1M insight</button>
      <button class="btn-ghost" data-state="2">decision log</button>
    </div>
  `;
  root.appendChild(wrap);

  const linesEl = wrap.querySelector('#s5-lines');
  const tagEl = wrap.querySelector('#s5-tag');
  const buttons = wrap.querySelectorAll('button');

  let cur = 0;

  function render(state){
    linesEl.className = 's5-lines ' + state.cls;
    tagEl.textContent = state.tag;
    linesEl.innerHTML = '';
    state.lines.forEach((line, li)=>{
      const row = document.createElement('div');
      row.className = 's5-row';
      [...line].forEach(ch=>{
        const span = document.createElement('span');
        span.className = 's5-ch';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        row.appendChild(span);
      });
      linesEl.appendChild(row);
    });

    const chars = linesEl.querySelectorAll('.s5-ch');
    // Scramble out + in
    anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      delay: anime.stagger(8, { grid: [40, state.lines.length], from: 'center' }),
      duration: 700,
      easing: 'easeOutCubic'
    });
    // Random scramble during reveal
    chars.forEach((c, i)=>{
      const target = c.textContent;
      if(target === '\u00A0' || /[(){}.,:;'"\-=*+]/.test(target)) return;
      const pool = '!@#$%^&*<>{}[]αβγδ∑∂∇';
      let n = 0;
      const id = setInterval(()=>{
        c.textContent = pool[Math.floor(Math.random()*pool.length)];
        n++;
        if(n > 4 + Math.random()*3){
          c.textContent = target;
          clearInterval(id);
        }
      }, 40);
    });
  }

  function go(idx){
    cur = idx;
    buttons.forEach((b,i)=> b.classList.toggle('primary', i===idx));
    render(STATES[idx]);
  }

  buttons.forEach((b,i)=> b.addEventListener('click', ()=> go(i)));

  go(0);
  let auto = setInterval(()=>{
    cur = (cur+1) % STATES.length;
    go(cur);
  }, 5500);

  root.addEventListener('mouseenter', ()=> { clearInterval(auto); auto = null; });
})();

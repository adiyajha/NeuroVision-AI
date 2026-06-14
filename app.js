/**
 * NeuroVision AI - Interactive Website Scripts
 * Features:
 * - Canvas-based dynamic neural network background
 * - Responsive SVG line connectors for system architecture
 * - Diagnostics Terminal controller
 * - Synchronized live CCTV simulation & Chart.js CPU benchmark
 * - Scroll-reveal elements and number tickers
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollAnimations();
  initArchitectureDiagram();
  initDashboardSimulation();
  initNavbarScroll();
});

/* ==========================================================================
   1. Canvas-Based Neural Network Background
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  const particleCount = Math.min(60, Math.floor((width * height) / 20000));
  const connectionDistance = 120;
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.fill();
    }
  }
  
  // Initialize
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();
      
      // Connect to mouse
      if (mouse.x !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(138, 43, 226, ${0.15 * (1 - dist / 180)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Connect to other particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 * (1 - dist / connectionDistance)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* ==========================================================================
   2. Scroll Animations & Count-Up Tickers
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        
        // Trigger count-up if card contains count-up classes
        const counters = entry.target.querySelectorAll('.count-up');
        counters.forEach(counter => triggerCountUp(counter));
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

function triggerCountUp(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1200; // ms
  const stepTime = 15;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
      clearInterval(timer);
    } else {
      counter.innerText = Math.floor(current) + (counter.innerText.includes('%') ? '%' : '');
    }
  }, stepTime);
}

/* ==========================================================================
   3. Interactive Architecture Diagram
   ========================================================================== */
const nodeDiagnostics = {
  'node-camera': {
    title: 'CCTV / Phone Source',
    log: [
      '[INIT] Querying hardware media stream list...',
      '[STREAM] Cam-03 connected via RTSP protocol.',
      '[METRIC] Capture resolution: 1080p @ 30 FPS.',
      '[STATUS] Low-power acquisition thread listening.'
    ]
  },
  'node-opencv': {
    title: 'OpenCV Capture',
    log: [
      '[CV] Frame capture loop initialized.',
      '[DECODE] Hardware-accelerated frame decoding active.',
      '[BUFFER] Multi-buffer cache initialized (capacity: 5 frames).',
      '[STATUS] Streaming decoded frame matrices asynchronously.'
    ]
  },
  'node-diff': {
    title: 'Difference Engine',
    log: [
      '[DIFF] Frame comparison subtractor loaded.',
      '[CONFIG] Threshold delta limit set to 1.5% pixels.',
      '[PROCESS] Computing frame matrix subtraction (MatDiff).',
      '[STATUS] Suppressing static backgrounds. Delta: 0.04%.'
    ]
  },
  'node-motion': {
    title: 'Motion Event Detector',
    log: [
      '[DETECTOR] Listening for active delta spikes...',
      '[CHECK] Delta threshold crossed? [NO]',
      '[SLEEP] Keeping main worker threads suspended.',
      '[STATUS] Background check reports zero active movement.'
    ]
  },
  'node-queue': {
    title: 'Spike Event Queue',
    log: [
      '[QUEUE] Spike FIFO queue initialized.',
      '[BUFFER] Async channel buffer capacity: 64 spikes.',
      '[METRIC] Current queue length: 0 spikes.',
      '[STATUS] Idle. Awaiting signal spikes from Detector.'
    ]
  },
  'node-async': {
    title: 'Asynchronous Processor',
    log: [
      '[PROCESSOR] Worker event loop running on uv loop.',
      '[TASK] Multi-camera streams pooled concurrently.',
      '[STATUS] Waiting to spin detection tasks asynchronously.'
    ]
  },
  'node-yolo': {
    title: 'YOLOv8 Nano Classifier',
    log: [
      '[AI] YOLOv8 Nano model weights loaded in RAM.',
      '[MEM] Allocating 12MB virtual space for inference.',
      '[INFERENCE] Awaiting active frame trigger (SLEEP active).',
      '[STATUS] Inactive. Idle model consumes 0% CPU cycles.'
    ]
  },
  'node-threat': {
    title: 'Threat Rules Analyzer',
    log: [
      '[ANALYZER] Threat lookup vector rules initialized.',
      '[ZONE] Guard boundaries mapped (indoor/perimeter coordinates).',
      '[STATUS] Standing by for classification triggers.'
    ]
  },
  'node-db': {
    title: 'SQLite DB Logger',
    log: [
      '[DB] Connecting to local SQLite db file...',
      '[TABLE] EventLog schema validated.',
      '[IO] Fast file system logger initialized.',
      '[STATUS] Ready to commit JSON records to disk.'
    ]
  },
  'node-dashboard': {
    title: 'FastAPI Dashboard',
    log: [
      '[DASHBOARD] FastAPI server hosting dashboard at :8000',
      '[SOCKET] SSE stream opened. Connections: 1 active client.',
      '[STATUS] Visual charts rendering systems statistics.'
    ]
  }
};

function initArchitectureDiagram() {
  const viewport = document.getElementById('arch-viewport');
  const nodes = document.querySelectorAll('.arch-node');
  const terminal = document.getElementById('terminal-screen');
  const activeNodeIdLabel = document.getElementById('active-node-id');
  
  if (!viewport || nodes.length === 0) return;
  
  const connections = [
    ['node-camera', 'node-opencv'],
    ['node-opencv', 'node-diff'],
    ['node-diff', 'node-motion'],
    ['node-motion', 'node-queue'],
    ['node-queue', 'node-async'],
    ['node-async', 'node-yolo'],
    ['node-yolo', 'node-threat'],
    ['node-threat', 'node-db'],
    ['node-db', 'node-dashboard'],
    ['node-threat', 'node-dashboard']
  ];
  
  // Render connection lines SVG
  function drawLines() {
    const svg = document.getElementById('arch-lines');
    if (!svg) return;
    
    // Clear old lines
    const paths = svg.querySelectorAll('.connection-line');
    paths.forEach(p => p.remove());
    
    const viewRect = viewport.getBoundingClientRect();
    
    connections.forEach(pair => {
      const n1 = document.getElementById(pair[0]);
      const n2 = document.getElementById(pair[1]);
      
      if (!n1 || !n2) return;
      
      const r1 = n1.getBoundingClientRect();
      const r2 = n2.getBoundingClientRect();
      
      const x1 = r1.left - viewRect.left + r1.width / 2;
      const y1 = r1.top - viewRect.top + r1.height / 2;
      const x2 = r2.left - viewRect.left + r2.width / 2;
      const y2 = r2.top - viewRect.top + r2.height / 2;
      
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // Calculate curve control points for smooth routing
      let d = '';
      if (Math.abs(y1 - y2) < 20) {
        d = `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        const midX = (x1 + x2) / 2;
        d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
      }
      
      pathEl.setAttribute('d', d);
      pathEl.setAttribute('class', 'connection-line');
      
      // If destination node is active, highlight the line
      if (n2.classList.contains('active-node')) {
        pathEl.classList.add('active-line');
      }
      
      svg.appendChild(pathEl);
    });
  }
  
  // Node click handlers
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active-node'));
      node.classList.add('active-node');
      
      // Draw lines to update active lines
      drawLines();
      
      // Update terminal screen
      const data = nodeDiagnostics[node.id];
      if (data) {
        activeNodeIdLabel.innerText = node.id;
        terminal.innerHTML = '';
        
        // Output title
        const titleLine = document.createElement('div');
        titleLine.className = 'terminal-line text-white fw-bold mb-2';
        titleLine.innerText = `>>> Spec: ${data.title} <<<`;
        terminal.appendChild(titleLine);
        
        // Output log lines sequentially
        data.log.forEach((line, index) => {
          setTimeout(() => {
            const lineEl = document.createElement('div');
            
            if (line.includes('[INIT]')) lineEl.className = 'terminal-line text-muted';
            else if (line.includes('[STATUS]')) lineEl.className = 'terminal-line text-success fw-semibold';
            else if (line.includes('[ALERT]') || line.includes('[CHECK]')) lineEl.className = 'terminal-line text-warning';
            else lineEl.className = 'terminal-line text-info';
            
            lineEl.innerText = line;
            terminal.appendChild(lineEl);
            terminal.scrollTop = terminal.scrollHeight;
          }, index * 200);
        });
      }
    });
  });
  
  // Draw lines initial & resize
  setTimeout(drawLines, 100);
  window.addEventListener('resize', drawLines);
  
  // Trigger line redraw on scroll just in case layout shifts
  window.addEventListener('scroll', drawLines);
}

/* ==========================================================================
   4. Live CCTV Simulation & Chart.js Benchmark Graphs
   ========================================================================== */
function initDashboardSimulation() {
  const canvas = document.getElementById('feed-canvas');
  const alertContainer = document.getElementById('alerts-log-container');
  const fpsLabel = document.getElementById('feed-fps-label');
  
  // Mini Metrics Elements
  const totalEventsEl = document.getElementById('stat-events');
  const humansEl = document.getElementById('stat-humans');
  const skippedEl = document.getElementById('stat-skipped');
  
  if (!canvas || !alertContainer) return;
  const ctx = canvas.getContext('2d');
  
  let frameCount = 0;
  let skippedFrames = 178240;
  let totalEvents = 48;
  let humanDetections = 18;
  
  // Simulation states: 'SLEEP', 'WAKING', 'ACTIVE', 'COOLDOWN'
  let systemState = 'SLEEP'; 
  let stateTimer = 0;
  let targetFPS = 0;
  let currentFPS = 0;
  
  // Human target simulation coordinates
  let targetX = 0;
  let targetY = 150;
  let targetRadius = 30;
  let detectionBoxAlpha = 0;
  
  // Setup Chart.js Benchmark Graph
  const chartCtx = document.getElementById('benchmark-chart');
  if (!chartCtx) return;
  
  const chartDataPoints = 25;
  const timeLabels = Array.from({length: chartDataPoints}, (_, i) => `${i}s`);
  const tradData = Array(chartDataPoints).fill(88); // Traditional CCTV constant load
  const nvData = Array(chartDataPoints).fill(2.5); // NeuroVision low idle load
  
  const benchmarkChart = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: 'Traditional CCTV CPU %',
          data: tradData,
          borderColor: '#ff007f',
          backgroundColor: 'rgba(255, 0, 127, 0.02)',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: true
        },
        {
          label: 'NeuroVision AI CPU %',
          data: nvData,
          borderColor: '#00f0ff',
          backgroundColor: 'rgba(0, 240, 255, 0.05)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#6b7280', font: { family: 'Space Grotesk' } }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#6b7280', font: { family: 'Space Grotesk' } }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#f3f4f6', font: { family: 'Outfit', size: 12 } }
        }
      }
    }
  });

  // Log message helper
  function addDashboardLog(message, type = 'info') {
    const logItem = document.createElement('div');
    const borderClass = type === 'warning' ? 'db-alert-item-warning' : 'db-alert-item-info';
    const iconHTML = type === 'warning' 
      ? '<span class="db-alert-icon db-alert-icon-warning"><i class="fa-solid fa-triangle-exclamation"></i></span>'
      : '<span class="db-alert-icon db-alert-icon-info"><i class="fa-solid fa-circle-info"></i></span>';
    
    const timeString = new Date().toLocaleTimeString();
    
    logItem.className = `db-alert-item ${borderClass}`;
    logItem.innerHTML = `
      ${iconHTML}
      <div class="db-alert-details">
        <div class="db-alert-msg text-white">${message}</div>
        <div class="db-alert-time">${timeString} - CPU load ~${currentFPS > 0 ? (20 + Math.random()*25).toFixed(1) : (1.5 + Math.random()*1).toFixed(1)}%</div>
      </div>
    `;
    
    alertContainer.insertBefore(logItem, alertContainer.firstChild);
    
    // Prune logs if list exceeds 6
    while (alertContainer.children.length > 6) {
      alertContainer.lastChild.remove();
    }
  }

  // Draw simulated warehouse canvas background
  function drawCCTVScene() {
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    
    // Clear
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, w, h);
    
    // Draw warehouse lines/grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    // floor
    ctx.beginPath();
    ctx.moveTo(0, h * 0.75);
    ctx.lineTo(w, h * 0.75);
    // doors/shelves outlines
    ctx.moveTo(w * 0.2, h * 0.75);
    ctx.lineTo(w * 0.2, h * 0.3);
    ctx.lineTo(w * 0.4, h * 0.35);
    ctx.lineTo(w * 0.4, h * 0.75);
    
    ctx.moveTo(w * 0.7, h * 0.75);
    ctx.lineTo(w * 0.7, h * 0.25);
    ctx.lineTo(w * 0.85, h * 0.28);
    ctx.lineTo(w * 0.85, h * 0.75);
    ctx.stroke();
    
    // Camera details HUD
    ctx.font = '11px Space Grotesk';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('NEUROVISION CAM-03 LOBBY GATE', 20, 30);
    ctx.fillText(new Date().toLocaleString(), 20, 45);
    
    // Static overlay if sleeping
    if (systemState === 'SLEEP') {
      ctx.fillStyle = 'rgba(0, 240, 255, 0.015)';
      ctx.fillRect(0, 0, w, h);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
    }
    
    // Render target human
    if (systemState === 'ACTIVE' || systemState === 'COOLDOWN') {
      ctx.beginPath();
      // Draw human representation vector
      ctx.arc(targetX, targetY - 20, 10, 0, Math.PI * 2); // Head
      ctx.moveTo(targetX, targetY - 10);
      ctx.lineTo(targetX, targetY + 20); // Body
      ctx.moveTo(targetX - 15, targetY);
      ctx.lineTo(targetX + 15, targetY); // Arms
      ctx.moveTo(targetX, targetY + 20);
      ctx.lineTo(targetX - 10, targetY + 45); // Left leg
      ctx.moveTo(targetX, targetY + 20);
      ctx.lineTo(targetX + 10, targetY + 45); // Right leg
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Bounding box indicator
      if (detectionBoxAlpha > 0) {
        ctx.strokeStyle = `rgba(57, 255, 20, ${detectionBoxAlpha})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(targetX - 25, targetY - 35, 50, 85);
        
        ctx.fillStyle = `rgba(57, 255, 20, ${detectionBoxAlpha})`;
        ctx.font = '10px Space Grotesk';
        ctx.fillText('HUMAN 94%', targetX - 25, targetY - 42);
      }
    }
  }
  
  // Simulation Loop Timer ticks
  setInterval(() => {
    stateTimer++;
    frameCount++;
    
    // State transitions
    if (systemState === 'SLEEP') {
      targetFPS = 0;
      currentFPS = 0;
      skippedFrames += 30; // Skipped processing entirely
      skippedEl.innerText = skippedFrames.toLocaleString();
      fpsLabel.className = 'db-video-tag text-muted';
      fpsLabel.innerText = 'SLEEP (0 FPS)';
      
      // Trigger waking up event after ~7 seconds
      if (stateTimer > 7) {
        systemState = 'WAKING';
        stateTimer = 0;
        addDashboardLog('Motion detected: Frame delta 11.4% (Threshold: 1.5%)', 'warning');
      }
    } 
    else if (systemState === 'WAKING') {
      targetFPS = 30;
      currentFPS = 30;
      fpsLabel.className = 'db-video-tag db-video-tag-live';
      fpsLabel.innerText = 'WAKE (30 FPS)';
      
      // Transition to active detection
      if (stateTimer > 2) {
        systemState = 'ACTIVE';
        stateTimer = 0;
        targetX = 30; // Start at left boundary of warehouse
        targetY = canvas.height * 0.55 || 150;
        detectionBoxAlpha = 0;
        
        totalEvents++;
        humanDetections++;
        totalEventsEl.innerText = totalEvents;
        humansEl.innerText = humanDetections;
        
        addDashboardLog('YOLOv8 active - Tag: Human classified (94% confidence)', 'warning');
      }
    } 
    else if (systemState === 'ACTIVE') {
      // Human moves across the screen
      targetX += (canvas.width / 5.5) / 10; // Reach other side in 5.5s
      detectionBoxAlpha = Math.min(1, detectionBoxAlpha + 0.1);
      
      fpsLabel.innerText = 'YOLO RUNNING (30 FPS)';
      
      // Complete crossing
      if (targetX > canvas.width - 30) {
        systemState = 'COOLDOWN';
        stateTimer = 0;
        addDashboardLog('Intruder left grid frame CAM-03. Core cooling...', 'info');
      }
    } 
    else if (systemState === 'COOLDOWN') {
      detectionBoxAlpha = Math.max(0, detectionBoxAlpha - 0.1);
      fpsLabel.innerText = 'COOLING (15 FPS)';
      
      if (stateTimer > 3) {
        systemState = 'SLEEP';
        stateTimer = 0;
        addDashboardLog('No motion. Putting AI core to sleep mode.', 'info');
      }
    }
    
    // Draw canvas scene frame
    drawCCTVScene();
    
    // Dynamic CPU metrics calculations to feed Chart
    let newCpuValue = 1.8;
    if (systemState === 'WAKING') newCpuValue = 28.5;
    else if (systemState === 'ACTIVE') newCpuValue = 42.0 + Math.random() * 8;
    else if (systemState === 'COOLDOWN') newCpuValue = 12.0;
    else newCpuValue = 1.2 + Math.random() * 0.8;
    
    // Shift chart points
    nvData.shift();
    nvData.push(newCpuValue);
    
    benchmarkChart.update('none'); // Update without full redraw transitions for 60FPS speed
    
  }, 1000 / 30); // Run loop at 30Hz ticker rate
}

/* ==========================================================================
   5. Navbar Scroll Class & Active Link Tracking
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    // Scroll glass shift class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active navigation item tracking (Scroll-spy)
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

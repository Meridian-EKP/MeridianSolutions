"use client";

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

interface MobileStarfieldProps {
  width?: string;
  height?: string;
  className?: string;
  particleCount?: number;
  flareCount?: number;
  color?: string;
  linkChance?: number;
  renderParticles?: boolean;
  renderFlares?: boolean;
  renderLinks?: boolean;
  flicker?: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
  opacity: number;
  flicker: number;
  neighbors: number[];
  render: () => void;
}

interface Flare {
  x: number;
  y: number;
  z: number;
  color: string;
  opacity: number;
  render: () => void;
}

interface Link {
  length: number;
  verts: number[];
  stage: number;
  linked: number[];
  distances: number[];
  traveled: number;
  fade: number;
  finished: boolean;
  render: () => void;
  drawLine: (points: [number, number][], alpha?: number) => void;
}

interface Constellation {
  id: number;
  stars: number[];
  path: [number, number][];
  progress: number;
  fade: number;
  duration: number;
  startTime: number;
  finished: boolean;
  render: () => void;
}

const MobileStarfield: React.FC<MobileStarfieldProps> = ({
  width = "100%",
  height = "100%",
  className = "",
  particleCount = 40,
  flareCount = 10,
  color = '#FFEED4',
  linkChance = 75,
  renderParticles = true,
  renderFlares = true,
  renderLinks = true,
  flicker = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Animation state
  const stateRef = useRef({
    mouse: { x: 0, y: 0 },
    n: 0,
    nAngle: (Math.PI * 2) / 1000,
    nRad: 100,
    nScale: 0.5,
    nPos: { x: 0, y: 0 },
    particles: [] as Particle[],
    flares: [] as Flare[],
    links: [] as Link[],
    constellations: [] as Constellation[],
    points: [] as [number, number][],
    vertices: [] as number[],
    triangles: [] as number[][],
    constellationId: 0,
  });

  // Mobile-optimized settings
  const settings = useMemo(() => {
    return {
      motion: 0.01, // Increased motion for more dynamic stars on mobile
      tilt: 0.01, // Much less tilt on mobile to keep stars in view
      particleSizeBase: 1, // Keep particle size at 1
      particleSizeMultiplier: 0.3, // Larger multiplier for more visible stars on mobile
      flareSizeBase: 20, // Much smaller flares on mobile
      flareSizeMultiplier: 20, // Much smaller flares on mobile
      lineWidth: 1, // Keep line width at 1
      linkLengthMin: 3, // Shorter links on mobile
      linkLengthMax: 5, // Shorter links on mobile
      linkOpacity: 0.4, // More visible links on mobile
      linkFade: 60, // Faster fade on mobile
      linkSpeed: 0.8, // Slower link speed on mobile
      glareAngle: -60,
      glareOpacityMultiplier: 0.08, // More prominent glare on mobile
      renderParticleGlare: true,
      flickerSmoothing: 10, // Less flicker smoothing on mobile
      blurSize: 0,
      noiseLength: 500, // Shorter noise on mobile
      noiseStrength: 1.5, // Stronger noise on mobile
    };
  }, []);

  // Utility functions
  const random = useCallback((min: number, max: number, float?: boolean): number => {
    return float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const noisePoint = useCallback((i: number) => {
    const a = stateRef.current.nAngle * i;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    const rad = stateRef.current.nRad;
    return {
      x: rad * cosA,
      y: rad * sinA,
    };
  }, []);

  const position = useCallback((x: number, y: number, z: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    // Ensure z has a minimum value to prevent static stars
    const effectiveZ = Math.max(z, 0.1);
    
    return {
      x: (x * canvas.width) + ((((canvas.width / 2) - stateRef.current.mouse.x + ((stateRef.current.nPos.x - 0.5) * settings.noiseStrength)) * effectiveZ) * settings.motion),
      y: (y * canvas.height) + ((((canvas.height / 2) - stateRef.current.mouse.y + ((stateRef.current.nPos.y - 0.5) * settings.noiseStrength)) * effectiveZ) * settings.motion),
    };
  }, [settings.motion, settings.noiseStrength]);

  const sizeRatio = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 1000;
    return canvas.width >= canvas.height ? canvas.width : canvas.height;
  }, []);

  // Simple Delaunay triangulation (simplified version)
  const simpleTriangulation = useCallback((points: [number, number][]) => {
    const vertices: number[] = [];
    const triangles: number[][] = [];
    
    // Create simple triangulation (this is a simplified version)
    for (let i = 0; i < points.length - 2; i += 3) {
      if (i + 2 < points.length) {
        vertices.push(i, i + 1, i + 2);
        triangles.push([i, i + 1, i + 2]);
      }
    }
    
    return { vertices, triangles };
  }, []);

  // Create constellation
  const createConstellation = useCallback((): Constellation => {
    const starCount = 3; // Strict 3 stars for mobile constellation lines
    const stars: number[] = [];
    
    // Select random stars for the constellation
    for (let i = 0; i < starCount; i++) {
      let starIndex;
      do {
        starIndex = random(0, stateRef.current.particles.length - 1);
      } while (stars.includes(starIndex));
      stars.push(starIndex);
    }
    
    const constellation: Constellation = {
      id: stateRef.current.constellationId++,
      stars,
      path: [], // Will be calculated dynamically each frame
      progress: 0,
      fade: 0,
      duration: random(12000, 15000), // More consistent speed for mobile constellation lines
      startTime: Date.now(),
      finished: false,
      render: function() {
        const ctx = contextRef.current;
        if (!ctx || this.finished) return;
        
        const elapsed = Date.now() - this.startTime;
        this.progress = Math.min(elapsed / this.duration, 1);
        
        if (this.progress >= 1) {
          this.fade += 0.15; // Much faster fade on mobile to prevent lingering
          if (this.fade >= 1) {
            this.finished = true;
            return;
          }
        }
        
        // Calculate alpha based on progress and fade
        let alpha = 0.3; // Base opacity
        if (this.progress < 0.3) {
          alpha *= this.progress / 0.3; // Fade in
        } else if (this.progress > 0.7) {
          alpha *= (1 - this.progress) / 0.3; // Fade out
        }
        alpha *= (1 - this.fade); // Apply fade out
        
        if (alpha <= 0) return;
        
        // Calculate current star positions dynamically to track movement
        const currentPath: [number, number][] = [];
        for (let i = 0; i < this.stars.length; i++) {
          const star = stateRef.current.particles[this.stars[i]];
          if (star) {
            const pos = position(star.x, star.y, star.z);
            currentPath.push([pos.x, pos.y]);
          }
        }
        
        if (currentPath.length < 2) return;
        
        // Draw constellation line
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // Force white color for constellation lines
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 3;
        
        ctx.beginPath();
        for (let i = 0; i < currentPath.length - 1; i++) {
          const current = currentPath[i];
          const next = currentPath[i + 1];
          
          // Calculate progress along this segment
          const segmentProgress = Math.max(0, Math.min(1, (this.progress - i * 0.2) / 0.2));
          
          if (segmentProgress > 0) {
            const endX = current[0] + (next[0] - current[0]) * segmentProgress;
            const endY = current[1] + (next[1] - current[1]) * segmentProgress;
            
            if (i === 0) {
              ctx.moveTo(current[0], current[1]);
            }
            ctx.lineTo(endX, endY);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    };
    
    return constellation;
  }, [position, random]);

  // Particle class
  const createParticle = useCallback((): Particle => {
    const particle: Particle = {
      x: random(-0.1, 1.1, true), // Full coverage across mobile starfield
      y: random(-0.1, 1.1, true), // Full coverage across mobile starfield
      z: random(0.1, 3, true), // Wider z range for more visible stars on mobile
      color,
      opacity: random(0.1, 1, true),
      flicker: 0,
      neighbors: [],
      render: function() {
        const pos = position(this.x, this.y, this.z);
        const r = ((this.z * settings.particleSizeMultiplier) + settings.particleSizeBase) * (sizeRatio() / 1000);
        let o = this.opacity;

        if (flicker) {
          const newVal = random(-0.5, 0.5, true);
          this.flicker += (newVal - this.flicker) / settings.flickerSmoothing;
          if (this.flicker > 0.5) this.flicker = 0.5;
          if (this.flicker < -0.5) this.flicker = -0.5;
          o += this.flicker;
          if (o > 1) o = 1;
          if (o < 0) o = 0;
        }

        const ctx = contextRef.current;
        if (!ctx) return;

        ctx.fillStyle = this.color;
        ctx.globalAlpha = o;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

        if (settings.renderParticleGlare) {
          ctx.globalAlpha = o * settings.glareOpacityMultiplier;
          ctx.ellipse(
            pos.x, 
            pos.y, 
            r * 30, 
            r, 
            (settings.glareAngle - ((stateRef.current.nPos.x - 0.5) * settings.noiseStrength * settings.motion)) * (Math.PI / 180), 
            0, 
            2 * Math.PI, 
            false
          );
          ctx.fill();
          ctx.closePath();
        }
        ctx.globalAlpha = 1;
      },
    };
    return particle;
  }, [color, flicker, position, sizeRatio, settings, random]);

  // Flare class
  const createFlare = useCallback((): Flare => {
    const flare: Flare = {
      x: random(-0.25, 1.25, true),
      y: random(-0.25, 1.25, true),
      z: random(0.1, 2, true), // Ensure minimum z value to prevent static flares
      color,
      opacity: random(0.001, 0.01, true),
      render: function() {
        const pos = position(this.x, this.y, this.z);
        const r = ((this.z * settings.flareSizeMultiplier) + settings.flareSizeBase) * (sizeRatio() / 1000);
        
        const ctx = contextRef.current;
        if (!ctx) return;

        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
      },
    };
    return flare;
  }, [color, position, sizeRatio, settings, random]);

  // Link class
  const createLink = useCallback((startVertex: number, numPoints: number): Link => {
    const link: Link = {
      length: numPoints,
      verts: [startVertex],
      stage: 0,
      linked: [startVertex],
      distances: [],
      traveled: 0,
      fade: 0,
      finished: false,
      render: function() {
        const ctx = contextRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;

        switch (this.stage) {
          case 0: // Vertex collection
            const last = stateRef.current.particles[this.verts[this.verts.length - 1]];
            if (last && last.neighbors && last.neighbors.length > 0) {
              const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
              if (this.verts.indexOf(neighbor) === -1) {
                this.verts.push(neighbor);
              }
            } else {
              this.stage = 3;
              this.finished = true;
            }
            
            if (this.verts.length >= this.length) {
              for (let i = 0; i < this.verts.length - 1; i++) {
                const p1 = stateRef.current.particles[this.verts[i]];
                const p2 = stateRef.current.particles[this.verts[i + 1]];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                this.distances.push(dist);
              }
              this.stage = 1;
            }
            break;

          case 1: // Render line animation
            if (this.distances.length > 0) {
              const points: [number, number][] = [];
              
              for (let i = 0; i < this.linked.length; i++) {
                const p = stateRef.current.particles[this.linked[i]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);
              }

              const linkSpeedRel = settings.linkSpeed * 0.00001 * canvas.width;
              this.traveled += linkSpeedRel;
              const d = this.distances[this.linked.length - 1];

              if (this.traveled >= d) {
                this.traveled = 0;
                this.linked.push(this.verts[this.linked.length]);
                const p = stateRef.current.particles[this.linked[this.linked.length - 1]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);

                if (this.linked.length >= this.verts.length) {
                  this.stage = 2;
                }
              } else {
                const a = stateRef.current.particles[this.linked[this.linked.length - 1]];
                const b = stateRef.current.particles[this.verts[this.linked.length]];
                const t = d - this.traveled;
                const x = ((this.traveled * b.x) + (t * a.x)) / d;
                const y = ((this.traveled * b.y) + (t * a.y)) / d;
                const z = ((this.traveled * b.z) + (t * a.z)) / d;
                const pos = position(x, y, z);
                points.push([pos.x, pos.y]);
              }
              this.drawLine(points);
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 2: // Fade out
            if (this.verts.length > 1) {
              if (this.fade < settings.linkFade) {
                this.fade++;
                const points: [number, number][] = [];
                const alpha = (1 - (this.fade / settings.linkFade)) * settings.linkOpacity;
                
                for (let i = 0; i < this.verts.length; i++) {
                  const p = stateRef.current.particles[this.verts[i]];
                  const pos = position(p.x, p.y, p.z);
                  points.push([pos.x, pos.y]);
                }
                this.drawLine(points, alpha);
              } else {
                this.stage = 3;
                this.finished = true;
              }
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 3: // Finished
          default:
            this.finished = true;
            break;
        }
      },
      drawLine: function(points: [number, number][], alpha?: number) {
        const ctx = contextRef.current;
        if (!ctx) return;
        
        const opacity = typeof alpha === 'number' ? alpha : settings.linkOpacity;
        if (points.length > 1 && opacity > 0) {
          ctx.save(); // Save context state
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          for (let i = 0; i < points.length - 1; i++) {
            ctx.moveTo(points[i][0], points[i][1]);
            ctx.lineTo(points[i + 1][0], points[i + 1][1]);
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // Force white color for regular links
          ctx.lineWidth = settings.lineWidth;
          ctx.stroke();
          ctx.closePath();
          ctx.restore(); // Restore context state to prevent color bleeding
        }
      },
    };
    return link;
  }, [position, settings, random]);

  const startLink = useCallback((vertex: number, length: number) => {
    stateRef.current.links.push(createLink(vertex, length));
  }, [createLink]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get the container size (the div that contains the canvas)
    const container = canvas.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set the canvas size in memory (scaled up for retina displays)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Set the CSS size to match the display size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    // Reset the context transform and scale properly
    const ctx = contextRef.current;
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr); // Apply device pixel ratio scaling
    }
    
    // Update mouse position to center if not set
    if (stateRef.current.mouse.x === 0 && stateRef.current.mouse.y === 0) {
      stateRef.current.mouse.x = rect.width / 2;
      stateRef.current.mouse.y = rect.height / 2;
    }
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Update noise position
    stateRef.current.n++;
    if (stateRef.current.n >= settings.noiseLength) {
      stateRef.current.n = 0;
    }
    stateRef.current.nPos = noisePoint(stateRef.current.n);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (settings.blurSize > 0) {
      ctx.shadowBlur = settings.blurSize;
      ctx.shadowColor = color;
    }

    // Render particles
    if (renderParticles) {
      for (let i = 0; i < stateRef.current.particles.length; i++) {
        stateRef.current.particles[i].render();
      }
    }

    // Render links
    if (renderLinks) {
      if (random(0, linkChance) === linkChance) {
        const length = random(settings.linkLengthMin, settings.linkLengthMax);
        const start = random(0, stateRef.current.particles.length - 1);
        startLink(start, length);
      }

      // Render existing links
      for (let l = stateRef.current.links.length - 1; l >= 0; l--) {
        if (stateRef.current.links[l] && !stateRef.current.links[l].finished) {
          stateRef.current.links[l].render();
        } else {
          stateRef.current.links.splice(l, 1);
        }
      }
    }

    // Render flares
    if (renderFlares) {
      for (let j = 0; j < stateRef.current.flares.length; j++) {
        stateRef.current.flares[j].render();
      }
    }

    // Render constellations
    // Reduced constellation spawning for mobile
    const constellationChance = random(0, 1000);
    const spawnThreshold = 990; // 1% spawn rate on mobile for fewer constellations
    if (constellationChance >= spawnThreshold) {
      const constellation = createConstellation();
      stateRef.current.constellations.push(constellation);
    }

    // Render existing constellations
    for (let c = stateRef.current.constellations.length - 1; c >= 0; c--) {
      if (stateRef.current.constellations[c] && !stateRef.current.constellations[c].finished) {
        stateRef.current.constellations[c].render();
      } else {
        stateRef.current.constellations.splice(c, 1);
      }
    }
  }, [renderParticles, renderLinks, renderFlares, linkChance, color, settings, noisePoint, startLink, random, createConstellation]);

  const animate = useCallback(() => {
    resize();
    render();
    animationRef.current = requestAnimationFrame(animate);
  }, [resize, render]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Account for device pixel ratio in mouse position
    stateRef.current.mouse.x = (e.clientX - rect.left) / dpr;
    stateRef.current.mouse.y = (e.clientY - rect.top) / dpr;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const touch = e.touches[0];
    
    // Account for device pixel ratio in touch position
    stateRef.current.mouse.x = (touch.clientX - rect.left) / dpr;
    stateRef.current.mouse.y = (touch.clientY - rect.top) / dpr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    contextRef.current = ctx;

    // Initialize canvas
    resize();
    
    // Set initial mouse position to center
    const container = canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouse.x = rect.width / 2;
      stateRef.current.mouse.y = rect.height / 2;
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle();
      stateRef.current.particles.push(particle);
      stateRef.current.points.push([particle.x * 1000, particle.y * 1000]);
    }

    // Simple triangulation
    const { vertices, triangles } = simpleTriangulation(stateRef.current.points);
    stateRef.current.vertices = vertices;
    stateRef.current.triangles = triangles;

    // Set up neighbors
    for (let i = 0; i < stateRef.current.particles.length; i++) {
      for (let j = 0; j < triangles.length; j++) {
        const k = triangles[j].indexOf(i);
        if (k !== -1) {
          triangles[j].forEach((value) => {
            if (value !== i && stateRef.current.particles[i].neighbors.indexOf(value) === -1) {
              stateRef.current.particles[i].neighbors.push(value);
            }
          });
        }
      }
    }

    // Create flares
    if (renderFlares) {
      for (let i = 0; i < flareCount; i++) {
        stateRef.current.flares.push(createFlare());
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // Enhanced resize handling
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        // Force a complete redraw after resize
        if (contextRef.current) {
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Force resize after a short delay to ensure proper sizing
    setTimeout(resize, 100);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [particleCount, flareCount, renderFlares, createParticle, createFlare, simpleTriangulation, handleMouseMove, handleTouchMove, animate, resize]);

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default MobileStarfield;

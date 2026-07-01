import React, { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { kicker: 'Prologue', title: 'The Realm Awakens', subtitle: 'A cinematic scroll through Westeros', body: 'Ancient houses rise from smoke, snow, gold and blood. Every step forward pulls the realm closer to the Iron Throne.', sigil: '✦' },
  { kicker: 'The North', title: 'Winter Answers First', subtitle: 'House Stark — Winterfell', body: 'Honour hardens in the cold. The North does not forget, and the wolves still hear the old gods beneath the snow.', sigil: '❄' },
  { kicker: 'The Crown', title: 'Power Has A Price', subtitle: 'King’s Landing — The capital', body: 'In the red keep, whispers become weapons. Crowns are polished with gold, sharpened with fear, and lost in a single night.', sigil: '♛' },
  { kicker: 'The Fire', title: 'Dragons Rewrite History', subtitle: 'Old Valyria — Fire and Blood', body: 'Some dynasties inherit kingdoms. Others burn their names into the sky until the world learns to kneel.', sigil: '◈' },
  { kicker: 'The Throne', title: 'You Win Or You Die', subtitle: 'The end is only another beginning', body: 'A thousand blades point toward one seat. The realm is beautiful, brutal, and waiting for its next ruler.', sigil: '♔' },
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const Hero = () => {
  const containerRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const chapterRefs = useRef([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const [ready, setReady] = useState(false)
  const reducedMotion = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const done = () => setReady(true)
    video.addEventListener('loadedmetadata', done)
    if (video.readyState >= 1) done()
    return () => video.removeEventListener('loadedmetadata', done)
  }, [])

  useEffect(() => {
    if (!ready || reducedMotion) return
    const ctx = gsap.context(() => {
      const video = videoRef.current
      const duration = video?.duration || 1
      const scrollDistance = window.innerHeight * 4.8
      let raf = 0
      let lastSeek = -1

      gsap.set(chapterRefs.current, { autoAlpha: 0, y: 24, filter: 'blur(8px)' })
      gsap.set(chapterRefs.current[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)' })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          const p = clamp(self.progress, 0, 1)
          const nextActive = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length))

          if (nextActive !== activeRef.current) {
            activeRef.current = nextActive
            setActive(nextActive)
          }
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`

          const target = p * duration
          if (Math.abs(target - lastSeek) > 0.12) {
            lastSeek = target
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
              if (video && Math.abs(video.currentTime - target) > 0.10) video.currentTime = target
            })
          }
        },
      })

      chapterRefs.current.forEach((el, index) => {
        if (!el) return
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(index / CHAPTERS.length) * scrollDistance} top`,
            end: `top+=${((index + 0.75) / CHAPTERS.length) * scrollDistance} top`,
            scrub: 0.6,
          },
        })
        if (index > 0) {
          gsap.to(chapterRefs.current[index - 1], {
            autoAlpha: 0,
            y: -24,
            filter: 'blur(8px)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(index / CHAPTERS.length) * scrollDistance - 150} top`,
              end: `top+=${(index / CHAPTERS.length) * scrollDistance + 250} top`,
              scrub: 0.6,
            },
          })
        }
      })

      gsap.fromTo('.hero-stat', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.5 })
      gsap.to('.dragon-glow', { rotate: 360, duration: 40, repeat: -1, ease: 'none' })
    }, containerRef)
    return () => ctx.revert()
  }, [ready, reducedMotion])

  return (
    <section ref={containerRef} className="hero-stage">
      <div className={`loading-gate ${ready ? 'is-hidden' : ''}`}>
        <div className="loader-mark">♔</div>
        <p>Opening the gates of Westeros</p>
      </div>

      <div ref={pinRef} className="hero-pin">
        <video ref={videoRef} className="hero-video" src="/video/one.mp4" muted playsInline preload="metadata" />
        <div className="hero-vignette" />
        <div className="hero-smoke" />
        <div className="dragon-glow" />

        <nav className="hero-nav" aria-label="Main navigation">
          <a href="#top" className="brand">GOT / WESTEROS</a>
          <div className="nav-pill">
            <a href="#houses">Houses</a>
            <a href="#map">Map</a>
            <a href="#relics">Relics</a>
            <a href="#claim">Claim</a>
          </div>
        </nav>

        <div className="chapter-stack">
          {CHAPTERS.map((chapter, index) => (
            <article
              key={chapter.title}
              ref={(el) => { chapterRefs.current[index] = el }}
              className="chapter-card"
              aria-hidden={active !== index}
            >
              <span className="chapter-sigil">{chapter.sigil}</span>
              <p className="chapter-kicker">{chapter.kicker}</p>
              <h1>{chapter.title}</h1>
              <h2>{chapter.subtitle}</h2>
              <p>{chapter.body}</p>
              <div className="chapter-actions">
                <a href="#houses" className="gold-button">Enter the Realm</a>
                <a href="#timeline" className="ghost-button">Read the Chronicle</a>
              </div>
            </article>
          ))}
        </div>

        <aside className="hero-index" aria-label="Chapter progress">
          <span>{String(active + 1).padStart(2, '0')}</span>
          <div className="index-line"><i style={{ height: `${((active + 1) / CHAPTERS.length) * 100}%` }} /></div>
          <span>{String(CHAPTERS.length).padStart(2, '0')}</span>
        </aside>

        <div className="hero-stats" aria-label="Realm stats">
          <div className="hero-stat"><strong>7</strong><span>Kingdoms</span></div>
          <div className="hero-stat"><strong>6</strong><span>Great Houses</span></div>
          <div className="hero-stat"><strong>1</strong><span>Iron Throne</span></div>
        </div>

        <div className="progress-track"><span ref={progressRef} /></div>
      </div>
    </section>
  )
}

export default Hero

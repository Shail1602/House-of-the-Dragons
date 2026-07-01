import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Section1.css'

const HOUSES = [
  { id: 'stark', name: 'Stark', motto: 'Winter Is Coming', seat: 'Winterfell', region: 'The North', weapon: 'Ice', image: '/images/one.jpg', accent: '#9db7c9', desc: 'Honour, endurance and the old gods of the North. A house built to survive the cold.' },
  { id: 'lannister', name: 'Lannister', motto: 'Hear Me Roar', seat: 'Casterly Rock', region: 'The Westerlands', weapon: 'Gold', image: '/images/two.jpg', accent: '#d6a83e', desc: 'Gold, ambition and razor-sharp politics. Their debts are remembered by everyone.' },
  { id: 'targaryen', name: 'Targaryen', motto: 'Fire and Blood', seat: 'Dragonstone', region: 'The Narrow Sea', weapon: 'Dragonfire', image: '/images/three.png', accent: '#d33445', desc: 'The blood of Old Valyria. Dragons made their name impossible to ignore.' },
  { id: 'baratheon', name: 'Baratheon', motto: 'Ours Is The Fury', seat: "Storm's End", region: 'The Stormlands', weapon: 'Warhammer', image: '/images/four.webp', accent: '#d9bf65', desc: 'Storm-born warriors with a crown won by force, fury and a war hammer.' },
  { id: 'greyjoy', name: 'Greyjoy', motto: 'We Do Not Sow', seat: 'Pyke', region: 'The Iron Islands', weapon: 'Longship', image: '/images/five.jpg', accent: '#b6a145', desc: 'Ironborn reavers of the sea. What they do not build, they take.' },
  { id: 'tyrell', name: 'Tyrell', motto: 'Growing Strong', seat: 'Highgarden', region: 'The Reach', weapon: 'Influence', image: '/images/six.jpg', accent: '#66a957', desc: 'Beauty, abundance and hidden ambition blooming behind every rose.' },
]

const TIMELINE = [
  ['01', 'The North remembers', 'The old gods, the Wall and the wolves turn duty into destiny.'],
  ['02', 'The capital whispers', 'In King’s Landing, ravens travel faster than armies and secrets cut deeper than swords.'],
  ['03', 'Dragons return', 'Across the sea, ancient fire rises again and changes the rules of every crown.'],
  ['04', 'The dead march', 'Beyond the Wall, winter becomes more than a season. It becomes an enemy.'],
  ['05', 'The last war begins', 'Every oath, betrayal and bloodline bends toward the Iron Throne.'],
]

const REGIONS = [
  { name: 'The Wall', x: '48%', y: '8%', tone: 'Ancient ice, black cloaks and the first warning of winter.' },
  { name: 'Winterfell', x: '42%', y: '23%', tone: 'Stone, snow and loyalty carved into the heart of the North.' },
  { name: 'Pyke', x: '20%', y: '42%', tone: 'Salt, iron and ships built for raids under storm-black skies.' },
  { name: 'Casterly Rock', x: '31%', y: '55%', tone: 'A golden fortress where wealth becomes power.' },
  { name: 'King’s Landing', x: '58%', y: '63%', tone: 'The throne room, the Red Keep and the most dangerous smiles in the realm.' },
  { name: 'Dragonstone', x: '72%', y: '60%', tone: 'Volcanic stone, old Valyrian magic and the shadow of wings.' },
  { name: 'Highgarden', x: '43%', y: '76%', tone: 'Roses, feasts and political elegance hiding sharp thorns.' },
]

const RELICS = [
  { icon: '⚔', title: 'Valyrian Steel', text: 'Rare, elegant and terrifying. The blade section adds a forged-metal visual layer.' },
  { icon: '🐉', title: 'Dragonfire', text: 'A living force of spectacle. The site now uses warmer ember motion and flame cues.' },
  { icon: '🜃', title: 'Weirwood', text: 'Old memory, red leaves and silent prophecy introduce a mythical atmosphere.' },
  { icon: '♛', title: 'Iron Throne', text: 'A brutal centrepiece for the final call-to-action and claim-your-house flow.' },
]

const QUIZ = [
  { label: 'Honour', house: 'Stark' },
  { label: 'Power', house: 'Lannister' },
  { label: 'Fire', house: 'Targaryen' },
  { label: 'Fury', house: 'Baratheon' },
  { label: 'Freedom', house: 'Greyjoy' },
  { label: 'Strategy', house: 'Tyrell' },
]

function Section1() {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(HOUSES[0])
  const [mapRegion, setMapRegion] = useState(REGIONS[1])
  const [quizHouse, setQuizHouse] = useState('Stark')
  const matchedHouse = useMemo(() => HOUSES.find((house) => house.name === quizHouse) || HOUSES[0], [quizHouse])

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal') || []
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="realm" id="houses">
      <div className="realm-bg" />
      <div className="ember-field" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>

      <header className="realm-header reveal">
        <p className="eyebrow">Choose your allegiance</p>
        <h2>The Houses of Westeros</h2>
        <p>Now with a richer Game of Thrones experience: house allegiance, Westeros map points, relic cards, prophecy wall, and a throne-room ending.</p>
      </header>

      <div className="house-showcase reveal" style={{ '--accent': selected.accent }}>
        <div className="house-portrait">
          <img src={selected.image} alt={`${selected.name} sigil`} />
          <div className="portrait-ring" />
        </div>

        <div className="house-detail">
          <p className="eyebrow">House {selected.name}</p>
          <h3>{selected.motto}</h3>
          <p>{selected.desc}</p>
          <dl>
            <div><dt>Seat</dt><dd>{selected.seat}</dd></div>
            <div><dt>Region</dt><dd>{selected.region}</dd></div>
            <div><dt>Power</dt><dd>{selected.weapon}</dd></div>
          </dl>
        </div>

        <div className="house-picker" aria-label="Select a house">
          {HOUSES.map((house) => (
            <button
              type="button"
              key={house.id}
              className={house.id === selected.id ? 'active' : ''}
              style={{ '--accent': house.accent }}
              onClick={() => setSelected(house)}
            >
              <img src={house.image} alt="" />
              <span>{house.name}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="westeros-map reveal" id="map">
        <div className="map-copy">
          <p className="eyebrow">Interactive Realm Map</p>
          <h2>Trace the road to the throne</h2>
          <p>Hover or tap a stronghold to reveal its mood. This gives the page a proper Westeros exploration feel without making it heavy.</p>
          <div className="map-region-card">
            <span>{mapRegion.name}</span>
            <p>{mapRegion.tone}</p>
          </div>
        </div>
        <div className="map-panel" aria-label="Westeros inspired map">
          <div className="map-spine" />
          {REGIONS.map((region) => (
            <button
              key={region.name}
              type="button"
              className={`map-pin ${mapRegion.name === region.name ? 'active' : ''}`}
              style={{ left: region.x, top: region.y }}
              onMouseEnter={() => setMapRegion(region)}
              onFocus={() => setMapRegion(region)}
              onClick={() => setMapRegion(region)}
            >
              <span>{region.name}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="cards-grid">
        {HOUSES.map((house, index) => (
          <article className="house-card reveal" key={house.id} style={{ '--accent': house.accent, transitionDelay: `${index * 70}ms` }}>
            <img src={house.image} alt="" />
            <div>
              <span>{house.seat}</span>
              <h3>{house.name}</h3>
              <p>{house.motto}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="relics reveal" id="relics">
        <p className="eyebrow">Relics of the Realm</p>
        <h2>Steel. Fire. Blood. Memory.</h2>
        <div className="relic-grid">
          {RELICS.map((relic) => (
            <article key={relic.title}>
              <b>{relic.icon}</b>
              <h3>{relic.title}</h3>
              <p>{relic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline reveal" id="timeline">
        <p className="eyebrow">Chronicle Mode</p>
        <h2>A sharper story arc</h2>
        <div className="timeline-grid">
          {TIMELINE.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prophecy reveal">
        <div>
          <p className="eyebrow">Prophecy Wall</p>
          <h2>The night is dark. The realm is watching.</h2>
        </div>
        <p>Snow falls in the North. Gold moves in the West. Roses bloom in silence. Somewhere above Dragonstone, wings cut through smoke.</p>
      </section>

      <section className="quiz reveal" style={{ '--accent': matchedHouse.accent }}>
        <div>
          <p className="eyebrow">Claim Your Banner</p>
          <h2>Your path belongs to House {matchedHouse.name}</h2>
          <p>Pick the trait that feels most like you and the throne room changes allegiance.</p>
        </div>
        <div className="quiz-actions">
          {QUIZ.map((item) => (
            <button key={item.label} type="button" className={quizHouse === item.house ? 'active' : ''} onClick={() => setQuizHouse(item.house)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="quiz-result">
          <img src={matchedHouse.image} alt="" />
          <div>
            <span>{matchedHouse.seat}</span>
            <strong>{matchedHouse.motto}</strong>
          </div>
        </div>
      </section>

      <section className="claim reveal" id="claim">
        <p>All roads end at the Iron Throne.</p>
        <a href="#top">Return to the beginning</a>
      </section>
    </section>
  )
}

export default Section1

const EVENTS = [
  'CODE BEE',
  'HACK STORM',
  'TECHNOMANIA',
  'OMEGA TRIX',
  'TECH HUNT',
  'RO NAVIGATOR',
  'RO COMBAT',
  'RO SOCCER',
  'RO TERRANCE',
  'CREATIVE CANVAS',
  'PASSION WITH REELS',
  'FORZA HORIZON',
  'EA FC MOBILE',
  'KHET',
  'RO SUMO',
];

// Duplicate for seamless infinite loop
const ITEMS = [...EVENTS, ...EVENTS];

export default function EventTicker() {
  return (
    <div style={{
      background: 'var(--orange)',
      borderTop: '3px solid var(--yellow)',
      borderBottom: '3px solid var(--yellow)',
      overflow: 'hidden',
      padding: '12px 0',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        display: 'flex',
        gap: '0',
        animation: 'marquee 35s linear infinite',
        whiteSpace: 'nowrap',
        width: 'max-content',
      }}>
        {ITEMS.map((name, i) => (
          <span key={i} style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: 'var(--black)',
            letterSpacing: '2px',
            paddingRight: '20px',
          }}>
            {name}
            <span style={{
              display: 'inline-block',
              margin: '0 20px',
              color: 'var(--yellow)',
              fontWeight: 'bold',
            }}>*</span>
          </span>
        ))}
      </div>
    </div>
  );
}

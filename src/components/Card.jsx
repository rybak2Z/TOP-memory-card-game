function Card({ label }) {
  return (
    <div style={{ width: 100, height: 100, border: '2px solid black' }}>
      {label}
    </div>
  );
}

export default Card;

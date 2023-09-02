function Card({ label, hide, onClick }) {
  const activeClass = hide ? 'active' : '';
  return (
    <div className='card'>
      <div className={'cardCover ' + activeClass}></div>
      <button onClick={() => onClick(label)}>{label}</button>
    </div>
  );
}

export default Card;

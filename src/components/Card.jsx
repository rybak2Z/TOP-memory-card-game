import '../styles/Card.css';

function Card({ cardIdx, label, hide, onClick }) {
  const activeClass = hide ? 'active' : '';
  return (
    <div className='card'>
      <div className={'cardCover ' + activeClass}></div>
      <button onClick={() => onClick(cardIdx)}>{label}</button>
    </div>
  );
}

export default Card;

import '../styles/Card.css';
import placeHolderImage from '../images/placeholder.webp';

function Card({ cardIdx, label, hide, onClick }) {
  const activeClass = hide ? 'active' : '';
  return (
    <div className={'card ' + activeClass}>
      <button onClick={() => onClick(cardIdx)}>
        <img src={placeHolderImage} />
        <div className='card-label'>
          <h1>{label}</h1>
          <h2>Location</h2>
        </div>
      </button>
    </div>
  );
}

export default Card;

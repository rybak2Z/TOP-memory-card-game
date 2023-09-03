import '../styles/Card.css';
import placeHolderImage from '../images/placeholder.webp';

function Card({ cardIdx, label, hide, onClick }) {
  const flipClass = hide ? 'flip' : '';
  return (
    <button onClick={() => onClick(cardIdx)} className={'card ' + flipClass}>
      <img src={placeHolderImage} />
      <div className='card-label'>
        <h1>{label}</h1>
        <h2>Location</h2>
      </div>
    </button>
  );
}

export default Card;

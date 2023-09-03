import '../styles/Card.css';

function Card({ cardIdx, name, location, image, flip, onClick }) {
  const flipClass = flip ? 'flip' : '';
  return (
    <button onClick={() => onClick(cardIdx)} className={'card ' + flipClass}>
      <img src={image} />
      <div className='card-label'>
        <h1>{name}</h1>
        <h2>{location}</h2>
      </div>
    </button>
  );
}

export default Card;

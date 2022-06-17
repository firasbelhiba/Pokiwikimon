import Image from 'next/image'

export default function Card({  name, imageUrl, baseExperience }) {
  return (
    <div className="card mb-4"  style={{ width: '18rem' }}>
      <Image
        className="card-img-top"
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Base Experience : {baseExperience}</p>
      </div>
    </div>
  )
}

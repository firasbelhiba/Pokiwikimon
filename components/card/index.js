import Image from 'next/image'

export default function Card({ name, imageUrl, baseExperience }) {
  return (
    <div className="card mb-4 " style={{ width: '18rem' , borderRadius: '10%'}}>
      <Image
        className="card-img-top"
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
      />
      <div className="card-body mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="card-text styled-text" >
                Name
              </p>
              <h5 className="card-text styled-text" >
                {name}
              </h5>
            </div>
            <div className="col-md-6">
              {' '}
              <p className="card-text styled-text" >
                Base Experience
              </p>
              <h5 className="card-text styled-text" >
                {baseExperience}
              </h5>
            </div>
          </div>
        </div>
        {/* <h5 className="card-title">{name}</h5>
        <p className="card-text">Base Experience : {baseExperience}</p> */}
      </div>
    </div>
  )
}

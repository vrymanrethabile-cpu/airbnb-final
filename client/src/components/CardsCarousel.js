import React from 'react';
import './Footer.css';

function CardsCarousel() {
  const capeTownImages = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-1421705447380242527/original/fa101757-00f4-48a1-a4f2-d7e6259a8c0b.jpeg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554848526.jpg?k=d1a4d932fd0d562342fa260cf7960133e3e094b13b41a808728b40c9b350f689&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/186882582.jpg?k=35b797f15fea5a0c1973fe1e3a6ded1968e985de7110a9f0fe219344ca23e814&o=',
    'https://media.vrbo.com/lodging/108000000/107830000/107827700/107827603/e381d0df.jpg?impolicy=resizecrop&ra=fit&rw=598',
    'https://www.sa-venues.com/visit/poseidonguesthouse/14g.jpg',
    'https://www.sa-venues.com/visit/burmeisteronpark310/15g.jpg'
  ];

  const bloemfonteinImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/398370688.jpg?k=340c69d4d4f2732d2ca849cb5f61807cecb3cb9332a055076a7c51e287f393dd&o=',
    'https://www.sa-venues.com/visit/melsettersguestroom/02g.jpg',
    'https://images.prop24.com/327894999/Crop600x400',
    'https://a0.muscache.com/im/pictures/1fb24fa9-b608-4701-a64a-1840aa98ee35.jpg',
    'https://images.prop24.com/364113481/Crop600x400',
    'https://a0.muscache.com/im/pictures/56aee87e-74a6-4004-9f6f-600c3c2ce576.jpg?im_w=720'
  ];

  const imageStyle = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });

  return (
    <>
      <div className="carousel-section">
        <div className="carousel-header">
          <h3>Popular homes in Cape Town</h3>
          <button className="carousel-arrow" aria-label="next">→</button>
        </div>

        <div className="cards-row">
          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[0])} />
            <div className="card-info">
              <div className="card-title">Apartment in Cape Town City Centre</div>
              <div className="card-sub">R 1,628 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[1])} />
            <div className="card-info">
              <div className="card-title">Apartment in Cape Town City Centre</div>
              <div className="card-sub">R 2,790 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[2])} />
            <div className="card-info">
              <div className="card-title">Apartment in Cape Town City Centre</div>
              <div className="card-sub">R 3,388 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[3])} />
            <div className="card-info">
              <div className="card-title">Apartment in Cape Town City Centre</div>
              <div className="card-sub">R 2,302 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[4])} />
            <div className="card-info">
              <div className="card-title">Guesthouse in Hout Bay</div>
              <div className="card-sub">R 1,000 ZAR for 2 nights • ★ 4.97</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(capeTownImages[5])} />
            <div className="card-info">
              <div className="card-title">Room in Milnerton</div>
              <div className="card-sub">R 1,376 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-section">
        <div className="carousel-header">
          <h3>Available in Bloemfontein this weekend</h3>
          <button className="carousel-arrow" aria-label="next">→</button>
        </div>

        <div className="cards-row">
          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[0])} />
            <div className="card-info">
              <div className="card-title">Apartment in Bloemfontein</div>
              <div className="card-sub">R 1,950 ZAR for 2 nights • ★ 4.82</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[1])} />
            <div className="card-info">
              <div className="card-title">Room in Langenhovenpark</div>
              <div className="card-sub">R 1,265 ZAR for 2 nights • ★ 5.0</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[2])} />
            <div className="card-info">
              <div className="card-title">Condo in Dan Pienaar</div>
              <div className="card-sub">R 1,622 ZAR for 2 nights • ★ 4.88</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[3])} />
            <div className="card-info">
              <div className="card-title">Guest suite in Bloemfontein</div>
              <div className="card-sub">R 1,180 ZAR for 2 nights • ★ 4.88</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[4])} />
            <div className="card-info">
              <div className="card-title">Apartment in Langenhovenpark</div>
              <div className="card-sub">R 1,720 ZAR for 2 nights • ★ 4.87</div>
            </div>
          </div>

          <div className="card">
            <div className="card-img" style={imageStyle(bloemfonteinImages[5])} />
            <div className="card-info">
              <div className="card-title">Guesthouse in Dan Pienaar</div>
              <div className="card-sub">R 1,085 ZAR for 2 nights • ★ 4.82</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardsCarousel;
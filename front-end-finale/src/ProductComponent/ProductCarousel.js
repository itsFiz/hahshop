const ProductCarousel = (product) => {
  return (
    <div
      id="carouselExampleCaptions2"
      className="carousel slide"
      data-bs-ride="false"
    >
      <div className="carousel-indicators"></div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={'http://localhost:8080/api/product/' + product.item.image1}
            className="d-block card-img-top img-fluid"
            alt="..."
            style={{
              maxHeight: '450px', // Adjust the maximum height as needed
              width: 'auto',
              margin: '0 auto',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel

import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <img
                    src="hah.png"
                    style={{
                      width: '160px',
                      animation: 'bounce 1s infinite', // Apply the bounce animation
                    }}
                    alt="Image"
                  />

                  <style>
                    {`
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-15px); // Adjust the distance of the bounce
      }
      60% {
        transform: translateY(-5px); // Adjust the distance of the bounce
      }
    }
  `}
                  </style>

                  <p>Shopping with a HAH! </p>
                  <p>Where every purchases sparks joy!</p>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">About us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Contact us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Careers</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Links</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center">
            © 2023 HaHShop All Rights Reserved
            <a class="text-color-3" href=""></a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer

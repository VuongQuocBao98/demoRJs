
import Carousel from 'src/components/carousel';

export default function AtributeCard() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        with: 'full',
      };
      return (
        <div style={{width:'445px',height:'228px',backgroundColor:' rgba(255, 255, 255, 0.3)',zIndex:3, marginTop:'auto', marginBottom:'20px'}}>
            <Carousel {...settings}>
            <div >
              <div style={{margin: '10px'}}>
              <h3>“We’ve been using Untitled to kick start every new project and can’t imagine working without it.”</h3>
           
              </div>
            </div>
            <div >
              <div style={{margin: '10px'}}>
              <h3>“We’ve been using Untitled to kick start every new project and can’t imagine working without it.”</h3>
           
              </div>
            </div>
             <div >
              <div style={{margin: '10px'}}>
              <h3>“We’ve been using Untitled to kick start every new project and can’t imagine working without it.”</h3>
           
              </div>
            </div>
           
        </Carousel>
        </div>
      );
}
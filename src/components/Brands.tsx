import FirstImage from '../assets/brands/download.png';
import SecondImage from '../assets/brands/download 1.png';
import ThirdImage from '../assets/brands/download 2.png';
import FourthImage from '../assets/brands/download 3.png';
import FifthImage from '../assets/brands/download 4.png';

const Brands = () => {
    return (
        <div id='brands' className="bg-black py-8 px-2 sm:px-16">
            <div className="flex flex-row flex-wrap items-center justify-center gap-6 lg:gap-12">
                <img src={FirstImage} alt="Versace" className="h-5 sm:h-8 w-auto" />
                <img src={SecondImage} alt="Zara" className="h-5 sm:h-8 w-auto" />
                <img src={ThirdImage} alt="Gucci" className="h-5 sm:h-8 w-auto" />
                <img src={FourthImage} alt="Prada" className="h-5 sm:h-8 w-auto" />
                <img src={FifthImage} alt="Calvin Klein" className="h-5 sm:h-8 w-auto" />
            </div>
        </div>
    );
};

export default Brands;

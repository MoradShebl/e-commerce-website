import FirstImage from '../assets/brands/download.png';
import SecondImage from '../assets/brands/download 1.png';
import ThirdImage from '../assets/brands/download 2.png';
import FourthImage from '../assets/brands/download 3.png';
import FifthImage from '../assets/brands/download 4.png';

const Brands = () => {
    return (
        <div id='brands' className="bg-black py-8 px-2 sm:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
                <img src={FirstImage} alt="Versace" className="h-6 sm:h-10 w-auto" />
                <img src={SecondImage} alt="Zara" className="h-6 sm:h-10 w-auto" />
                <img src={ThirdImage} alt="Gucci" className="h-6 sm:h-10 w-auto" />
                <img src={FourthImage} alt="Prada" className="h-6 sm:h-10 w-auto" />
                <img src={FifthImage} alt="Calvin Klein" className="h-6 sm:h-10 w-auto" />
            </div>
        </div>
    );
};

export default Brands;

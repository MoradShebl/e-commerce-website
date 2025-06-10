import PropTypes from 'prop-types';
import FilteredProductList from './FilteredProductList';

type ShowCaseProps = {
    name: string;
    filter_type: string;
    border?: boolean;
};

const ShowCase = ({ name, filter_type, border = false }: ShowCaseProps) => {
    return (
        <section id={`${name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center mb-8 ${
                border ? 'border-b border-gray-300' : ''
            }`}
        >
            <h2 className='integral heavy text-4xl mb-12 mt-12'>{name}</h2>

            {/* Scrollable container on small screens */}
            <div className="w-full overflow-x-scroll sm:overflow-visible">
                <div className="flex items-start gap-5 mb-8 max-w-220 min-w-fit">
                    <FilteredProductList filter_type={filter_type} />
                </div>
            </div>

            <div className="text-center">
                <button className="reversed-button mb-8">
                    View All
                </button>
            </div>
        </section>
    );
};

ShowCase.propTypes = {
    name: PropTypes.string.isRequired,
    filter_type: PropTypes.string.isRequired,
    border: PropTypes.bool,
};

export default ShowCase;

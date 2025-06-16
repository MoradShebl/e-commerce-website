import HeroSection from "../HeroSection"
import Brands from "../Brands"
import ShowCase from "../ShowCase"

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <Brands />
      <ShowCase name="Top Selling" filter_type="top_selling" />


      <section className="w-full max-w-6xl mx-auto px-4 py-12 bg-gray-50 rounded-xl">
        <h2 className=" integral demibold text-4xl font-bold text-center mb-8 md:mb-12 text-black">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="flex w-full gap-5 flex-col md:flex-row md:flex-wrap ">
          <div className="mb-5 flex flex-col md:flex-row gap-5 w-full ">
            <div
              className={"relative h-64 rounded-xl overflow-hidden cursor-pointer w-full flex justify-around bg-white hover:scale-103 transition-transform duration-300"}
            >
              <img
                src="https://www.britishhouse.shop/cdn/shop/products/00_505b9ab3-f951-4635-a507-12d2f4c0a817_1800x1800.jpg?v=1658950890"
                alt='Casual style'
                className=" h-full object-cover duration-500 "
              />
              <div className="absolute bg-white bg-opacity-20  " />
              <div className="absolute top-6 left-6">
                <h3 className="text-xl font-bold text-black">
                  Casual
                </h3>
              </div>
            </div>

            <div
              className={"relative h-64 rounded-xl overflow-hidden cursor-pointer md:w-3/2 flex justify-around bg-white hover:scale-103 transition-transform duration-300"}
            >
              <img
                src='https://nagahomme.com/cdn/shop/files/MSU374-007_4.png?v=1745837089'
                alt='Formal style'
                className=" h-full object-cover  duration-500   "
              />
              <div className="absolute bg-white bg-opacity-20  " />
              <div className="absolute top-6 left-6">
                <h3 className="text-xl font-bold text-black">
                  Formal
                </h3>
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-col md:flex-row gap-5 w-full ">

            <div
              className={"relative h-64 rounded-xl overflow-hidden cursor-pointer w-full flex justify-around bg-white hover:scale-103 transition-transform duration-300"}
            >
              <img
                src="https://media.alshaya.com/adobe/assets/urn:aaid:aem:37118b2b-6780-4ad3-b58f-b180ff21e7c2/as/AR-0193-2194-647_5.jpg?height=630"
                alt='Party style'
                className=" h-full object-cover  duration-500  "
              />
              <div className="absolute bg-white bg-opacity-20 -hover:bg-opacity-30 transition-all " />
              <div className="absolute top-6 left-6">
                <h3 className="text-xl font-bold text-black">
                  Party
                </h3>
              </div>
            </div>

            <div
              className={"relative h-64 rounded-xl overflow-hidden cursor-pointer md:w-3/4 flex justify-around bg-white hover:scale-103 transition-transform duration-300"}
            >
              <img
                src="https://m.media-amazon.com/images/I/41SU+6IsrnL._AC_SX522_.jpg"
                alt='Casual style'
                className=" h-full object-cover  duration-500   "
              />
              <div className="absolute bg-white bg-opacity-20 -hover:bg-opacity-30 transition-all" />
              <div className="absolute top-6 left-6">
                <h3 className="text-xl font-bold text-black">
                  Gym
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainPage
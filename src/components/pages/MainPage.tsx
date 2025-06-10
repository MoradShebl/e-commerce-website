import HeroSection from "../HeroSection"
import Brands from "../Brands"
import ShowCase from "../ShowCase"

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <Brands />
      <ShowCase name="NEW ARRIVALS" filter_type="newest" border />
      <ShowCase name="Top Selling" filter_type="top_selling" />
    </>
  )
}

export default MainPage
import Bestsellers from "./components/Bestsellers/Bestsellers";
import Discounts from "./components/Discounts/Discounts";
import Header from "./components/Header/Header";
import AllProducts from "./components/AllProducts/AllProducts";

export default function App() {
  return (
    <div>
      <Header />
      <Bestsellers />
      <Discounts />
      <AllProducts />
    </div>
  )
}

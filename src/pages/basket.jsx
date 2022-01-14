import BackWelcomePage from "../components/back-to-welcome-page";
import "../assets/styles/basket.scss";
import { SelectedSalads } from "../components/basket-salad-card";
import { UniqueSalad } from "../components/unique-salad";

const Basket = () => {

  return (
    <div className="basket">
      <BackWelcomePage />
      <SelectedSalads />
      <UniqueSalad />
    </div>
  );
};

export default Basket;

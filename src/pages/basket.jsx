import BackWelcomePage from "../components/back-to-welcome-page";
import "../assets/styles/basket.scss";
import { SelectedSalads } from "../components/basket-cards";

const Basket = () => {

  return (
    <div className="basket">
      <BackWelcomePage />
      <SelectedSalads />
      <div className="basket-item">
        <h3>Уникальный салаты</h3>
      </div>
    </div>
  );
};

export default Basket;

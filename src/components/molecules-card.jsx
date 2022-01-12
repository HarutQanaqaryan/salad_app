import "../assets/styles/salad-card.scss";
import { MoleculesIcon } from "./molecules-icons";

export const MoleculesCard = ({
  title,
  price,
  discount_price,
  qty,
  onClick,
  btn_label,
  blockId,
}) => {


  return (
    <div className="salad-card" id={blockId}>
      <h3 className="salad-card_title">{title} </h3>
      <MoleculesIcon moleculeName={title} />
      <span className="salad-card_price">
        <p>Цена: {price} $</p>
        <p>Цена по Скидке: {discount_price} $</p>
        <p>Количество: {qty}</p>
      </span>
      <button className="salad-card_btn" onClick={onClick}>
        {btn_label}
      </button>
    </div>
  );
};

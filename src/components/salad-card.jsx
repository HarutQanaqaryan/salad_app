import "../assets/styles/salad-card.scss";

export const SaladCard = ({ title, price, discount_price, onClick, btn_label, id }) => {
  return (
    <div className="salad-card">
      <h3 className="salad-card_title">{title} </h3>
      <span className="salad-card_price">
        <p>Цена: {price} $</p>
        <p>Цена по Скидке: {discount_price} $</p>
      </span>
      <button className="salad-card_btn" onClick={onClick} id={id}>{btn_label}</button>
    </div>
  );
};

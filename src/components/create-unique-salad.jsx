import "../assets/styles/unique-salad.scss";

export const CreateUniqueSalad = ({
  price,
  btnLabel,
  clickSave,
  children,
}) => {

  return (
    <div className="unique-salad">
      <div className="unique-salad_ingredients">
        Ингредиенты:{" "}
        {children}
      </div>
      <div className="unique-salad_price_title">
        Цена: <span className="unique-salad_price">{price}</span>
      </div>
      <button className="unique-salad_btn" onClick={clickSave}>
        {btnLabel}
      </button>
    </div>
  );
};

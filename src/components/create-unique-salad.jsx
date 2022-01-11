import "../assets/styles/unique-salad.scss";

export const CreateUniqueSalad = ({
  price,
  qty,
  btnLabel,
  clickAdd,
  clickDec,
  clickSave,
  children
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
      <div className="unique-salad_qty">
        Количество:{" "}
        <span className="decrease-add-qty" onClick={clickDec}>
          -
        </span>{" "}
        <span className="salad-qty_number">{qty}</span>
        <span className="decrease-add-qty" onClick={clickAdd}>
          +
        </span>
      </div>
      <button className="unique-salad_btn" onClick={clickSave}>
        {btnLabel}
      </button>
    </div>
  );
};

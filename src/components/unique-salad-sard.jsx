import "../assets/styles/salad-card.scss";

export const UniqueSaladCard = ({
  saladName,
  price,
  clickRemove,
  ingredients,
  blockId
}) => {
  return (
      <div className="unique-salad-card">
        <div className="unique-salad_ingredients">
          <h5>Название: {saladName ? saladName : "Без названия"}</h5>
          <div className="unique-salad_ingredients">
            Ингредиенты:
            {ingredients.map((el) => {
              return (
                <div className="unique-salad_ingredient" key={Math.random()}>
                  <span >{el.title}</span>
                  <span className="unique-salad_qty_basket">Количество: {el.qty}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="unique-salad_price_title">
            Цена: <span className="unique-salad_price">{price} $</span>
          </div>
          <button className="unique-salad_btn" onClick={clickRemove} id={blockId}>
            Удалить
          </button>
        </div>
      </div>
  );
};

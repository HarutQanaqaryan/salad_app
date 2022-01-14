import "../assets/styles/unique-salad.scss";

export const CreateUniqueSalad = ({ price, btnLabel, clickSave, nameValue, onChange, children }) => {
  return (
    <div className="unique-salad">
      <div>
        <input
          type="text"
          className="unique-salad_name"
          placeholder="Название вашего салата"
          value={nameValue}
          onChange={onChange}
        />
        <div className="unique-salad_ingredients">Ингредиенты: {children}</div>
      </div>
      <div>
        <div className="unique-salad_price_title">
          Цена: <span className="unique-salad_price">{price}</span>
        </div>
        <button className="unique-salad_btn" onClick={clickSave}>
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

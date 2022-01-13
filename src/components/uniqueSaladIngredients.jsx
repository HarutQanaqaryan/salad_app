export const UniqueSaladIngredients = ({
  addClick,
  qty,
  blockId,
  title,
  icon,
  removeSelectedMolecule,
  validQty,
}) => {
  return (
    <div className="salad-ingrediends">
      <div id={blockId}>
        <span className="salad-ingredient_title">{title}</span>
        <div className="unique-salad_qty" id={blockId}>
          Количество:{" "}
          <div className="decrease-add-qty" id="decrease" onClick={addClick}>
            -
          </div>{" "}
          <span className="salad-qty_number">{qty}</span>
          <div className="decrease-add-qty" id="add" onClick={addClick}>
            +
          </div>
          <img
            src={icon}
            alt="remove icon"
            className="remove-icon"
            onClick={removeSelectedMolecule}
          />
        </div>
        {validQty && (
          <h6 className="salad-qty-validation-hint">
            Количество больше чем на складе
          </h6>
        )}
      </div>
    </div>
  );
};

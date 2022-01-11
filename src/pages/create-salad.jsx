import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackWelcomePage from "../components/back-to-welcome-page";
import { MoleculesCard } from "../components/molecules-card";
import { fetchMolecules } from "../store/action-creators/fetch-molecules";
import { CreateUniqueSalad } from "../components/create-unique-salad";
import { addMoleculesType } from "../store/createUniqueSaladreducer";
import "../assets/styles/create-salad.scss";
import "../assets/styles/unique-salad.scss";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

const CreateSalad = () => {
  const { molecules, loading, error } = useSelector((state) => state.molecules);
  const {
    ingredients = [],
    price = 0,
    saved,
  } = useSelector((state) => state.createUniqueSalad);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMolecules());
  }, [dispatch]);

  const addDecreaseQty = (e) => {
    let parentElemId = e.target.parentElement.id;

    ingredients.forEach((item) => {
      if (parentElemId === item.blockId) {
        dispatch({
          type: addMoleculesType.ADD_DECREASE_QTY,
          id: parentElemId,
          qty: checkAddDecreaseBtn(e, item.qty)
        });
      }
    });
  };

  const checkAddDecreaseBtn = (e, item) => {
    if(e.target.id === "add"){
      return item + 1
    }
    if(e.target.id === "decrease"){
      return item - 1
    }
  }

  const addIngredients = (e) => {
    let parentElemId = e.target.parentElement.id;

    molecules.forEach((item) => {
      if (parentElemId === item.dataMolecules._id) {
        dispatch({
          type: addMoleculesType.ADD_INGREDIENTS,
          payload: {
            title: item.dataMolecules.title,
            qty: item.dataMolecules.qty,
            discount_price: item.dataMolecules.discount_price,
            blockId: item.dataMolecules._id,
          },
        });
      }
    });
  };

  const removeMolecule = () => {
    console.log("abab");
  };

  return (
    <div className="molecules">
      <BackWelcomePage />
      <CreateUniqueSalad
        price={`${price} $`}
        btnLabel={saved ? "Добавлено" : "Сохранить"}
        clickSave={() => console.log("ababa")}
      >
        {ingredients.length === 0 ? (
          <div>Вы пока не создали салат</div>
        ) : (
          ingredients.map((el) => (
            <div key={el.blockId} className="salad-ingrediends">
              <span className="salad-ingredient_title" onClick={removeMolecule}>
                {el.title}
              </span>
              <div className="unique-salad_qty" id={el.blockId}>
                Количество:{" "}
                <div className="decrease-add-qty" id="decrease" onClick={addDecreaseQty}>
                  -
                </div>{" "}
                <span className="salad-qty_number">{el.qty}</span>
                <div className="decrease-add-qty" id="add" onClick={addDecreaseQty}>
                  +
                </div>
              </div>
            </div>
          ))
        )}

        {loading && <Loading />}

        {error && <Error />}
      </CreateUniqueSalad>
      {molecules.map(({ dataMolecules, isAdded }) => {
        return (
          <MoleculesCard
            title={dataMolecules.title}
            price={dataMolecules.price}
            discount_price={dataMolecules.discount_price}
            qty={dataMolecules.qty}
            key={dataMolecules._id}
            btn_label={isAdded ? "Добавлено" : "Добавить в мой салат"}
            blockId={dataMolecules._id}
            onClick={addIngredients}
          />
        );
      })}
    </div>
  );
};

export default CreateSalad;

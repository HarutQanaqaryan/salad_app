import { useEffect, useState } from "react";
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
import removeMoleculeIcon from "../assets/remove.svg";
import { fetchMoleculesType } from "../store/moleculesReducer";
import { removeSelectedMolecule } from "../helpers/removeSelectMolecule";
import { addDecreaseQty } from "../helpers/addDecreaseQty";

const CreateSalad = () => {
  const { molecules, loading, error } = useSelector((state) => state.molecules);
  const {
    ingredients = [],
    moleculesPrice,
    saved,
  } = useSelector((state) => state.createUniqueSalad);
  const dispatch = useDispatch();
  const [parentElementId, setParentElementId] = useState();

  useEffect(() => {
    dispatch(fetchMolecules());
  }, [dispatch]);

  const addOrDecreaseQty = (e) => {
    const parentElemId = e.target.parentElement.id;

    setParentElementId(e.target.parentElement.id);

    addDecreaseQty(e, parentElemId, dispatch, ingredients);
  };

  useEffect(() => {
    if (ingredients.some((el) => el.qty === 0)) {
      removeSelectedMolecule(parentElementId, dispatch, ingredients);
    }
  }, [dispatch, ingredients, parentElementId]);

  const addIngredients = (e) => {
    let parentElemId = e.target.parentElement.id;
    let selectedMoleculesId = ingredients.map((mol) => mol.blockId);

    if (
      ingredients.length === 0 ||
      !selectedMoleculesId.includes(parentElemId)
    ) {
      molecules.forEach((item) => {
        if (parentElemId === item.dataMolecules._id) {
          dispatch({
            type: addMoleculesType.ADD_INGREDIENTS,
            payload: {
              title: item.dataMolecules.title,
              qty: 1,
              discount_price: item.dataMolecules.discount_price,
              blockId: item.dataMolecules._id,
            },
          });
          dispatch({
            type: fetchMoleculesType.SELECTED_MOLECULE,
            id: parentElemId,
            added: true,
          });
          dispatch({
            type: addMoleculesType.ADD_PRICE,
            price: {
              price: item.dataMolecules.discount_price,
              moleculeId: item.dataMolecules._id,
            },
          });
        }
      });
    }
    if (selectedMoleculesId.includes(parentElemId)) {
      dispatch({
        type: addMoleculesType.REMOVE_SELECTED_MOLECULE,
        payload: ingredients.filter((el) => el.blockId !== parentElemId),
      });
      dispatch({
        type: fetchMoleculesType.SELECTED_MOLECULE,
        id: parentElemId,
        added: false,
      });
    }
  };

  const checkOrderUniqueSalad = () => {
    ingredients.forEach(({ qty, blockId }) => {
      molecules.forEach(({ dataMolecules }) => {
        if (dataMolecules.qty !== qty && blockId === dataMolecules._id) {
          dispatch({ type: addMoleculesType.SAVED_SALAD, saved: true });
        } else {
          dispatch({ type: addMoleculesType.SAVED_SALAD, saved: false });
        }
      });
    });
  };
console.log(moleculesPrice)
  return (
    <div className="molecules">
      <BackWelcomePage />
      <CreateUniqueSalad
        price={` $`}
        btnLabel={saved ? "Добавлено" : "Сохранить"}
        clickSave={checkOrderUniqueSalad}
      >
        {ingredients.length === 0 ? (
          <h5>Вы пока не создали салат</h5>
        ) : (
          ingredients.map((el) => (
            <div key={el.blockId} className="salad-ingrediends">
              <span className="salad-ingredient_title">{el.title}</span>
              <div className="unique-salad_qty" id={el.blockId}>
                Количество:{" "}
                <div
                  className="decrease-add-qty"
                  id="decrease"
                  onClick={addOrDecreaseQty}
                >
                  -
                </div>{" "}
                <span className="salad-qty_number">{el.qty}</span>
                <div
                  className="decrease-add-qty"
                  id="add"
                  onClick={addOrDecreaseQty}
                >
                  +
                </div>
                <img
                  src={removeMoleculeIcon}
                  alt="remove icon"
                  className="remove-icon"
                  onClick={(e) =>
                    removeSelectedMolecule(
                      e.target.parentElement.id,
                      dispatch,
                      ingredients
                    )
                  }
                />
                {saved && <p>"Количество больше чем на складе"</p>}
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

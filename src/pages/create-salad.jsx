import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackWelcomePage from "../components/back-to-welcome-page";
import { MoleculesCard } from "../components/molecules-card";
import { fetchMolecules } from "../store/action-creators/fetch-molecules";
import { CreateUniqueSalad } from "../components/create-unique-salad";
import {
  addMoleculesType,
  INGREDIENTS_STORAGE,
} from "../store/createUniqueSaladReducer";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import removeMoleculeIcon from "../assets/remove.svg";
import {
  fetchMoleculesType,
  MOLECULES_STORAGE,
} from "../store/moleculesReducer";
import { removeSelectedMolecule } from "../helpers/removeSelectMolecule";
import { addDecreaseQty, updatePrice } from "../helpers/addDecreaseQty";
import { sumPrices } from "../helpers/sumPrices";
import {
  ADDED_UNIQUE_SALAD_STORAGE,
  addUniqueSaladType,
} from "../store/addUniqueSalad";
import "../assets/styles/create-salad.scss";
import "../assets/styles/unique-salad.scss";

const CreateSalad = () => {
  const { molecules, loading, error } = useSelector((state) => state.molecules);
  const { ingredients, uniqueSaladName, moleculesPrice, saved } = useSelector(
    (state) => state.createUniqueSalad
  );
  const { addedUniqueSalad } = useSelector((state) => state.addUniqueSalad);
  const dispatch = useDispatch();
  const [parentElementId, setParentElementId] = useState();

  useEffect(() => {
    !localStorage.getItem(MOLECULES_STORAGE) && dispatch(fetchMolecules());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(MOLECULES_STORAGE, JSON.stringify(molecules));
    localStorage.setItem(
      ADDED_UNIQUE_SALAD_STORAGE,
      JSON.stringify(addedUniqueSalad)
    );
    localStorage.setItem(INGREDIENTS_STORAGE, JSON.stringify(ingredients));
  }, [molecules, ingredients, addedUniqueSalad]);

  useEffect(() => {
    dispatch({
      type: addMoleculesType.ADD_PRICE,
      price: sumPrices(ingredients),
    });
  }, [dispatch, ingredients]);

  const addOrDecreaseQty = (e) => {
    const parentElemId = e.target.parentElement.id;

    setParentElementId(e.target.parentElement.id);

    updatePrice(e, parentElemId, dispatch, ingredients, molecules);

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

    if (!selectedMoleculesId.includes(parentElemId)) {
      molecules.forEach((item) => {
        if (parentElemId === item.dataMolecules._id) {
          dispatch({
            type: addMoleculesType.ADD_INGREDIENTS,
            payload: {
              title: item.dataMolecules.title,
              qty: 1,
              discount_price: item.dataMolecules.discount_price,
              blockId: item.dataMolecules._id,
              isValidQty: false,
            },
          });
          dispatch({
            type: fetchMoleculesType.SELECTED_MOLECULE,
            id: parentElemId,
            added: true,
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
    if (addedUniqueSalad.includes(parentElemId)) {
      dispatch({
        type: addUniqueSaladType.REMOVE_UNIQUE_SALAD,
        payload: addedUniqueSalad.filter((el) => el.blockId !== parentElemId),
      });
    }
    if (
      JSON.parse(
        localStorage.getItem(ADDED_UNIQUE_SALAD_STORAGE).includes(parentElemId)
      )
    ) {
      return (
        JSON.parse(localStorage.getItem(ADDED_UNIQUE_SALAD_STORAGE)).filter(
          (item) => item.blockId !== parentElemId
        ),
        dispatch({
          type: fetchMoleculesType.SELECTED_MOLECULE,
          id: parentElemId,
          added: false,
        })
      );
    }
  };

  const checkQtyIngredients = () => {
    if (
      ingredients.length !== 0 &&
      ingredients.every((el) => el.isValidQty === false)
    ) {
      dispatch({ type: addMoleculesType.SAVED_SALAD, saved: true });
      dispatch({
        type: addUniqueSaladType.ADD_UNIQUE_SALAD,
        addUniqueSalad: {
          ingredients: ingredients.map((el) => {
            return {
              title: el.title,
              qty: el.qty,
            };
          }),
          saladName: uniqueSaladName,
          price: moleculesPrice,
          blockId: JSON.stringify(Math.random()),
        },
      });
      dispatch({ type: addMoleculesType.REMOVE_INGREDIENTS });
      dispatch({ type: fetchMoleculesType.SALAD_SAVED, isAdded: false });
    } else {
      dispatch({ type: addMoleculesType.SAVED_SALAD, saved: false });
    }
  };


  const handleUniqueSaladName = (e) => {
    dispatch({ type: addMoleculesType.ADD_NAME, name: e.target.value });
  };
  

  useEffect(() => {
    ingredients.forEach((item) => {
      molecules.forEach(({ dataMolecules }) => {
        if (
          item.qty > dataMolecules.qty &&
          item.blockId === dataMolecules._id
        ) {
          dispatch({
            type: addMoleculesType.VALID_QTY,
            id: dataMolecules._id,
            qty: true,
          });
        }
        if (
          item.qty <= dataMolecules.qty &&
          item.blockId === dataMolecules._id
        ) {
          dispatch({
            type: addMoleculesType.VALID_QTY,
            id: dataMolecules._id,
            qty: false,
          });
        }
      });
    });
  }, [dispatch, JSON.stringify(ingredients), molecules]);

  return (
    <div className="molecules">
      <BackWelcomePage />
      <CreateUniqueSalad
        price={`${moleculesPrice} $`}
        btnLabel={"Сохранить"}
        clickSave={checkQtyIngredients}
        value={uniqueSaladName}
        onChange={handleUniqueSaladName}
      >
        {ingredients.length === 0 ? (
          <h5>Вы пока не создали салат</h5>
        ) : (
          ingredients.map((el) => (
            <div key={el.blockId} className="salad-ingrediends">
              <div id={el.blockId}>
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
                </div>
                {el.isValidQty && (
                  <h6 className="salad-qty-validation-hint">
                    Количество больше чем на складе
                  </h6>
                )}
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

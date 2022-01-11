import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackWelcomePage from "../components/back-to-welcome-page";
import { MoleculesCard } from "../components/molecules-card";
import { fetchMolecules } from "../store/action-creators/fetch-molecules";
import "../assets/styles/create-salad.scss";
import { CreateUniqueSalad } from "../components/create-unique-salad";
import { addMoleculesType } from "../store/createUniqueSaladreducer";

const CreateSalad = () => {
  const { molecules, loading, error } = useSelector((state) => state.molecules);
  const { ingredients, price, qty, saved } = useSelector(
    (state) => state.createUniqueSalad
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMolecules());
  }, [dispatch]);

  const addQty = () => {
    dispatch({ type: addMoleculesType.ADD_QTY });
  };

  const decreaseQty = () => {
    dispatch({ type: addMoleculesType.DECREASE_QTY });
  };

  const removeMolecule = () => {
    console.log('abab')
  }
  
  return (
    <div className="molecules">
      <BackWelcomePage />
      <CreateUniqueSalad
        price={price}
        qty={qty}
        btnLabel={saved ? "Добавлено" : "Сохранить"}
        clickAdd={() => addQty()}
        clickDec={() => decreaseQty()}
        clickSave={() => console.log("ababa")}
      >
        {ingredients.map((el) => (
          <span
            className="salad-ingredient"
            key={el}
            onClick={removeMolecule()}
          >
            {el}
          </span>
        ))}
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
          />
        );
      })}
    </div>
  );
};

export default CreateSalad;

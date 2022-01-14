import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDED_UNIQUE_SALAD_STORAGE,
  addUniqueSaladType,
} from "../store/addUniqueSalad";
import { UniqueSaladCard } from "./unique-salad-sard";

export const UniqueSalad = () => {
  const { addedUniqueSalad } = useSelector((state) => state.addUniqueSalad);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(
      ADDED_UNIQUE_SALAD_STORAGE,
      JSON.stringify(addedUniqueSalad)
    );
  }, [addedUniqueSalad]);

  const removeUniqueSalad = (e) => {
    dispatch({
      type: addUniqueSaladType.REMOVE_UNIQUE_SALAD,
      removeUniqueSalad: addedUniqueSalad.filter(
        (el) => el.blockId !== e.target.id
      ),
    });
  };

  return (
    <div className="selected-salads">
      <h3>Уникальные салаты</h3>
      <div className="selected-salads-items">
        {addedUniqueSalad.length === 0 ? (
          <h4>Пусто</h4>
        ) : (
          addedUniqueSalad.map((el) => {
            return (
              <UniqueSaladCard
                saladName={el.saladName}
                price={el.price}
                clickRemove={removeUniqueSalad}
                ingredients={el.ingredients}
                key={el.blockId}
                blockId={el.blockId}
              ></UniqueSaladCard>
            );
          })
        )}
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { SaladCard } from "./salad-card";
import "../assets/styles/basket.scss";
import { ADDED_SALAD_STORAGE, addSaladType } from "../store/addSaladReducer";
import { fetchSaladsType } from "../store/saladReducer";
import { useCallback, useEffect } from "react";

export const SelectedSalads = () => {
  const { addedSalads } = useSelector((state) => state.mySalads);
  const dispatch = useDispatch();

  const removeSalad = useCallback(
    (e) => {
      let storageSalads = JSON.parse(localStorage.getItem(ADDED_SALAD_STORAGE));
      const parentElemId = e.target.parentElement.id;
      let addedSaladsIds = addedSalads.map((item) => item.blockId);

      if (addedSaladsIds.includes(parentElemId)) {
        dispatch({
          type: addSaladType.REMOVE_SALAD,
          payload: addedSalads.filter((el) => el.blockId !== parentElemId),
        });
        dispatch({
          type: fetchSaladsType.ADDED_SALAD,
          id: parentElemId,
          added: false,
        });
        if (storageSalads.includes(parentElemId)) {
          return storageSalads.filter((item) => item.blockId !== parentElemId);
        }
      }
    },
    [addedSalads, dispatch]
  );

  useEffect(() => {
    localStorage.setItem(ADDED_SALAD_STORAGE, JSON.stringify(addedSalads));
  }, [addedSalads]);

  return (
    <div className="selected-salads">
      <h3>Готовые салаты</h3>
      <div className="selected-salads-items">
        {addedSalads.length === 0 ? (
          <h4>Пусто</h4>
        ) : (
          addedSalads.map((item) => {
            return (
              <SaladCard
                title={item.title}
                price={item.price}
                discount_price={item.discount_price}
                key={item.blockId}
                onClick={removeSalad}
                btn_label={item.added && "Удалить"}
                blockId={item.blockId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

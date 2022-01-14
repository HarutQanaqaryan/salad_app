import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BackWelcomePage from "../components/back-to-welcome-page";
import { SaladCard } from "../components/salad-card";
import { fetchSalads } from "../store/action-creators/fetch-salads";
import { ADDED_SALAD_STORAGE, addSaladType } from "../store/addSaladReducer";
import { DATA_SALAD_STORAGE, fetchSaladsType } from "../store/saladReducer";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import "../assets/styles/choose-salad.scss";


const ChooseSalad = () => {
  const { salads, loading, error } = useSelector((state) => state.salads);
  const { addedSalads } = useSelector((state) => state.mySalads);
  const dispatch = useDispatch();

  useEffect(() => {
    !localStorage.getItem(DATA_SALAD_STORAGE) && dispatch(fetchSalads());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(DATA_SALAD_STORAGE, JSON.stringify(salads))
  }, [salads])

  const addMySalads = useCallback(
    (e) => {
      let parentElemId = e.target.parentElement.id;
      let addedSaladsIds = addedSalads.map((item) => item.blockId);

      if (
        addedSaladsIds.length === 0 ||
        !addedSaladsIds.includes(parentElemId)
      ) {
        salads.forEach((item) => {
          if (parentElemId === item.dataSalad._id) {
            dispatch({
              type: addSaladType.ADD_SALAD,
              payload: {
                title: item.dataSalad.title,
                price: item.dataSalad.price,
                discount_price: item.dataSalad.discount_price,
                blockId: item.dataSalad._id,
                added: true,
              },
            });
            dispatch({
              type: fetchSaladsType.ADDED_SALAD,
              id: parentElemId,
              added: true,
            });
          }
        });
      }

      if (addedSaladsIds.includes(parentElemId)) {
        dispatch({
          type: addSaladType.REMOVE_SALAD,
          payload: addedSalads.filter((el) => el.blockId !== parentElemId),
        });
      }
      if (
        JSON.parse(
          localStorage.getItem(ADDED_SALAD_STORAGE).includes(parentElemId)
        )
      ) {
        return (
          JSON.parse(localStorage.getItem(ADDED_SALAD_STORAGE)).filter(
            (item) => item.blockId !== parentElemId
          ),
          dispatch({
            type: fetchSaladsType.ADDED_SALAD,
            id: parentElemId,
            added: false,
          })
        );
      }
    },
    [addedSalads, dispatch, salads]
  );

  useEffect(() => {
    localStorage.setItem(
      ADDED_SALAD_STORAGE,
      JSON.stringify(addedSalads.map((item) => item))
    );
  }, [addedSalads]);

  useEffect(() => {
    localStorage.setItem(DATA_SALAD_STORAGE, JSON.stringify(salads));
  }, [salads]);

  return (
    <div className="choose-salad-block">
      <BackWelcomePage />

      {loading && <Loading />}

      {error && <Error />}

      {salads.map(({ dataSalad, isAdded }) => {
        return (
          <SaladCard
            title={dataSalad.title}
            price={dataSalad.price}
            discount_price={dataSalad.discount_price}
            key={dataSalad._id}
            onClick={addMySalads}
            btn_label={isAdded ? "Добавлено" : "Добавить в мои салаты"}
            blockId={dataSalad._id}
          />
        );
      })}
    </div>
  );
};

export default ChooseSalad;

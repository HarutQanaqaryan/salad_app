import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BackWelcomePage from "../components/back-to-welcome-page";
import { SaladCard } from "../components/salad-card";
import { fetchSalads } from "../store/action-creators/fetch-salads";
import { addSaladType } from "../store/addSaladReducer";
import "../assets/styles/choose-salad.scss";

const ChooseSalad = () => {
  const { salads, loading, error } = useSelector((state) => state.salads);
  const { addSalad, addBtnLabel } = useSelector((state) => state.mySalads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalads());
  }, [dispatch]);

  const addMySalads = (e) => {
    dispatch({ type: addSaladType.ADD_SALAD, payload: e.target.parentElement });
  };

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="choose-salad-block">
      <BackWelcomePage />
      {salads.map((salad) => {
        return (
          <SaladCard
            title={salad.title}
            price={salad.price}
            discount_price={salad.discount_price}
            key={salad._id}
            onClick={addMySalads}
            btn_label={addBtnLabel}
            id={salad._id}
          />
        );
      })}
    </div>
  );
};

export default ChooseSalad;

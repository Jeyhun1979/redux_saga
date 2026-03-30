import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchServicesRequested } from "../../store/servicesSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import "./ServicesPage.css";

const ServicesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listState = useSelector((state: RootState) => state.services.list);

  useEffect(() => {
    if (!listState.data) {
      dispatch(fetchServicesRequested());
    }
  }, [dispatch, listState.data]);

  const onRetry = () => dispatch(fetchServicesRequested());

  return (
    <section className="page-wrap">
      <h1>Список услуг</h1>
      {listState.loading && <Spinner />}
      {listState.error && (
        <ErrorView error={listState.error} onRetry={onRetry} />
      )}
      {!listState.loading && !listState.error && listState.data && (
        <ul className="services-list">
          {listState.data.map((item) => (
            <li key={item.id} className="services-list-item">
              <Link to={`/${item.id}/details`} className="services-link">
                <span className="services-name">{item.name}</span>
                <span className="services-price">{item.price} ₽</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ServicesPage;

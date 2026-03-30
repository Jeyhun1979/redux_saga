import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  fetchServiceDetailsRequested,
  fetchServicesRequested,
} from "../../store/servicesSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import "./ServiceDetailsPage.css";

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const listState = useSelector((state: RootState) => state.services.list);
  const detailsState = useSelector(
    (state: RootState) => state.services.details,
  );

  useEffect(() => {
    if (!listState.data) {
      dispatch(fetchServicesRequested());
    }
    if (id) {
      dispatch(fetchServiceDetailsRequested(id));
    }
  }, [dispatch, id, listState.data]);

  const onRetry = () => {
    if (id) {
      dispatch(fetchServiceDetailsRequested(id));
    }
  };

  return (
    <section className="page-wrap">
      <Link to="/" className="back-link">
        ← Назад к списку
      </Link>
      <h1>Детали услуги</h1>
      {listState.data && (
        <aside className="services-sidebar">
          <h2>Все услуги</h2>
          <ul className="services-list">
            {listState.data.map((item) => (
              <li
                key={item.id}
                className={`services-list-item ${item.id === id ? "active" : ""}`}
              >
                <Link to={`/${item.id}/details`} className="services-link">
                  <span className="services-name">{item.name}</span>
                  <span className="services-price">{item.price} ₽</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
      {detailsState.loading && <Spinner />}
      {detailsState.error && (
        <ErrorView error={detailsState.error} onRetry={onRetry} />
      )}
      {!detailsState.loading && !detailsState.error && detailsState.data && (
        <article className="details-card">
          <h2>{detailsState.data.name}</h2>
          <p className="details-price">Цена: {detailsState.data.price} ₽</p>
          <p className="details-content">{detailsState.data.content}</p>
          <p className="details-id">ID: {detailsState.data.id}</p>
        </article>
      )}
      {!detailsState.loading && !detailsState.error && !detailsState.data && (
        <p>Нет данных для выбранной услуги.</p>
      )}
    </section>
  );
};

export default ServiceDetailsPage;

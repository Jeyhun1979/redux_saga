import type { Service, ServiceDetails } from "../store/servicesSlice";

const BASE_URL = "http://localhost:7070/api";

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text().catch(() => null);
    const message = text || `${response.status} ${response.statusText}`;
    throw new Error(`Server error: ${message}`);
  }
  return response.json();
};

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${BASE_URL}/services`);
  return checkResponse(response);
};

export const fetchServiceDetails = async (
  id: string,
): Promise<ServiceDetails> => {
  const response = await fetch(
    `${BASE_URL}/services/${encodeURIComponent(id)}`,
  );
  return checkResponse(response);
};

import React, { createContext, useContext, useEffect, useState } from "react";
import geographyService from "../services/geography.service";

// Create context
const GeographyContext = createContext();

// Provider
export const GeographyProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState(null);

  const [statesCache, setStatesCache] = useState({});
  const [citiesCache, setCitiesCache] = useState({});

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const result = await geographyService.getCountries();
      setCountries(result || []);
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError(err);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchStates = async (countryId) => {
    if (!countryId) {
      setStates([]);
      return;
    }

    if (statesCache[countryId]) {
      setStates(statesCache[countryId]);
      return;
    }

    try {
      setLoadingStates(true);
      const result = await geographyService.getStates(countryId);
      const data = result || [];

      setStates(data);

      setStatesCache(prev => ({
        ...prev,
        [countryId]: data
      }));
    } catch (err) {
      console.error("Error fetching states:", err);
      setError(err);
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchCities = async (stateId) => {
    if (!stateId) {
      setCities([]);
      return;
    }

    if (citiesCache[stateId]) {
      setCities(citiesCache[stateId]);
      return;
    }

    try {
      setLoadingCities(true);
      const result = await geographyService.getCities(stateId);
      const data = result || [];

      setCities(data);

      setCitiesCache(prev => ({
        ...prev,
        [stateId]: data
      }));
    } catch (err) {
      console.error("Error fetching cities:", err);
      setError(err);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const value = {
    countries,
    states,
    cities,

    loadingCountries,
    loadingStates,
    loadingCities,

    fetchCountries,
    fetchStates,
    fetchCities,

    error,
  };

  return (
    <GeographyContext.Provider value={value}>
      {children}
    </GeographyContext.Provider>
  );
};

export const useGeography = () => {
  const context = useContext(GeographyContext);

  if (!context) {
    throw new Error("useGeography must be used within GeographyProvider");
  }

  return context;
};
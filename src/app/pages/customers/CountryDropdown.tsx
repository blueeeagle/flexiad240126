import { useCallback, useEffect, useState } from "react";

interface Country {
  _id: string;
  name: string;
  currencyId: {
    _id: string;
    currency: string;
    symbol: string;
  };
}

interface CountryDropdownProps {
  onCountrySelect: (country: { countryId: string; currencyId: string }) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("6566946881f360c33361e259");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCountryList = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("https://adminapi.flexiclean.me/api/v1/master/countries", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.data?.length > 0) {
        setCountries(result.data);
        console.log("✅ Fetched Countries:", result.data);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountryList();
  }, [fetchCountryList]);

  useEffect(() => {
    const selected = countries.find((c) => c._id === selectedCountryId);
    if (selected) {
      onCountrySelect({ countryId: selected._id, currencyId: selected.currencyId._id }); // ✅ extract currencyId._id
    }
  }, [selectedCountryId, countries, onCountrySelect]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryId(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="country" className="form-label fw-semibold">
        Select Country
      </label>
      <select
        id="country"
        className="form-select"
        value={selectedCountryId}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="">-- Select a country --</option>
        {countries.map((country) => (
          <option key={country._id} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>
      {loading && <div className="form-text text-primary">Loading countries...</div>}
      {error && <div className="form-text text-danger">Error: {error}</div>}
    </div>
  );
};

export default CountryDropdown;

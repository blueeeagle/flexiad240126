// import { useCallback, useEffect, useState } from "react";

// interface Country {
//   _id: string;
//   name: string;
// }

// interface CountryDropdownProps {
//   onCountrySelect: (countryId: string) => void;
// }

// const CountryDropdown: React.FC<CountryDropdownProps> = ({ onCountrySelect }) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [selectedCountryId, setSelectedCountryId] = useState<string>("6566946881f360c33361e259");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   const fetchCountryList = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const response = await fetch("https://adminapi.flexiclean.me/api/v1/master/countries", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       if (result && result.data) {
//         setCountries(result.data);
//       }
//     } catch (error) {
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCountryList();
//   }, [fetchCountryList]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;
//     setSelectedCountryId(selectedId);
//     onCountrySelect(selectedId);
//   };

//   return (
//     <div className="mb-3">
//       <label htmlFor="country" className="form-label fw-semibold">
//         Select Country
//       </label>
//       <select
//         id="country"
//         className="form-select"
//         value={selectedCountryId}
//         onChange={handleChange}
//         disabled={loading}
//       >
//         <option value="">-- Select a country --</option>
//         {countries.map((country) => (
//           <option key={country._id} value={country._id}>
//             {country.name}
//           </option>
//         ))}
//       </select>
//       {loading && <div className="form-text text-primary">Loading countries...</div>}
//       {error && <div className="form-text text-danger">Error: {error}</div>}
//     </div>
//   );
// };

// export default CountryDropdown;


import { useCallback, useEffect, useState } from "react";

interface Country {
  _id: string;
  name: string;
}

interface CountryDropdownProps {
  onCountrySelect: (countryId: string) => void;
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
      if (result && result.data) {
        setCountries(result.data);
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
    // Notify parent initially
    onCountrySelect(selectedCountryId);
  }, [selectedCountryId, onCountrySelect]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedCountryId(selectedId);
    onCountrySelect(selectedId);
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

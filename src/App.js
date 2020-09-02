import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "C-algorithms",
      url: "https://github.com/rpajf/C-algorithms",
      techs: ["c"],
    });
    setRepositories([...repositories, response.data]);
  }

  

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio Node.js",
      url: "http://github.com/...",
      techs: ["Node.js", "React"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(filteredRepositories);
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import gitLogo from "../assets/github-logo.png";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import Button from "../components/Button";
import { api } from "../services/api";

import { Container } from "./styles";
function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
        return;
      }
    }
    alert("Repository not found");
  };

  // função para remover o repositório
  const handleRemoveRepo = (id) => {
    console.log("Removendo registro", id);

    const removedRepo = repos.filter((repo) => repo.id !== id);
    setRepos(removedRepo);
    // ultilizando filter
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;

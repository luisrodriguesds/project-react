import React from "react";
import { useAuth } from "../contexts/auth";

// import { Container } from './styles';

const Catalog: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Catalog</h1>
      <h2>{user.name}</h2>
    </div>
  );
};

export default Catalog;

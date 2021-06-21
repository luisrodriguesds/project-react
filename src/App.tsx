import React from 'react';
import './App.css';
import GenericCard from "./Components/GenericCard";

function App() {
  return (
    <div className="App">
      <GenericCard title={"Login"}
                   description={{value:"Something description like really very big",type:"textarea"}}
                   img={"https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png"} subtitle={"username"}/>
    </div>
  );
};

export default App;

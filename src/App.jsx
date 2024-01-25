import React, { useEffect, useRef, useState } from "react";
import { Messages } from "primereact/messages";
import axios from "axios";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { ProgressSpinner } from "primereact/progressspinner";
import copy from "clipboard-copy";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(16);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/passwordgenerator?length=${value}`,
      headers: {
        "X-Api-Key": "TyvX7NrvmCbJ9xsiNW6f4A==ioWR7qO7m2TsUYMx",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setPassword(response.data.random_password);
      setLoading(false);
    });
  };
  const msgs = useRef(null);

  const addMessages = () => {
    if (password !== "") {
      msgs.current.show([
        {
          severity: "success",
          summary: "Kopyalama Başarılı",
          detail: `${password}`,
          sticky: true,
          closable: false,
        },
      ]);
      copy(password);
      setTimeout(() => {
        msgs.current.clear();
      }, 2000);
    }
  };
  return (
    <div className="veri-alan">
      <Fieldset>
        <h2>Random Password Generator</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <h4>Number of Characters</h4>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "50px",
          }}
        >
          <Button label="Generate" onClick={handleClick} />
          <div className="center-right">
            {loading ? (
              <ProgressSpinner style={{ height: "50px" }} />
            ) : (
              password
            )}
          </div>
          <i className="bi bi-copy" onClick={addMessages} />
        </div>
      </Fieldset>

      <img
        src="https://images.wondershare.com/recoverit/article/all-you-need-to-know-about-ai-hacking-1.jpg"
        alt=""
      />
      <Messages ref={msgs} />
    </div>
  );
}

export default App;

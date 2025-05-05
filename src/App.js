import { useEffect, useState } from "react";
import "./App.css";
import planeButton from "./plane.png";

function App() {
  const [advice, setAdvice] = useState("");
  const [fade, setFade] = useState(true);
  const [isFlying, setIsFlying] = useState(false);

  const getAdvice = async () => {
    // Запускаем анимацию "взлёта"
    setIsFlying(true);

    // Ждём окончания анимации (например, 800мс)
    setTimeout(() => {
      setIsFlying(false);
    }, 800);

    // Обновление текста
    const response = await fetch("https://bored.api.lewagon.com/api/activity");
    const data = await response.json();
    setFade(false);
    setTimeout(() => {
      setAdvice(data.activity);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="App">
      <div className="content-box">
        <h2>Are you bored? Get idea!</h2>
        <div className="advice-box">
  <p className={`advice ${fade ? "fade-in" : "fade-out"}`}>{advice}</p>
</div>

        <button onClick={getAdvice} className="plane-button" title="Получить идею">
          <img
            src={planeButton}
            alt="Самолётик"
            className={isFlying ? "fly" : ""}
          />
        </button>
      </div>
    </div>
  );
}


export default App;

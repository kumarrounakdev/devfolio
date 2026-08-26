import "./Stats.css";

export default function Stats() {
  return (
    <div className="stats">
      <div>
        <div className="stat__value">+12</div>
        <div className="stat__label">Years of<br />Experience</div>
      </div>
      <div>
        <div className="stat__value">+46</div>
        <div className="stat__label">Projects<br />Completed</div>
      </div>
      <div>
        <div className="stat__value">+20</div>
        <div className="stat__label">Worldwide<br />Clients</div>
      </div>
    </div>
  );
}

import "./ToolCard.css";

export default function ToolCard({ icon, name, category }) {
  return (
    <div className="tool-card">
      {icon}
      <div>
        <h4 className="tool-card__name">{name}</h4>
        <p className="tool-card__category">{category}</p>
      </div>
    </div>
  );
}

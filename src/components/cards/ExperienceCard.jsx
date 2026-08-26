import { ArrowUpRight } from "../icons/UiIcons";
import "./ExperienceCard.css";

export default function ExperienceCard({ title, description, date }) {
  return (
    <div className="experience-card">
      <div className="experience-card__row">
        <div className="experience-card__body">
          <h4 className="experience-card__title">{title}</h4>
          <p className="experience-card__description">{description}</p>
          <p className="experience-card__date">{date}</p>
        </div>
        <div className="experience-arrow">
          <ArrowUpRight />
        </div>
      </div>
    </div>
  );
}

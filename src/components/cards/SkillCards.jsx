import { ReactIcon, NodeJSIcon } from "../icons/UiIcons";
import "./SkillCards.css";

export default function SkillCards() {
  return (
    <div className="skill-grid">
      {/* Currently Card */}
      <div className="skill-card skill-card--orange">
        <ReactIcon />

        <h3 className="skill-card__title skill-card__title--white">
          Currently
        </h3>

        <ul className="skill-card__list skill-card__list--white">
          <li>Building React projects</li>
          <li>Exploring modern frontend patterns</li>
        </ul>
      </div>

      {/* Learning Card */}
      <div className="skill-card skill-card--lime">
        <NodeJSIcon className="icon-black" />

        <h3 className="skill-card__title skill-card__title--dark">
          Learning
        </h3>

        <ul className="skill-card__list skill-card__list--dark">
          <li>Node.js & Express</li>
          <li>Backend & REST APIs</li>
        </ul>
      </div>
    </div>
  );
}
import { ReactIcon, TypeScriptIcon, NextJSIcon, MongoDBIcon, ExpressIcon, NodeJSIcon, N8nIcon } from "../icons/UiIcons";
import "./SkillCards.css";

export default function SkillCards() {
  return (
    <div className="skill-grid">
      {/* Currently Card */}
      <div className="skill-card skill-card--orange">
        <div className="skill-card__icons">
          <ReactIcon />
          <MongoDBIcon />
          <ExpressIcon />
          <NodeJSIcon />
          <N8nIcon />
        </div>

        <h3 className="skill-card__title skill-card__title--white">
          Currently
        </h3>

        <ul className="skill-card__list skill-card__list--white">
          <li>Building projects with the MERN stack and automating stuff with n8n</li>
        </ul>
      </div>

      {/* Learning Card */}
      <div className="skill-card skill-card--lime">
        <div className="skill-card__icons">
          <TypeScriptIcon className="icon-black" />
          <NextJSIcon className="icon-black" />
        </div>

        <h3 className="skill-card__title skill-card__title--dark">
          Learning
        </h3>

        <ul className="skill-card__list skill-card__list--dark">
          <li>Learning Next.js and TypeScript to build production grade fullstack applications</li>
        </ul>
      </div>
    </div>
  );
}
import { ArrowUpRight } from "../icons/UiIcons";
import "./ProjectCard.css";

export default function ProjectCard({ image, title, subtitle }) {
  return (
    <div className="project-card">
      <div className="project-card__thumb">
        <img
          src={image}
          alt={title}
          className="project-card__img"
          loading="lazy"
          decoding="async"
          width="80"
          height="64"
        />
      </div>
      <div className="project-card__body">
        <h4 className="project-card__title">{title}</h4>
        <p className="project-card__subtitle">{subtitle}</p>
      </div>
      <div className="project-arrow">
        <ArrowUpRight />
      </div>
    </div>
  );
}

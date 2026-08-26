import { ArrowUpRight } from "../icons/UiIcons";
import "./BlogCard.css";

export default function BlogCard({ title, excerpt, date, readTime }) {
  return (
    <div className="blog-card">
      <div className="blog-card__row">
        <div className="blog-card__body">
          <h4 className="blog-card__title">{title}</h4>
          <p className="blog-card__excerpt">{excerpt}</p>
          <div className="blog-card__meta">
            <span>{date}</span>
            <span>{readTime}</span>
          </div>
        </div>
        <div className="blog-arrow">
          <ArrowUpRight />
        </div>
      </div>
    </div>
  );
}

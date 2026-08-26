import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "../cards/BlogCard";
import SectionTitle from "../layout/SectionTitle";
import { blogPosts } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".blog-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.16,
          delay: 0.2,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="section-shell">
      <SectionTitle white="Design" gray="Thoughts" />

      <div className="blog-list">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.title}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            readTime={post.readTime}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "./homeContent";
import "./TestimonialsCarousel.css";

// The saved WordPress carousel starts with these three entries.
const order = [3, 4, 5, 0, 1, 2];
const images = ["1-scaled.jpg", "2.webp", "3.webp", "team-1.jpg", "WhatsApp-Image-2025-06-14-at-1.49.00-PM.jpeg", null];
const slides = order.map((index, i) => ({ ...testimonials[index], image: images[i] }));
const count = slides.length;
const repeated = [...slides.slice(-3), ...slides, ...slides.slice(0, 3)];

export default function TestimonialsCarousel() {
  const [position, setPosition] = useState(3);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || focused || reducedMotion) return;
    const timer = window.setInterval(() => setPosition(value => value + 1), 3000);
    return () => window.clearInterval(timer);
  }, [paused, focused, reducedMotion]);

  function move(value) {
    if (position < 3 || position >= count + 3) return;
    setTransition(!reducedMotion);
    setPosition(reducedMotion ? ((value - 3 + count) % count) + 3 : value);
  }

  function finishTransition() {
    if (position >= count + 3 || position < 3) {
      setTransition(false);
      setPosition(position >= count + 3 ? position - count : position + count);
    }
  }

  useEffect(() => {
    if (!transition && !reducedMotion) {
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)));
      return () => cancelAnimationFrame(frame);
    }
  }, [transition, reducedMotion]);

  const active = ((position - 3) % count + count) % count;

  return (
    <section aria-labelledby="testimonials-heading" className="testimonials-section" onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="testimonials-container">
        <h2 id="testimonials-heading">Testimonials</h2>
        <div className="testimonials-viewport">
          <div className="testimonials-track" style={{ transform: `translateX(calc(var(--testimonial-step) * -${position}))`, transition: transition && !reducedMotion ? undefined : "none" }} onTransitionEnd={finishTransition}>
            {repeated.map((item, index) => (
              <div className="testimonials-slide" key={`${index}-${item.name}`} aria-hidden={index < 3 || index >= count + 3 ? true : undefined}>
                <figure className="testimonials-card" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                  {item.image ? <Image src={`/images/testimonials/${item.image}`} alt="" width={72} height={72} className="testimonials-avatar" /> : <span className="testimonials-avatar testimonials-avatar-empty" aria-hidden="true" />}
                  <figcaption><strong>{item.name}</strong>{item.role && <span>{item.role}</span>}</figcaption>
                  <blockquote>{item.quote}</blockquote>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonials-controls" aria-label="Testimonial carousel controls">
          <button type="button" onClick={() => move(position - 1)} aria-label="Previous testimonial">‹</button>
          <div className="testimonials-dots">{slides.map((slide, index) => <button type="button" key={slide.name} onClick={() => move(index + 3)} aria-label={`Show testimonial ${index + 1}`} aria-current={index === active ? "true" : undefined} />)}</div>
          <button type="button" onClick={() => move(position + 1)} aria-label="Next testimonial">›</button>
        </div>
      </div>
    </section>
  );
}

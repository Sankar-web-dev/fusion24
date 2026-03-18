import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid } from "@/components/gallery-grid";

export default function GalleryPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="GALLERY"
            title="Premium. Cinematic. Powerful."
            description="A modern gym interior with lighting, space, and equipment designed to make you feel unstoppable."
          />
        </Reveal>

        <div className="mt-10">
          <GalleryGrid
            images={[
              {
                src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1800&q=80",
                alt: "Gym training",
              },
              {
                src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1800&q=80",
                alt: "Modern gym interior",
              },
              {
                src: "https://images.unsplash.com/photo-1517964108460-ecb70c2ee1d0?auto=format&fit=crop&w=1800&q=80",
                alt: "Workout",
              },
              {
                src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=80",
                alt: "Strength training",
              },
              {
                src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1800&q=80",
                alt: "Gym equipment",
              },
              {
                src: "https://images.unsplash.com/photo-1599058917212-d750089bc04c?auto=format&fit=crop&w=1800&q=80",
                alt: "Trainer coaching",
              },
              {
                src: "https://images.unsplash.com/photo-1526401485004-2aa7b0b4a22b?auto=format&fit=crop&w=1800&q=80",
                alt: "Strength session",
              },
              {
                src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80",
                alt: "Fitness training",
              },
              {
                src: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1800&q=80",
                alt: "Crossfit workout",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}


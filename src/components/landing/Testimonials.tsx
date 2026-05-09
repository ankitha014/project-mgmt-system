import { motion } from "framer-motion";

const stats = [
  { value: "10x", label: "Faster delivery" },
  { value: "40%", label: "Less meetings" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10k+", label: "Teams using us" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Trusted by the best
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of high-performance teams who have already transformed the way they work.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 glass-panel p-8 md:p-12 text-center max-w-4xl mx-auto border border-white/10"
        >
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-heading font-medium leading-relaxed mb-8">
            "Worksprint Hub is the only tool that manages to be both incredibly powerful and beautifully simple. It has completely changed how our team operates."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Sarah Jenkins</div>
              <div className="text-sm text-muted-foreground">VP of Product, TechCorp</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

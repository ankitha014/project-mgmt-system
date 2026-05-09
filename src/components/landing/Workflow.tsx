import { motion } from "framer-motion";
import analyticsMockup from "@/assets/analytics_mockup.png";

const steps = [
  {
    number: "01",
    title: "Create a Workspace",
    description: "Set up your company's dedicated environment in seconds. Invite team members and configure roles.",
  },
  {
    number: "02",
    title: "Organize Projects",
    description: "Break down large initiatives into manageable projects. Define goals, deadlines, and key deliverables.",
  },
  {
    number: "03",
    title: "Execute Tasks",
    description: "Assign work, track progress through kanban boards, and collaborate via threaded comments.",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Designed for <span className="qa-text">flow state</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've obsessed over every interaction so you don't have to. The result is a workflow that feels entirely natural, allowing your team to maintain focus and momentum.
              </p>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center font-semibold text-primary border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="w-px h-full bg-gradient-to-b from-primary/30 to-transparent mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-2 rounded-2xl border border-white/10 shadow-luxe hover-tilt"
            >
              <div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/5 relative flex items-center justify-center aspect-square">
                <img src={analyticsMockup} alt="Worksprint Hub Analytics Mockup" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

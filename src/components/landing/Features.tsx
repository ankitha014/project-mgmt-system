import { motion, Variants } from "framer-motion";
import { Layout, CheckCircle2, Users, BarChart3, Bell, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Workspace Management",
    description: "Organize your company into distinct workspaces. Keep projects, tasks, and teams perfectly siloed yet accessible.",
    icon: <Layout className="w-6 h-6 text-primary" />,
  },
  {
    title: "Intuitive Task Tracking",
    description: "Create, assign, and track tasks with ease. Use kanban boards, lists, and powerful filters to stay on top of work.",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Seamless Collaboration",
    description: "Built-in commenting, file sharing, and real-time updates ensure your team is always perfectly in sync.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Powerful Analytics",
    description: "Get deep insights into team productivity, project velocity, and completion rates with beautiful visual dashboards.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Smart Notifications",
    description: "Never miss an important update. Customizable notifications keep you informed without the noise.",
    icon: <Bell className="w-6 h-6 text-primary" />,
  },
  {
    title: "Lightning Fast",
    description: "Built on modern architecture, everything from loading a project to moving a task happens instantaneously.",
    icon: <ArrowRight className="w-6 h-6 text-primary" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Everything you need to <span className="qa-text">ship faster</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of tools designed to remove friction from your workflow and keep your team focused on what matters most.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-8 hover-tilt group border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

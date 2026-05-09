import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkSprint_HubLogo } from "@/components/branding/WorkSprint_HubLogo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 mx-4 mt-4 px-6 py-3 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-2">
        <WorkSprint_HubLogo showWordmark={true} />
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#workflow" className="hover:text-primary transition-colors">How it works</a>
        <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          Sign In
        </Link>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow rounded-full px-6">
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}

import { Waves, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-secondary/30 pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold tracking-tight text-primary">
              Balatasan <span className="text-accent-foreground">Stay</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experience the natural beauty of Bulalacao, Oriental Mindoro. Our community-based eco-tourism resort offers a serene escape.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/accommodations" className="hover:text-primary">Accommodations</Link></li>
            <li><Link href="/tours" className="hover:text-primary">Island Tours</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Balatasan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>Balatasan, Bulalacao, Oriental Mindoro</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>0930-872-9498</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span>guiller12mendoza@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get travel inspiration and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-background border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Balatasan Beach Resort. All rights reserved.</p>
      </div>
    </footer>
  );
}

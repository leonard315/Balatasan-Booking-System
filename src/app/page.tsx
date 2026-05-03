
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RoomCard } from "@/components/room-card";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Loader2, Waves, Anchor } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, limit, query, where } from "firebase/firestore";

export default function Home() {
  const firestore = useFirestore();
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-beach");

  const featuredRoomsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "rooms"), limit(2));
  }, [firestore]);

  const islandHoppingQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "tours"), where("category", "==", "island-hopping"), limit(3));
  }, [firestore]);

  const waterActivitiesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "tours"), where("category", "==", "water-activities"), limit(3));
  }, [firestore]);

  const { data: featuredRooms, isLoading: roomsLoading } = useCollection(featuredRoomsQuery);
  const { data: islandHopping, isLoading: islandLoading } = useCollection(islandHoppingQuery);
  const { data: waterActivities, isLoading: waterLoading } = useCollection(waterActivitiesQuery);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
          {heroImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover brightness-90 transition-transform duration-[20000ms] hover:scale-110"
                priority
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          )}
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-6">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight drop-shadow-2xl">
                Balatasan
              </h1>
              <p className="text-lg md:text-2xl text-white/95 font-medium tracking-[0.4em] uppercase drop-shadow-lg mt-2">
                Bulalacao • Oriental Mindoro
              </p>
              
              <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/accommodations">
                  <Button size="lg" className="px-10 py-7 text-lg rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-all font-bold hover:scale-105 active:scale-95">
                    Book a Cottage
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button size="lg" variant="outline" className="px-10 py-7 text-lg bg-white/10 backdrop-blur-xl border-white/40 text-white rounded-full hover:bg-white/20 transition-all font-bold hover:scale-105 active:scale-95">
                    Start Adventure
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 space-y-3">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">The Experience</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-slate-900">Your Tropical Escape</h2>
              <div className="h-1.5 w-16 bg-primary/20 mx-auto rounded-full mt-6" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-3xl hover:bg-primary/[0.03] transition-all duration-500">
                <div className="p-5 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <Anchor className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-headline text-2xl font-bold">Floating Cottages</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">Sleep on the water and wake up to the sound of gentle waves in our signature over-water accommodations.</p>
                </div>
              </div>
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-3xl hover:bg-primary/[0.03] transition-all duration-500">
                <div className="p-5 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <Compass className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-headline text-2xl font-bold">Island Hopping</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">Discover hidden gems and untouched sandbars across the beautiful Bulalacao archipelago.</p>
                </div>
              </div>
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-3xl hover:bg-primary/[0.03] transition-all duration-500">
                <div className="p-5 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <Waves className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-headline text-2xl font-bold">Water Activities</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">Dive into crystal clear waters with snorkeling, kayaking, and high-speed paddleboarding adventures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Accommodations */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-3">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Accommodation</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-slate-900">Over-water Stay</h2>
              </div>
              <Link href="/accommodations">
                <Button variant="link" className="text-primary font-bold text-lg gap-2 p-0 group">
                  View All Options <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {roomsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {featuredRooms?.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Island Hopping Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-3">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Adventure</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Island Hopping</h2>
              </div>
              <Link href="/tours?category=island-hopping">
                <Button variant="link" className="text-primary font-bold text-lg gap-2 p-0 group">
                  Explore More <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {islandLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {islandHopping?.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Water Activities Section */}
        <section className="py-24 bg-primary/[0.02]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-3">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Experience</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Water Activities</h2>
              </div>
              <Link href="/tours?category=water-activities">
                <Button variant="link" className="text-primary font-bold text-lg gap-2 p-0 group">
                  View All <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {waterLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {waterActivities?.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

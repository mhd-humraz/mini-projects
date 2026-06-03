import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AlertCard from "@/components/AlertCard";
import DisasterMap from "@/components/DisasterMap";
import ShelterCard from "@/components/ShelterCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import SOSButton from "@/components/SOSButton";

const mockAlerts = [
  {
    id: "1",
    title: "Severe Flood Warning - Coastal Districts",
    description: "Heavy rainfall expected to continue for the next 48 hours. Water levels rising rapidly in low-lying areas. Immediate evacuation recommended.",
    severity: "critical" as const,
    type: "flood" as const,
    location: "Coastal District, Ward 5-12",
    time: "5 mins ago",
    isNew: true,
  },
  {
    id: "2",
    title: "Cyclone Alert - Category 3",
    description: "Tropical cyclone approaching from the Bay of Bengal. Expected landfall in 24-36 hours. Prepare emergency supplies.",
    severity: "high" as const,
    type: "cyclone" as const,
    location: "Eastern Region",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: "3",
    title: "Landslide Risk - Hill Areas",
    description: "Soil saturation levels critical due to continuous rainfall. Avoid travel through hill routes.",
    severity: "medium" as const,
    type: "landslide" as const,
    location: "Northern Hills",
    time: "6 hours ago",
  },
  {
    id: "4",
    title: "Fire Hazard Advisory",
    description: "Dry conditions increasing fire risk. Exercise caution with open flames and electrical equipment.",
    severity: "low" as const,
    type: "fire" as const,
    location: "Industrial Zone",
    time: "1 day ago",
  },
];

const mockShelters = [
  {
    id: "1",
    name: "Central Community Hall",
    address: "123 Main Street, Downtown District",
    capacity: 500,
    currentOccupancy: 320,
    phone: "+91-9876543210",
    hasFood: true,
    hasMedical: true,
    distance: "1.2 km",
  },
  {
    id: "2",
    name: "Government School Complex",
    address: "45 Education Lane, Sector 7",
    capacity: 300,
    currentOccupancy: 285,
    phone: "+91-9876543211",
    hasFood: true,
    hasMedical: false,
    distance: "2.8 km",
  },
  {
    id: "3",
    name: "Sports Stadium",
    address: "Olympic Road, Central Area",
    capacity: 1000,
    currentOccupancy: 150,
    phone: "+91-9876543212",
    hasFood: false,
    hasMedical: true,
    distance: "4.5 km",
  },
];

const mockAnnouncements = [
  {
    id: "1",
    title: "Evacuation Order for Coastal Ward 5-8",
    content: "All residents in Ward 5-8 must evacuate immediately to designated shelters. Emergency buses available at ward centers. Carry essential documents and medications only.",
    source: "District Administration",
    time: "30 mins ago",
    isVerified: true,
  },
  {
    id: "2",
    title: "Road Closure: Highway 45 & Coastal Road",
    content: "Due to flooding, Highway 45 and the entire Coastal Road are closed until further notice. Use alternate routes via Inner Ring Road.",
    source: "Traffic Police",
    time: "1 hour ago",
    isVerified: true,
  },
  {
    id: "3",
    title: "Emergency Helpline Numbers Active",
    content: "Disaster helpline: 1800-XXX-XXXX (toll-free). Medical emergencies: 108. Fire services: 101. Available 24/7.",
    source: "Emergency Services",
    time: "3 hours ago",
    isVerified: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content with padding for fixed header */}
      <main className="pt-16">
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-8 border-y border-border bg-card/50">
          <div className="container mx-auto px-4">
            <StatsBar />
          </div>
        </section>

        {/* Active Alerts Section */}
        <section id="alerts" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Active Alerts</h2>
                <p className="text-muted-foreground">Real-time emergency updates for your region</p>
              </div>
              <span className="px-3 py-1.5 text-sm font-semibold bg-destructive/10 text-destructive rounded-full">
                {mockAlerts.length} Active
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {mockAlerts.map((alert, index) => (
                <div key={alert.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <AlertCard {...alert} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Map Section */}
        <section id="map" className="py-12 lg:py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Live Disaster Map</h2>
              <p className="text-muted-foreground">Interactive view of affected zones, shelters, and safe areas</p>
            </div>
            <DisasterMap />
          </div>
        </section>

        {/* Shelters Section */}
        <section id="shelters" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Nearby Shelters</h2>
              <p className="text-muted-foreground">Find safe shelter with available resources</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockShelters.map((shelter, index) => (
                <div key={shelter.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <ShelterCard {...shelter} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section id="announcements" className="py-12 lg:py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Official Announcements</h2>
              <p className="text-muted-foreground">Verified updates from authorities</p>
            </div>
            
            <div className="max-w-3xl space-y-4">
              {mockAnnouncements.map((announcement, index) => (
                <div key={announcement.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <AnnouncementCard {...announcement} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 DisasterShield. Emergency Response System.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Emergency Contacts
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Guidelines
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Report Issue
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating SOS Button */}
      <SOSButton />
    </div>
  );
};

export default Index;

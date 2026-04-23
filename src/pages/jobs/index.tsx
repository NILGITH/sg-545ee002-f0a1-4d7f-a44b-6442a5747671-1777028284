import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Loader2 } from "lucide-react";
import { jobsService } from "@/services/jobsService";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [contractType, setContractType] = useState<string>("");
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    const { data } = await jobsService.getActiveJobs();
    setJobs(data || []);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const filters = {
      contract_type: contractType || undefined,
      location: location || undefined,
      sector: sector || undefined,
    };
    const { data } = await jobsService.searchJobs(searchTerm, filters);
    setJobs(data || []);
    setLoading(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setContractType("");
    setLocation("");
    setSector("");
    loadJobs();
  };

  return (
    <>
      <SEO 
        title="Offres d'emploi - HR Talents Partners"
        description="Découvrez nos offres d'emploi sélectionnées. CDI, CDD, stages dans tous les secteurs."
      />
      
      <Navigation />
      
      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Offres d'emploi
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Découvrez nos opportunités professionnelles sélectionnées avec soin. 
                Trouvez le poste qui correspond à vos aspirations.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-background sticky top-20 z-40 shadow-sm">
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="sr-only">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
                  <Input
                    id="search"
                    placeholder="Titre, entreprise, mot-clé..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contract" className="sr-only">Type de contrat</Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger id="contract">
                    <SelectValue placeholder="Type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location" className="sr-only">Localisation</Label>
                <Input
                  id="location"
                  placeholder="Ville, région..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Filter size={18} className="mr-2" />
                  Filtrer
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-accent" size={48} />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Aucune offre ne correspond à vos critères
                </p>
                <Button onClick={handleReset} variant="outline">
                  Voir toutes les offres
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible{jobs.length > 1 ? "s" : ""}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
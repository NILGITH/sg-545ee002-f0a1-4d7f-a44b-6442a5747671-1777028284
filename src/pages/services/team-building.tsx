import { useState } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { serviceRequestService } from "@/services/serviceRequestService";
import { Loader2, Send } from "lucide-react";

export default function TeamBuildingRequest() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    teamSize: "",
    preferredDate: "",
    activityType: "",
    locationPreference: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir tous les champs obligatoires (*)",
        variant: "destructive",
      });
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await serviceRequestService.createTeamBuildingRequest({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        teamSize: formData.teamSize ? parseInt(formData.teamSize) : undefined,
        preferredDate: formData.preferredDate || undefined,
        activityType: formData.activityType || undefined,
        locationPreference: formData.locationPreference || undefined,
        message: formData.message || undefined,
      });

      toast({
        title: "Demande envoyée avec succès !",
        description: "Notre équipe vous contactera sous 24-48h pour organiser votre Team Building.",
      });

      router.push("/services");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Demande de Team Building - HR Talents Partners"
        description="Organisez un Team Building sur mesure pour votre équipe en Côte d'Ivoire"
      />
      
      <Navigation />

      <main className="min-h-screen bg-background py-20">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Organiser mon Team Building</h1>
            <p className="text-lg text-muted-foreground">
              Remplissez ce formulaire et notre équipe vous contactera pour créer un événement mémorable
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations sur votre demande</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations de contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informations de contact</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nom du contact *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Détails de l'événement */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Détails de l'événement</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Nombre de participants</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        min="1"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Date souhaitée</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activityType">Type d'activité</Label>
                    <Select value={formData.activityType} onValueChange={(value) => setFormData({ ...formData, activityType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un type d'activité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="challenges">Challenges Collaboratifs</SelectItem>
                        <SelectItem value="sports">Compétitions Sportives</SelectItem>
                        <SelectItem value="creative">Ateliers Créatifs</SelectItem>
                        <SelectItem value="seminars">Séminaires Stratégiques</SelectItem>
                        <SelectItem value="mixed">Formule mixte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationPreference">Lieu souhaité</Label>
                    <Select value={formData.locationPreference} onValueChange={(value) => setFormData({ ...formData, locationPreference: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grand-bassam">Grand-Bassam (Resorts balnéaires)</SelectItem>
                        <SelectItem value="assinie">Assinie (Espaces nature)</SelectItem>
                        <SelectItem value="abidjan">Abidjan (Hôtels premium)</SelectItem>
                        <SelectItem value="yamoussoukro">Yamoussoukro</SelectItem>
                        <SelectItem value="other">Autre lieu (à préciser)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Besoins spécifiques</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Décrivez vos objectifs, contraintes particulières, budget estimé..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Envoyer la demande
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
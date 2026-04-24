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

export default function FormationRequest() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    trainingTopic: "",
    participantsCount: "",
    trainingFormat: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await serviceRequestService.createFormationRequest({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        trainingTopic: formData.trainingTopic || undefined,
        participantsCount: formData.participantsCount ? parseInt(formData.participantsCount) : undefined,
        trainingFormat: formData.trainingFormat as "intra" | "inter" | "elearning" | undefined,
        message: formData.message || undefined,
      });

      toast({
        title: "Demande envoyée avec succès !",
        description: "Notre équipe vous enverra le catalogue de formations et vous contactera sous 24-48h.",
      });

      router.push("/services");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Demande de Formation - HR Talents Partners"
        description="Demandez notre catalogue de formations professionnelles en Côte d'Ivoire"
      />
      
      <Navigation />

      <main className="min-h-screen bg-background py-20">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Demander un catalogue de formations</h1>
            <p className="text-lg text-muted-foreground">
              Remplissez ce formulaire et recevez notre catalogue complet de formations
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

                {/* Détails de la formation */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Détails de la formation</h3>

                  <div className="space-y-2">
                    <Label htmlFor="trainingTopic">Thématique souhaitée</Label>
                    <Select value={formData.trainingTopic} onValueChange={(value) => setFormData({ ...formData, trainingTopic: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une thématique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leadership">Leadership & Management</SelectItem>
                        <SelectItem value="communication">Communication Professionnelle</SelectItem>
                        <SelectItem value="ai">Intelligence Artificielle & Transformation Digitale</SelectItem>
                        <SelectItem value="project">Gestion de Projet</SelectItem>
                        <SelectItem value="personal">Développement Personnel</SelectItem>
                        <SelectItem value="other">Autre (à préciser)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trainingFormat">Format de formation</Label>
                    <Select value={formData.trainingFormat} onValueChange={(value) => setFormData({ ...formData, trainingFormat: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intra">Intra-entreprise (Dans vos locaux)</SelectItem>
                        <SelectItem value="inter">Inter-entreprises (Sessions ouvertes)</SelectItem>
                        <SelectItem value="elearning">E-learning (100% en ligne)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participantsCount">Nombre de participants estimé</Label>
                    <Input
                      id="participantsCount"
                      type="number"
                      min="1"
                      value={formData.participantsCount}
                      onChange={(e) => setFormData({ ...formData, participantsCount: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Besoins spécifiques</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Décrivez vos objectifs pédagogiques, niveau des participants, budget estimé..."
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
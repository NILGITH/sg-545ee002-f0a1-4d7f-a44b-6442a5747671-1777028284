import { useState } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserCircle } from "lucide-react";

export default function CandidateLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Erreur de connexion",
          description: error.message === "Invalid login credentials"
            ? "Email ou mot de passe incorrect"
            : error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (data.user) {
        // Vérifier que ce n'est pas un admin
        const { data: adminCheck } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", data.user.id)
          .maybeSingle();

        if (adminCheck) {
          await supabase.auth.signOut();
          toast({
            title: "Accès refusé",
            description: "Veuillez utiliser l'espace administrateur",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace candidat",
        });
        router.push("/candidate/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔐 Inscription candidat...");
      console.log("📧 Email:", signupData.email);

      // Créer le compte auth (le trigger créera automatiquement le profil)
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
          },
        },
      });

      console.log("✅ Réponse inscription:", { data, error });

      if (error) {
        console.error("❌ Erreur inscription:", error);
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("✅ Utilisateur créé:", data.user.id);
        
        toast({
          title: "Inscription réussie !",
          description: "Bienvenue ! Vous êtes maintenant connecté.",
        });
        
        // Attendre 1 seconde pour que le trigger crée le profil
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        router.push("/candidate/dashboard");
      }
    } catch (err) {
      console.error("💥 Erreur inattendue:", err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite. Vérifiez la console.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Espace Candidat - HR Talents Partners"
        description="Connectez-vous à votre espace candidat"
      />
      
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center py-12 bg-muted/30">
        <div className="container max-w-md">
          <Card className="border-2">
            <CardHeader className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <UserCircle className="text-accent" size={32} />
              </div>
              <CardTitle className="text-3xl font-serif">Espace Candidat</CardTitle>
              <CardDescription>
                Gérez vos candidatures et votre CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        required
                        placeholder="votre.email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <Input
                        id="login-password"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={18} />
                          Connexion...
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="signup-name">Nom complet</Label>
                      <Input
                        id="signup-name"
                        required
                        placeholder="Votre nom complet"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        required
                        placeholder="votre.email@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-phone">Téléphone</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        required
                        placeholder="••••••••"
                        minLength={6}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum 6 caractères
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={18} />
                          Inscription...
                        </>
                      ) : (
                        "S'inscrire"
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      ⚠️ Ouvrez la console (F12) pour voir les logs d'inscription
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
import { useState } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("🔐 Tentative de connexion admin...");

    try {
      // 1. Tenter la connexion
      console.log("📧 Email:", formData.email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log("✅ Réponse auth:", { data, error: signInError });

      if (signInError) {
        console.error("❌ Erreur de connexion:", signInError);
        toast({
          title: "Erreur de connexion",
          description: signInError.message === "Invalid login credentials" 
            ? "Email ou mot de passe incorrect" 
            : signInError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!data.user) {
        console.error("❌ Pas d'utilisateur retourné");
        toast({
          title: "Erreur de connexion",
          description: "Impossible de récupérer les informations utilisateur",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log("👤 Utilisateur authentifié:", data.user.id);

      // 2. Vérifier que l'utilisateur est dans admin_users
      console.log("🔍 Vérification du rôle admin...");
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("role, is_active")
        .eq("id", data.user.id)
        .maybeSingle();

      console.log("✅ Résultat vérification admin:", { adminUser, adminError });

      if (adminError) {
        console.error("❌ Erreur vérification admin:", adminError);
        await supabase.auth.signOut();
        toast({
          title: "Erreur",
          description: `Erreur lors de la vérification: ${adminError.message}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!adminUser) {
        console.error("❌ Utilisateur non trouvé dans admin_users");
        await supabase.auth.signOut();
        toast({
          title: "Accès refusé",
          description: "Ce compte n'a pas les permissions administrateur",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // 3. Vérifier que le compte est actif
      if (!adminUser.is_active) {
        console.error("❌ Compte admin inactif");
        await supabase.auth.signOut();
        toast({
          title: "Compte désactivé",
          description: "Votre compte administrateur a été désactivé",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // 4. Connexion réussie
      console.log("🎉 Connexion réussie ! Redirection vers dashboard...");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
      
      router.push("/admin/dashboard");
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
        title="Connexion Admin - HR Talents Partners"
        description="Accès à l'interface d'administration"
      />
      
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center py-12 bg-muted/30">
        <div className="container max-w-md">
          <Card className="border-2">
            <CardHeader className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="text-accent" size={32} />
              </div>
              <CardTitle className="text-3xl font-serif">Espace Administrateur</CardTitle>
              <CardDescription>
                Connectez-vous pour accéder au tableau de bord
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="admin@hrtalentspartners.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                <div className="text-xs text-center text-muted-foreground mt-4 space-y-2 p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground">Compte de test:</p>
                  <p className="font-mono">admin@hrtalentspartners.com</p>
                  <p className="font-mono">Admin123!</p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    ⚠️ Ouvrez la console (F12) pour voir les logs de connexion
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
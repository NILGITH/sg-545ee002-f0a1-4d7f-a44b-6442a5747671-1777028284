---
title: Configuration base de données et authentification
status: todo
priority: urgent
type: feature
tags: [backend, database, auth]
created_by: agent
created_at: 2026-04-23T10:56:24Z
position: 1
---

## Notes
Créer le schéma complet de la base de données Supabase pour gérer :
- Authentification admin
- Offres d'emploi (jobs)
- Candidatures (applications)
- Entreprises (companies)
- Candidats (candidates)
- Actualités/blog (news)

RLS policies appropriées : admin authentifié pour write, public pour read sur jobs/news.

## Checklist
- [ ] Créer table profiles (auto-create trigger)
- [ ] Créer table jobs avec champs complets (titre, description, type, localisation, salaire, etc.)
- [ ] Créer table applications pour candidatures
- [ ] Créer table companies pour entreprises clientes
- [ ] Créer table candidates pour profils candidats
- [ ] Créer table news pour blog/actualités
- [ ] Configurer RLS policies (T2: public read, auth write pour admin)
- [ ] Générer types TypeScript

## Acceptance
- Tables créées et accessibles dans Database Console
- Policies RLS configurées correctement
- Types générés sans erreurs
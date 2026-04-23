---
title: Interface administrateur complète
status: todo
priority: high
type: feature
tags: [admin, auth]
created_by: agent
created_at: 2026-04-23T10:56:24Z
position: 5
---

## Notes
Espace admin sécurisé pour gérer les offres d'emploi, consulter les candidatures, gérer le contenu. Authentification requise.

## Checklist
- [ ] Page /admin/login avec authentification Supabase
- [ ] Dashboard admin avec statistiques (offres actives, candidatures, etc.)
- [ ] Page /admin/jobs pour liste et gestion offres (CRUD complet)
- [ ] Formulaire création/édition offre d'emploi
- [ ] Page /admin/applications pour consulter candidatures par offre
- [ ] Filtres et tri des candidatures par statut
- [ ] Téléchargement des CVs candidats
- [ ] Protection des routes admin (redirection si non authentifié)

## Acceptance
- Login admin fonctionnel
- CRUD complet des offres opérationnel
- Consultation et gestion des candidatures possible
- Routes protégées correctement
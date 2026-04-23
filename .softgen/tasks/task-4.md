---
title: Page catalogue offres d'emploi
status: todo
priority: high
type: feature
tags: [frontend, jobs]
created_by: agent
created_at: 2026-04-23T10:56:24Z
position: 4
---

## Notes
Page affichant toutes les offres d'emploi avec recherche par mots-clés, filtres (type contrat, localisation, secteur), pagination.

## Checklist
- [ ] Créer jobsService.ts pour récupérer offres depuis Supabase
- [ ] Page /jobs/index.tsx avec grille d'offres
- [ ] Barre de recherche et filtres fonctionnels
- [ ] JobCard affichant titre, entreprise, localisation, type contrat, salaire
- [ ] Page détail /jobs/[id].tsx avec description complète et formulaire candidature
- [ ] Formulaire de candidature avec upload CV

## Acceptance
- Liste des offres affichée et fonctionnelle
- Recherche et filtres opérationnels
- Page détail avec candidature possible
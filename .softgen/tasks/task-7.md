---
title: Uniformiser formulaires publication offres
status: done
priority: high
type: bug
tags: [admin, forms]
created_by: agent
created_at: 2026-04-27
position: 7
---

## Notes
Le formulaire admin de création d'offres doit être identique au formulaire public /submit-job.
Actuellement il y a une erreur RLS et le formulaire est différent.

## Checklist
- [x] Analyser le formulaire /submit-job (modèle de référence)
- [x] Mettre à jour /admin/jobs/new.tsx pour utiliser le même formulaire
- [x] Vérifier que la soumission fonctionne dans l'admin
- [x] Tester la création d'offres depuis l'admin

## Acceptance
- Le formulaire admin a exactement les mêmes champs que /submit-job
- Les offres créées depuis l'admin s'enregistrent correctement
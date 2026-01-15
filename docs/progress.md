# Teachers Pagina Implementatie - Voortgang

## Overzicht
Implementatie van een functionele teachers pagina volgens de demo video specificaties.

## Taken

### a) Menu item toevoegen
- [x] "Teachers" menu item toevoegen aan header tussen Home en Login
- [x] Link naar "/teachers" pagina

### b) Backend - Database Schema
- [x] Prisma schema updaten: Teacher-User relatie toevoegen
- [ ] Migration uitvoeren (moet handmatig gedaan worden met `npx prisma migrate dev`)
- [x] Seed script updaten om teachers aan te maken

### c) Backend - Repository Layer
- [x] `getAllTeachers()` implementeren in `teacher.db.ts`
- [x] `updateLearningPath()` implementeren in `teacher.db.ts`
- [x] Teacher.from() static method implementeren in `teacher.ts`

### d) Backend - API Routes
- [x] GET `/teachers` route implementeren
- [x] PUT `/teachers/:teacherId/learningpath` route implementeren

### e) Frontend - Services
- [x] `TeacherService.getAllTeachers()` implementeren
- [x] `TeacherService.updateLearningPath()` implementeren

### f) Frontend - Components
- [x] `TeacherOverview` component implementeren (tabel met teachers)
- [x] `LearningPath` component implementeren (dropdown voor admin)
- [x] Teachers pagina implementeren (data ophalen en renderen)

### g) Frontend - Header
- [x] Teachers link toevoegen aan header

### h) Testing
- [ ] Testen als anonieme gebruiker
- [ ] Testen als ingelogde gebruiker (niet-admin)
- [ ] Testen als admin gebruiker (dropdown functionaliteit)

## Notities
- Learning paths: Infrastructure, Software development, Cybersecurity
- Alleen admin kan learning path wijzigen via dropdown
- Andere gebruikers zien learning path als platte tekst

## Volgende stappen
1. Database migration uitvoeren: `cd back-end && npx prisma migrate dev`
2. Seed script uitvoeren: `cd back-end && npx ts-node util/seed.ts`
3. Backend en frontend starten en testen


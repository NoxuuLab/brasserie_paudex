# Brasserie de Paudex - Website

Site web one-page pour la Brasserie de Paudex, restaurant français au bord du lac Léman à Paudex/Lutry, Suisse.

## Structure du projet

```
website/
├── index.html          # Page principale
├── css/
│   ├── reset.css       # Normalisation CSS
│   ├── variables.css   # Variables CSS (couleurs, typographie, espacements)
│   └── main.css        # Styles principaux
├── js/
│   └── main.js         # JavaScript (menu mobile, scroll, formulaire)
├── images/             # Dossier pour les images (à ajouter)
└── README.md           # Ce fichier
```

## Démarrage rapide

### Prévisualisation locale

1. **Avec VS Code Live Server:**
   - Installer l'extension "Live Server"
   - Clic droit sur `index.html` → "Open with Live Server"

2. **Avec Python:**
   ```bash
   cd website
   python -m http.server 8000
   ```
   Ouvrir http://localhost:8000

3. **Avec Node.js (npx):**
   ```bash
   npx serve website
   ```

## Déploiement

### Option 1: Netlify (Recommandé)

1. Aller sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier `website/`
3. Le site est en ligne sur `votre-site.netlify.app`
4. Ajouter un domaine personnalisé dans les paramètres

### Option 2: Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Importer depuis GitHub ou glisser-déposer
3. Déployer

### Option 3: GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [url-de-votre-repo]
git push -u origin main
```

Activer GitHub Pages dans les paramètres du repo → Branch: main

## Personnalisation

### Remplacer le contenu placeholder

1. **Numéros de téléphone:**
   - Rechercher `+41 XX XXX XX XX` et remplacer par le vrai numéro
   - Rechercher `+41XXXXXXXXX` dans les liens `tel:` et le schema.org

2. **Adresse:**
   - Remplacer `Route de la Corniche XX` par l'adresse exacte
   - Mettre à jour le code postal si nécessaire

3. **Email:**
   - Vérifier `bonjour@brasseriedepaudex.ch`

4. **Producteurs et vignerons:**
   - Remplacer `[Nom]`, `[Producteur]`, `[Lieu]` par les vrais noms

### Ajouter des images

1. Placer les images dans le dossier `images/`
2. Remplacer les placeholders dans le HTML:

```html
<!-- Avant -->
<div class="intro-image">Photo du restaurant</div>

<!-- Après -->
<img
  src="images/restaurant-interieur.jpg"
  alt="Intérieur de la Brasserie de Paudex"
  class="intro-image"
  loading="lazy"
>
```

### Formats d'images recommandés

- **Photos:** JPG, qualité 85%, max 2400px de large
- **Logo:** SVG ou PNG avec transparence
- **Taille max:** Optimiser à < 500KB par image
- **Outil:** [TinyPNG](https://tinypng.com) pour compression

### Ajouter les PDFs des menus

1. Placer les fichiers dans un dossier `menus/` ou `documents/`
2. Mettre à jour les liens:

```html
<a href="menus/carte-midi.pdf" class="menu-download" download>
  Télécharger (PDF) ↓
</a>
```

### Intégrer Google Maps

Remplacer le placeholder dans la section "Nous Trouver":

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  width="100%"
  height="400"
  style="border:0; border-radius: 8px;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

### Configurer le formulaire newsletter

Le formulaire actuel simule une soumission. Pour le connecter à un service:

**Mailchimp:**
```html
<form action="https://xxx.list-manage.com/subscribe/post" method="POST">
  <input type="hidden" name="u" value="YOUR_U_VALUE">
  <input type="hidden" name="id" value="YOUR_LIST_ID">
  <input type="email" name="EMAIL" required>
  <button type="submit">S'abonner</button>
</form>
```

**Netlify Forms:**
```html
<form name="newsletter" method="POST" data-netlify="true">
  <input type="email" name="email" required>
  <button type="submit">S'abonner</button>
</form>
```

## Design System

### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Terracotta | `#B8645F` | Couleur principale, CTAs |
| Terracotta Light | `#D4948F` | Arrière-plans, hovers |
| Vert Sauge | `#9BA888` | Couleur secondaire |
| Crème | `#F7F3E9` | Arrière-plan général |
| Noir Doux | `#2C2C2C` | Texte, footer |
| Or | `#C9A961` | Accents, étoiles avis |

### Typographie

- **Titres:** Playfair Display (700)
- **Corps:** Inter (400, 500, 600)
- **Tailles:** H1: 48px, H2: 36px, H3: 24px, Body: 16px

### Breakpoints

- **Mobile:** < 768px
- **Tablette:** 768px - 991px
- **Desktop:** ≥ 992px

## SEO

### Checklist avant mise en ligne

- [ ] Remplacer tous les `XX` par les vraies valeurs
- [ ] Mettre à jour le schema.org avec les vraies coordonnées
- [ ] Ajouter l'image Open Graph (`og:image`)
- [ ] Vérifier les meta descriptions
- [ ] Tester avec [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Soumettre le sitemap à Google Search Console

### Schema.org

Le schema LocalBusiness/Restaurant est déjà inclus dans le `<head>`. Mettre à jour:
- Adresse complète
- Numéro de téléphone
- Coordonnées GPS (latitude/longitude)
- Horaires d'ouverture

## Performance

### Optimisations incluses

- CSS minifiable (sélecteurs efficaces)
- Lazy loading natif pour images
- Fonts Google avec `display=swap`
- Animations CSS (transform/opacity uniquement)
- JavaScript non-bloquant (en bas de page)

### Tests recommandés

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (dans Chrome DevTools)

## Support navigateurs

- Chrome (dernières 2 versions)
- Firefox (dernières 2 versions)
- Safari (dernières 2 versions)
- Edge (dernières 2 versions)
- Mobile Safari / Chrome

## Licence

© 2025 Brasserie de Paudex - Tous droits réservés

---

Développé par [Visibilité](https://visibilite.ch)

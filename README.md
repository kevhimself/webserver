# Valley Sawmill Dashboard

Private business dashboard for Valley Sawmill Ltd (trading as Herriard Sawmills), Frome, Somerset.

## Deployment

1. **Build:** `npm install && npm run build`
2. **Deploy:** Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop)
3. **Set passphrase:** In Netlify site settings → Environment variables → add `VITE_PASS=valley2026`
4. **Update data:** Edit `public/valley-data.json` and redeploy (drag `dist/` again after rebuilding)
5. **Custom domain:** Netlify → Domain settings → add `dashboard.valleysawmills.co.uk`

## Updating the Dashboard

All content lives in **`public/valley-data.json`**. Open it in any text editor, update the numbers, save, rebuild (`npm run build`), and drag `dist/` to Netlify.

Fields to update regularly:
- `updated` — date shown at the bottom of Home and Reach tabs
- `week` — revenue this week, stock value, new customers
- `goals[].current` — progress toward each goal
- `reach` — subscriber counts, review counts, social followers
- `money` — cash, deployable capital, stock value, sales
- `tasks[].done` — tick off site readiness items (true/false)

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — passphrase is `valley2026`.

## Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- Recharts (available for future charts)
- Google Fonts: Playfair Display + DM Sans

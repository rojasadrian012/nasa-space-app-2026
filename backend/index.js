process.loadEnvFile();

import express from "express";
import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

app.get("/barrios", async (req, res) => {
  const {
    rows: [{ geojson }],
  } = await db.query(`
    SELECT
      jsonb_build_object(
        'type', 'FeatureCollection',
        'features', COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'type', 'Feature',
              'id', b.id,
              'geometry', ST_AsGeoJSON(
                ST_Transform(b.geom, 4326)
              )::jsonb,
              'properties', to_jsonb(b) - 'id' - 'geom'
            )
          ),
          '[]'::jsonb
        )
      ) AS geojson
    FROM barrios b
  `);
  
  res.json(geojson);
});

app.listen(3000, () => console.log("http://localhost:3000"));

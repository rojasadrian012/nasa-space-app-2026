# Backend

## 1. Levantar la base de datos

```bash
docker compose up -d
```

## 2. Instalar dependencias

```bash
pnpm add express pg
```

## 3. Iniciar en modo watch

```bash
node --watch index.js
```

## 4. Probar el endpoint

```http
http://localhost:3000/barrios
```

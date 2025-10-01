# STRATAGEM

# Vue-Projekt von GitHub lokal starten — super einfach (Windows & macOS)

> Dieses Dokument ist **für Anfänger**. Schritt für Schritt, ohne Fachchinesisch.  
> Du hast **zwei Wege**: mit **Git (clone)** oder per **ZIP-Download**.

---

## 0) Voraussetzungen

1. **Node.js LTS** (empfohlen 20.x) installieren:  
   - [Node.js Download](https://nodejs.org)  
   - Prüfen:
     ```bash
     node -v
     npm -v
     ```
     Wenn beide Befehle eine Zahl zeigen, passt’s.

2. **Git** (nur für die `git clone`-Methode):  
   - Prüfen:
     ```bash
     git --version
     ```

> Wenn Git fehlt, nimm einfach **Methode B (ZIP)**.

---

## 1) Methode A: Repository mit Git klonen

### Windows (PowerShell oder Eingabeaufforderung)

```powershell
# 1) In den Ordner wechseln, wo du das Projekt haben willst
cd C:\Users\<DeinName>\Documents

# 2) Repo klonen (URL aus GitHub kopieren)
git clone <REPO-URL>

# 3) In den Projektordner wechseln
cd <Projektordner>

# 4) Pakete installieren
npm install

# 5) Entwicklungsserver starten
npm run dev
```

Die Konsole zeigt dir eine **lokale URL** (z. B. http://localhost:5173).  
Diese im Browser öffnen → du siehst die App.

---

### macOS (Terminal)

```bash
# 1) In den Zielordner
cd ~/Documents

# 2) Repo klonen
git clone <REPO-URL>

# 3) In den Projektordner
cd <Projektordner>

# 4) Pakete installieren
npm install

# 5) Entwicklungsserver starten
npm run dev
```

Auch hier: URL aus dem Terminal im Browser öffnen.

---

## 2) Methode B: ZIP von GitHub laden (ohne Git)

### Windows

1. Auf GitHub → **Code** → **Download ZIP**  
2. ZIP **entpacken** (Rechtsklick → „Alle extrahieren…“)  
3. **PowerShell** öffnen und in den entpackten Ordner wechseln:
   ```powershell
   cd C:\Users\<DeinName>\Downloads\<EntpackterOrdner>
   ```
4. Pakete installieren:
   ```powershell
   npm install
   ```
5. Entwicklungsserver starten:
   ```powershell
   npm run dev
   ```
6. **Link aus der Konsole** im Browser öffnen (z. B. http://localhost:5173).

---

### macOS

1. Auf GitHub → **Code** → **Download ZIP**  
2. ZIP **entpacken** (Doppelklick)  
3. **Terminal** öffnen und in den Ordner wechseln:
   ```bash
   cd ~/Downloads/<EntpackterOrdner>
   ```
4. Pakete installieren:
   ```bash
   npm install
   ```
5. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```
6. **Link aus dem Terminal** im Browser öffnen.

---

## 3) Häufige Probleme

- **„npm“ nicht gefunden:** Node.js ist nicht installiert → zuerst Node installieren.  
- **Seite bleibt leer / Fehler:** Schau, ob es eine `.env.example` gibt:
  ```bash
  # Windows
  copy .env.example .env

  # macOS
  cp .env.example .env
  ```
  Danach `.env` bearbeiten und erneut starten:
  ```bash
  npm run dev
  ```
- **Port belegt (5173):**
  ```bash
  npm run dev -- --port 5174
  ```
- **Installation hängt:**
  ```bash
  # Windows
  rmdir /s /q node_modules

  # macOS
  rm -rf node_modules

  npm install
  npm run dev
  ```

---

## 4) Kurzfassung (Checkliste)

1. Node installieren → `node -v` & `npm -v` prüfen  
2. **Git clone** oder **ZIP entpacken**  
3. In Projektordner wechseln  
4. `npm install`  
5. `npm run dev`  
6. Link im Browser öffnen ✅

---

## 5) Extra-Wissen (optional)

- Moderne Vue-Projekte:  
  ```bash
  npm run dev
  ```
  Standard-Port: **5173**

- Ältere Vue-CLI-Projekte:  
  ```bash
  npm run serve
  ```
  Standard-Port: **8080**

- Alternativen zu `npm`:  
  ```bash
  # Mit yarn
  yarn install
  yarn dev

  # Mit pnpm
  pnpm install
  pnpm dev
  ```


---

## Einführung
Die 2025 Version von Stratagen ist eine Uberarbeitung des originalen Spiels entwickelt von Dennis Meadows.

## Neue vollständige Funktionen
- Homepage mit neuen Funktionen:
    * Neues Spiel erstellen
    * vorhandenes Spiel laden (localstorage)
    * vorhandenes Spiel löschen
- Header mit Navigation
- Footer mit Navigation
- About Seite mit Infos
- Impressum Seite (Legal notice)
- "Create Teams" Seite (aufgerufen bei Erstellung eines neuen Spiels)
    * Spielnamen erstellen
    * Anzahl der spielenden Teams festlegen
    * Teams erstellen mit Namen und Kürzel
    * Fehlermeldungen bei ungültigen Eingaben (z.B. doppelter Teamname/Kürzel)
- "Report" Seite (Statistiken anzeigen)
    * Filtern (nach Runde, Team, Ministerien) mit Highlight auf ausgewählten Filtern
    * Filter zurücksetzen
    * Anzeige der aktuellen Statistiken/Metriken aller Ministerien
    * Infotext zur Beschreibung jeder Statistik/Metrik beim Hovern mit der Maus über jene
    * Button zum springen an das Ende der Seite (Maus-Scrollen erspart)
    * Button zum fortsetzen (Eintrag der einzelnen Entscheidungen der Teams folgt nun)
- "Enter Decisions" Seite
    * Alle Entscheidungen des Originalspiels sind hier auch zum ausfüllen verfügbar
    * Jedes Eingabefeld hat einen Default Wert falls nichts eingegeben wird
    * Fehlermeldungen bei Ungültigen eingaben
- Vollständig Überarbeitete UI
    * barrierefrei (Kontrast, Tabulator)
    * Farben (blau, rot)
    * Buttons sind gehighlighted wenn auf der entsprechenden Seite (z.B. wenn auf Home, wird der Home Button in der Navigation gehighlighted)
    * grafische Unterteilung in die verschiedenen Ministerien
- Entwicklung eines neuen, modernen Logos

## Was noch fehlt
- Berechnungen
    * in der aktuellen Version werden die Ergebnisse pro Runde falsch berechnet (z.B. manche Felder zeigen bei Report immer z.B. 0 oder 200, egal was eingegeben wird)
    * Die Formeln müssen aus dem alten Code vollständig extrahiert werden und in aktuellen Code umgewandelt werden
    * Die Speicherung der Ergebnisse aus jeder Runde muss optimiert werden, da manchmal mit alten oder falschen Daten weitergerechnet wird
- Komplettes Refactoring des Codes
    * Es gibt teilweise Codezeilen die in mehreren Files auftreten aber nicht gebraucht werden oder in anderen Files als in jenen, die sie benötigen, stehen und somit nur umständlich zugänglich sind

## Organisation des Codes
Das gesamte Programm ist mit vue codiert. Es gibt folgende Ordner in unserer Projektstruktur:
- Assets (Logo)
- Components (alle Hauptseiten + kleine Komponenten, .vue Dateien)
- Router (für Navigationsrouten, werden für das Programm benötigt)

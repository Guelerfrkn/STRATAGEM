# STRATAGEM

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

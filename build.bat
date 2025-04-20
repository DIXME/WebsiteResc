@echo off
cls
echo Building...
:: build command (build all typescript files)
tsc lib.ts database.ts sessions.ts --outDir js
echo Done!
pause
cls
@echo off
chcp 65001 >nul
title CS2 Case Simulator - Сборка Android APK
echo ========================================================
echo   СБОРКА ANDROID APK ФАЙЛА (CS2 CASE SIMULATOR)
echo ========================================================
echo.
echo Шаг 1. Войдите в бесплатный аккаунт Expo (если еще не вошли):
echo (Если нет аккаунта — зарегистрируйтесь за 30 секунд на https://expo.dev/signup)
echo.
cd /d "%~dp0"
call npx eas-cli login
if errorlevel 1 exit /b 1
echo.
echo Шаг 2. Запускаем облачную сборку готового .APK файла...
call npx eas-cli build -p android --profile preview
if errorlevel 1 exit /b 1
echo.
echo ========================================================
echo Готово! Скачайте собранный .APK файл по ссылке выше!
echo ========================================================
pause

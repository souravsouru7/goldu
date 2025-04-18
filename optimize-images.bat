@echo off
setlocal enabledelayedexpansion

REM Create optimized directory if it doesn't exist
if not exist "public\optimized" mkdir "public\optimized"

REM Process all images in the public directory
for /r "public" %%f in (*.jpg *.jpeg *.png) do (
    set "filename=%%~nf"
    set "ext=%%~xf"
    set "output=public\optimized\!filename!.webp"
    
    echo Optimizing: %%f
    magick "%%f" -quality 80 "!output!"
)

echo Optimization complete!
pause 
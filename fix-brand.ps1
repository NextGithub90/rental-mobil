$folder = "c:\Users\Lenovo\Desktop\rental-mobil"
$files = Get-ChildItem -Path $folder -Filter "*.html"
foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $content = $content -replace "GoCar Rental", "Raven Transindo"
    $content = $content -replace "GoCar", "Raven Transindo"
    Set-Content -Path $f.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($f.Name)"
}
Write-Host "Done!"

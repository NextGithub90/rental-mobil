$folder = "c:\Users\Lenovo\Desktop\rental-mobil"

# Ganti icon bi-car-front-fill di navbar-brand dengan logo img
$navbarOld = '<i class="bi bi-car-front-fill"></i> Raven Transindo</a>'
$navbarNew = '<img src="img/logo.png" alt="Raven Transindo" style="height:42px;width:auto;object-fit:contain;"> </a>'

# Ganti icon bi-car-front-fill di footer h5 dengan logo img
$footerOld = '<i class="bi bi-car-front-fill" style="color:var(--primary)"></i> Raven Transindo</h5>'
$footerNew = '<img src="img/logo.png" alt="Raven Transindo" style="height:38px;width:auto;object-fit:contain;margin-bottom:4px;"> </h5>'

$files = Get-ChildItem -Path $folder -Filter "*.html"
foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $content = $content.Replace($navbarOld, $navbarNew)
    $content = $content.Replace($footerOld, $footerNew)
    Set-Content -Path $f.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($f.Name)"
}
Write-Host "Done!"

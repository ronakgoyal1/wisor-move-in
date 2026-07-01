Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\wisor-move-in\public\umbrella_compact_black.jpg')
Write-Host "Width: $($img.Width) Height: $($img.Height)"
$img.Dispose()

Add-Type -AssemblyName System.Drawing
$imgPath = 'c:\wisor-move-in\public\umbrella_compact_black.jpg'
$img = [System.Drawing.Image]::FromFile($imgPath)

# We want a square image, size = max(width, height)
$maxDim = [Math]::Max($img.Width, $img.Height)

$bmp = New-Object System.Drawing.Bitmap($maxDim, $maxDim)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)

# Center the original image
$x = ($maxDim - $img.Width) / 2
$y = ($maxDim - $img.Height) / 2

$g.DrawImage($img, $x, $y, $img.Width, $img.Height)
$g.Dispose()
$img.Dispose()

# Save over the old file
$bmp.Save($imgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Host "Image optimized to square: ${maxDim}x${maxDim}"

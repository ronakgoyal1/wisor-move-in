import sys
from PIL import Image

def process_glownix(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    min_x, min_y = img.width, img.height
    max_x, max_y = 0, 0
    
    x = 0
    y = 0
    
    for item in data:
        r, g, b, a = item
        # Glownix is red text on yellow background.
        # Yellow is high R, high G, low B.
        # Red is high R, low G, low B.
        # Let's measure 'yellowness' = min(R, G) - B.
        # If it's highly yellow, it's background -> transparent
        
        yellowness = min(r, g) - b
        
        is_bg = yellowness > 50 and r > 150 and g > 150
        
        if is_bg:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            # Foreground. Make it pure white to match sleepwell.
            new_data.append((255, 255, 255, 255))
            
            # Update bounding box
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y
            
        x += 1
        if x >= img.width:
            x = 0
            y += 1
            
    img.putdata(new_data)
    
    # Add a small padding
    pad = 10
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(img.width - 1, max_x + pad)
    max_y = min(img.height - 1, max_y + pad)
    
    # Crop to bounding box
    img = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_glownix("c:/wisor-move-in/public/glownix_logo.jpg", "c:/wisor-move-in/public/glownix_cropped.png")

import sys
from PIL import Image

def process_uport(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    min_x, min_y = img.width, img.height
    max_x, max_y = 0, 0
    
    x = 0
    y = 0
    
    for item in data:
        r, g, b, a = item
        # Uport is black text on white background.
        # Let's extract darkness.
        gray = int(0.299*r + 0.587*g + 0.114*b)
        alpha = 255 - gray
        
        # We want it to be white on a dark background.
        new_data.append((255, 255, 255, alpha))
            
        if alpha > 20: # Visible pixel
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
    pad = 5
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(img.width - 1, max_x + pad)
    max_y = min(img.height - 1, max_y + pad)
    
    # Crop to bounding box
    img = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_uport("c:/wisor-move-in/public/uport_logo.jpg", "c:/wisor-move-in/public/uport_cropped.png")

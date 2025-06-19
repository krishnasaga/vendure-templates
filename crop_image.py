from PIL import Image, ImageChops
import sys

# Usage: python crop_image.py <image_path>

def autocrop_image(path):
    img = Image.open(path)
    # Convert to RGBA to handle transparency
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    # Create a mask of non-empty (non-transparent and non-white) pixels
    bg = Image.new('RGBA', img.size, (255, 255, 255, 0))
    diff = ImageChops.difference(img, bg)
    bbox = diff.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(path)
        print(f'Cropped and saved: {path}')
    else:
        print('No cropping needed.')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python crop_image.py <image_path>')
        sys.exit(1)
    autocrop_image(sys.argv[1])

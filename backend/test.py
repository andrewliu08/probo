from polygon_styler import polygon_style
from PIL import Image
from polygon_styler import polygon_style
from neural_style_transfer import run_style_transfer

best_img, _ = run_style_transfer(content_path='frog-1.jpg', style_path='artist_styles/rembrandt.jpeg', num_iterations=20)
best_img = Image.fromarray(best_img)
best_img.save('rem_frog.png', 'PNG')
# print(polygon_style('frog-2.png'))

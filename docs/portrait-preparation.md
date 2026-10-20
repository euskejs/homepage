# Portrait asset preparation

## Current portrait

Source: user-supplied `public/portrait-1.jpeg`, preserved unchanged.

Output: `public/portrait-1-transparent.png` (1131 × 1391), prepared with the built-in image-generation tool. Verified actual alpha transparency (alpha range 0–255). This is AI-assisted background removal, not a pixel-identical extraction. The homepage now uses this asset through `site.portrait`; its existing responsive display dimensions are retained.

Prompt:

> Use case: background-extraction. Edit target: portrait-1.jpeg, the supplied photo of Kejia in sunglasses and a black T-shirt. Remove only the entire outdoor background (sky, buildings, trees, grass, paths and other people). Preserve the exact main person's identity, facial features, expression, hair, sunglasses, skin, black T-shirt and its colored graphic, pose, arms and original lighting. Do not retouch, beautify, redraw clothing or invent missing body. Crop away excess empty background margins to frame the full existing visible person closely with a small transparent margin above the hair and beside the arms; retain the original bottom truncation. Output a photorealistic PNG cutout with actual alpha transparency, clean natural hair and clothing edges, no backdrop, no checkerboard.

## Previous portrait

Source: user-supplied `background.png`, upper portrait portion. The source has RGB pixels, including a baked-in checkerboard; it has no alpha channel.

Output: `public/kejia-portrait.png`, prepared with the built-in image-generation tool, with actual alpha transparency. This is an AI-assisted extraction, not a pixel-identical original portrait. The original input is unchanged. The skyline uses the unmodified lower portion of `public/background.png` through CSS clipping.

Prompt:

> Extract ONLY the man in the top portion as a transparent-background portrait PNG. Remove the baked-in gray/white checkerboard completely and exclude the entire Dallas skyline bottom portion. Preserve this exact person's identity, facial features, glasses, hair, navy suit, pale blue shirt, crossed arms, posture, and original photographic appearance. Do not beautify, redesign, or change expression. Frame tightly around the full existing visible person including hair and crossed arms; keep the existing bottom truncation, do not invent missing body. Output actual alpha transparency around the person with clean natural edges. No text, no checkerboard, no skyline.

# Portrait asset preparation

Source: user-supplied `background.png`, upper portrait portion. The source has RGB pixels, including a baked-in checkerboard; it has no alpha channel.

Output: `public/kejia-portrait.png`, prepared with the built-in image-generation tool, with actual alpha transparency. This is an AI-assisted extraction, not a pixel-identical original portrait. The original input is unchanged. The skyline uses the unmodified lower portion of `public/background.png` through CSS clipping.

Prompt:

> Extract ONLY the man in the top portion as a transparent-background portrait PNG. Remove the baked-in gray/white checkerboard completely and exclude the entire Dallas skyline bottom portion. Preserve this exact person's identity, facial features, glasses, hair, navy suit, pale blue shirt, crossed arms, posture, and original photographic appearance. Do not beautify, redesign, or change expression. Frame tightly around the full existing visible person including hair and crossed arms; keep the existing bottom truncation, do not invent missing body. Output actual alpha transparency around the person with clean natural edges. No text, no checkerboard, no skyline.

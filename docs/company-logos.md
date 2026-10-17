# Company logo sources

The homepage Career Journey identifies Kejia’s employment history using company logos at his request. Logos remain trademarks of their respective owners; their appearance does not imply sponsorship or endorsement. Assets are stored locally, with original artwork, colors, and aspect ratios preserved. No company permission or endorsement is claimed.

| Local asset | Source | Artwork |
| --- | --- | --- |
| `public/logos/ericsson.svg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ericsson_logo_(2).svg), attributed to Ericsson Company | Horizontal wordmark; Commons labels it PD-textlogo with trademark restrictions. |
| `public/logos/huawei.png` | [Huawei company facts](https://www.huawei.com/en/media-center/company-facts), site header | Huawei symbol and wordmark. |
| `public/logos/jio.png` | [Jio](https://www.jio.com), site logo metadata | Jio roundel. |
| `public/logos/verizon.svg` | [Verizon](https://www.verizon.com/about), navigation stylesheet | Original embedded SVG decoded from the white-background navigation logo. |

Direct asset URLs:

- Ericsson: https://upload.wikimedia.org/wikipedia/commons/f/f1/Ericsson_logo_%282%29.svg
- Huawei: https://www.huawei.com/-/media/hcomponent-header/1.0.1.20260908162100/component/img/huawei_logo.png
- Jio: https://jep-asset.akamaized.net/jio/svg-og/jio_logo.png
- Verizon stylesheet: https://www.verizon.com/etc/designs/vzwcom/gnav20/core.css (`a.gnav20-logoWhiteBg` data URI)

Logo paths and intrinsic dimensions are configured in `src/data/site.ts`. The homepage renders each logo inside its company heading with the company name as accessible image text. CSS limits the marks to 125px wide and 46px high without stretching. These identify employers, rather than depicting period-specific logo changes.

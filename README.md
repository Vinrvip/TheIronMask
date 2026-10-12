# The Iron Mask website

A standalone static website for FTC Team 38460. Source and deployable output live in `dist/`. Open it with any static web server. No build step or framework dependencies are required.

Brand assets and team facts come from the user-supplied brand kit and 2026–2027 sponsorship packet. Fonts are Barlow Condensed, Space Grotesk, and IBM Plex Mono, loaded from Google Fonts, with local fallbacks.

Features: sticky scroll-linked mask opening, chapter navigation, scroll progress, desktop stacked season panels, reveal transitions, mobile navigation, reduced-motion support, sponsorship packet download, and a sponsorship/mentoring inquiry builder with clipboard fallback.

Contact: the packet has no actual team email, so inquiries are prepared locally and visitors are directed to the foundation website. No form data is submitted or saved. Both source sponsorship ranges include $2,000; the site preserves them and provides an explanatory disclosure. The fundraising graphic describes planned costs, not money already raised.

## October website update
The marquee is now two equal viewport-filling groups for a seamless loop. The VEX chapter includes Byte Force 3358B and all three robot photos. The contact dialog offers ironmask@gmail.com, the packet, and the Wheelhouse Foundation website. The email link opens the visitor's email app; it does not automatically send messages.

## Adding future photos
In dist/index.html, find data-photo-slot="team-photo" or data-photo-slot="ftc-robot". Replace that figure's photo-placeholder div with an img element using a new image in dist/assets. Keep its figcaption and write meaningful alt text. The existing photo-slot styling handles sizing. The VEX gallery images also link to their full-size originals.

The footer includes the team email and section links. The emerald cursor responds to interactive elements and is disabled for touch, reduced motion, and the contact dialog.

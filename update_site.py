from pathlib import Path
root = Path(__file__).parent / 'dist'
p = root / 'index.html'
s = p.read_text(encoding='utf-8')
start = s.index('<div class="ticker"')
end = s.index('<section class="journey', start)
words = '<span>DESIGN</span><b>+</b><span>CODE</span><b>+</b><span>BUILD</span><b>+</b><span>TEST</span><b>+</b><span>REPEAT</span><b>+</b>'
group = '<div class="ticker-group">' + words * 2 + '</div>'
s = s[:start] + '<div class="ticker" aria-hidden="true"><div class="ticker-track">' + group * 2 + '</div></div>\n' + s[end:]
s = s.replace('<a href="#journey">Our story</a>', '<a href="#vex">Our VEX roots</a>')
anchor = '<section class="season section chapter"'
vex = '''<section class="vex section" id="vex" aria-labelledby="vex-title">
 <div class="section-top mono"><span>FROM THE ARCHIVE / VEX V5RC</span><span>OUR ROBOTICS JOURNEY BEGAN IN 2024</span></div>
 <div class="vex-intro"><div class="reveal"><p class="eyebrow">BEFORE THE MASK. THERE WAS BYTE FORCE.</p><h2 id="vex-title">OUR ROOTS<br>ARE IN <em>VEX.</em></h2><p class="vex-lead">The experience we bring to FTC was built one VEX challenge at a time.</p></div><figure class="vex-identity reveal"><img src="assets/vex-byte-force.png" alt="Byte Force, VEX team 3358B, our former team identity" width="552" height="479" loading="lazy"><figcaption class="mono">BYTE FORCE / 3358B · OUR VEX CHAPTER</figcaption></figure></div>
 <div class="vex-story reveal"><h3>THIS IS WHERE<br>WE LEARNED TO BUILD.</h3><div><p>Our journey began in VEX V5RC in 2024. As Byte Force, we designed, built, tested, and kept improving. We earned awards along the way—and learned the value of hard work, teamwork, and persistence.</p><p>These are the robots and mechanisms from that chapter. The experience behind them now comes with us to The Iron Mask: how to turn an idea into a mechanism, work through a difficult build, and learn from every test.</p></div></div>
 <div class="vex-gallery"><figure class="reveal"><a href="assets/vex-robot-angle.png" target="_blank" rel="noopener" aria-label="Open full VEX robot angled view"><img src="assets/vex-robot-angle.png" alt="Our VEX robot on the field, showing the front mechanism and metal chassis" width="330" height="449" loading="lazy"><span class="photo-expand" aria-hidden="true">↗</span></a><figcaption><span class="mono">01 / ON THE FIELD</span><p>From a design to a working machine.</p></figcaption></figure><figure class="reveal"><a href="assets/vex-robot-front.png" target="_blank" rel="noopener" aria-label="Open full VEX robot front view"><img src="assets/vex-robot-front.png" alt="Front view of our VEX robot with its tall intake and structural frame" width="276" height="333" loading="lazy"><span class="photo-expand" aria-hidden="true">↗</span></a><figcaption><span class="mono">02 / EVERY MECHANISM</span><p>A closer look at the build.</p></figcaption></figure><figure class="reveal"><a href="assets/vex-robot-side.png" target="_blank" rel="noopener" aria-label="Open full VEX robot side view"><img src="assets/vex-robot-side.png" alt="Side view of our VEX robot showing gears, wheels, and the angled mechanism" width="290" height="395" loading="lazy"><span class="photo-expand" aria-hidden="true">↗</span></a><figcaption><span class="mono">03 / BEHIND THE BUILD</span><p>The details that make it move.</p></figcaption></figure></div>
 <div class="vex-bridge reveal"><span class="mono">BYTE FORCE · VEX 3358B</span><span class="bridge-line" aria-hidden="true">→</span><span class="mono">THE IRON MASK · FTC 38460</span><p>A new competition. A foundation we carry forward.</p></div>
</section>
'''
s = s.replace(anchor, vex + anchor)
anchor = '<section class="funding section chapter"'
slots = '''<section class="photo-journal section" aria-labelledby="journal-title"><div class="section-top mono"><span>THE NEXT CHAPTER / IN PICTURES</span><span>MORE TO COME</span></div><div class="reveal"><p class="eyebrow">FOLLOW THE BUILD</p><h2 id="journal-title">MAKING<br><em>NEW MEMORIES.</em></h2></div><div class="photo-slots"><figure class="photo-slot" data-photo-slot="team-photo"><div class="photo-placeholder"><span class="photo-cross" aria-hidden="true">+</span><span class="mono">TEAM PHOTO</span><p>Meet the people behind the mask.</p><small>Photo coming soon</small></div><figcaption>The Iron Mask / Our team</figcaption></figure><figure class="photo-slot" data-photo-slot="ftc-robot"><div class="photo-placeholder"><span class="photo-cross" aria-hidden="true">+</span><span class="mono">OUR FTC ROBOT</span><p>The next build takes shape.</p><small>Photo coming soon</small></div><figcaption>2026–2027 / From the workshop</figcaption></figure></div></section>
'''
s = s.replace(anchor, slots + anchor)
start = s.index('<dialog id="inquiry-dialog"')
end = s.index('</dialog>',start) + len('</dialog>')
s = s[:start] + '''<dialog id="inquiry-dialog" aria-labelledby="inquiry-title"><button class="dialog-close" aria-label="Close inquiry">×</button><p class="eyebrow">LET'S BUILD TOGETHER</p><h2 id="inquiry-title">START A<br><em>CONVERSATION.</em></h2><p>For inquiries and sponsorship opportunities, email The Iron Mask directly, explore our sponsorship packet, or visit Wheelhouse Foundation DFW.</p><div class="contact-choices"><a id="inquiry-email" class="contact-choice" href="mailto:ironmask@gmail.com?subject=The%20Iron%20Mask%20-%20Sponsorship%20inquiry"><span class="mono">01 / EMAIL THE TEAM</span><strong>ironmask@gmail.com <span>↗</span></strong><p>Ask about sponsorships, mentoring, or other ways to help.</p></a><a class="contact-choice" href="assets/The-Iron-Mask-Sponsorship-Packet.docx" download><span class="mono">02 / EXPLORE THE OPPORTUNITIES</span><strong>Sponsorship packet <span>↓</span></strong><p>Read our story, season budget, and sponsor benefits. Download Word document.</p></a><a class="contact-choice" href="https://wheelhousefoundationdfw.com/" target="_blank" rel="noopener noreferrer"><span class="mono">03 / VISIT THE FOUNDATION</span><strong>Wheelhouse Foundation <span>↗</span></strong><p>Learn more about the community behind our team.</p></a></div></dialog>''' + s[end:]
s=s.replace('<a href="https://wheelhousefoundationdfw.com/" target="_blank" rel="noopener noreferrer">Visit the foundation ↗</a></div>', '<a href="mailto:ironmask@gmail.com">ironmask@gmail.com</a><a href="https://wheelhousefoundationdfw.com/" target="_blank" rel="noopener noreferrer">Visit the foundation ↗</a></div>')
p.write_text(s,encoding='utf-8')
p=root/'app.js'
s=p.read_text(encoding='utf-8')
start=s.index(" const form = document.querySelector('#inquiry-form');")
s=s[:start]+''' const email = document.querySelector('#inquiry-email');
 document.querySelectorAll('.inquiry-open').forEach(button => button.addEventListener('click', () => {
  const interest = button.dataset.tier || 'General inquiry';
  email.href = 'mailto:ironmask@gmail.com?subject=' + encodeURIComponent('The Iron Mask — ' + interest) + '&body=' + encodeURIComponent('Hello The Iron Mask,\\n\\nI would like to learn more about ' + interest.toLowerCase() + ' for FTC Team #38460.\\n\\n');
  dialog.showModal();
 }));
 document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', e => { const rect = dialog.getBoundingClientRect(); if(e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close(); });
})();
'''
p.write_text(s,encoding='utf-8')

    
    const card = document.getElementById('card');
    const flipBtn = document.getElementById('flipBtn');
    const labelLeft = document.getElementById('labelLeft');
    const labelRight = document.getElementById('labelRight');
    let isBack = false;

    flipBtn.addEventListener('click', () => {
      isBack = !isBack;
      card.classList.toggle('flipped', isBack);
      flipBtn.classList.toggle('flipped', isBack);
      labelLeft.classList.toggle('active', !isBack);
      labelRight.classList.toggle('active', isBack);
    });

    function showToast(msg){
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(showToast._id);
      showToast._id = setTimeout(()=>t.classList.remove('show'), 2400);
    }

    try {
      new QRious({
        element: document.createElement('canvas'),
      });
    } catch(e) {}
    const qrFrame = document.getElementById('qrFrame');
    const qrCanvas = document.createElement('canvas');
    qrFrame.appendChild(qrCanvas);
    new QRious({
      element: qrCanvas,
      value: window.location.href || "https://risencorps.com",
      size: 300,
      background: '#ffffff',
      foreground: '#0e1a30',
      level: 'H'
    });

    document.getElementById('downloadBtn').addEventListener('click', async () => {
      const face = isBack ? document.querySelector('.face.back') : document.querySelector('.face.front');
      showToast("Génération de l'image…");
      try{
        const canvas = await html2canvas(face, {backgroundColor:'#0c1526', scale:3});
        const link = document.createElement('a');
        link.download = `risencorps-carte-${isBack ? 'verso' : 'recto'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Image téléchargée ✓');
      }catch(err){
        showToast("Échec du téléchargement");
      }
    });

    document.getElementById('shareBtn').addEventListener('click', async () => {
      const shareData = {
        title: "Risen'Corps — Carte de visite",
        text: "Découvrez Risen'Corps, Future Tech and AI.",
        url: window.location.href
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch(e){}
      } else {
        try{
          await navigator.clipboard.writeText(shareData.url);
          showToast('Lien copié dans le presse-papiers ✓');
        }catch(e){
          showToast("Impossible de partager sur cet appareil");
        }
      }
    });
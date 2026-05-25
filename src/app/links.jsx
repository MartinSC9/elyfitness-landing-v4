import { useState } from 'react';
import { Mail, Instagram, Youtube, Globe, ExternalLink, Share2, X, Link2, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const PROFILE_IMG = 'https://ugc.production.linktr.ee/b52e043d-c516-4f1b-904a-a9ba3eb070af_perfil.jpeg?io=true&size=avatar-v3_0';
const SHARE_URL = 'https://elyfitness.es/links';

const LINKS = [
  {
    title: 'PROZIS - Código ELY dto 10% + REGALOS',
    url: 'https://www.prozis.com/1DTPL',
    img: 'https://ugc.production.linktr.ee/0d1d528a-2a11-4b91-95e5-3e178e7a7649_images.png?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: 'MI ASESORÍA 1:1 PREMIUM PLANES ULTRA',
    url: '/#plan-ultra',
    img: 'https://ugc.production.linktr.ee/59d57b90-ba0f-46fa-9af1-006d8c93c7c9_ultra.jpeg?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: 'PLAN ANUAL 59€ DIETA + ENTRENAMIENTO HÍBRIDO',
    url: 'https://www.bejao.fit/checkout?tribeId=381&typeProduct=DIT',
    img: 'https://ugc.production.linktr.ee/903680ef-3904-4ea5-b858-fee4b892abe8_app.jpeg?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: 'Mi Te Matcha Favorito - 26% dto CODIGO ELY',
    url: 'https://matchaflix.com/ELY',
    img: 'https://ugc.production.linktr.ee/2178ec7e-5b31-437e-8ee1-93657167526c_Logo-MATCHAFLIX-01-850862fe-7148-4483-9959-513d962f5cfb.png?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: "Mi ropa de Gym - WOMEN'S BEST Código ELY 10%",
    url: 'https://womens.best/ElyFitness',
    img: 'https://ugc.production.linktr.ee/d5ab4b83-c08b-4163-ba5b-73e644617264_Disen-o-sin-ti-tulo--5-.png?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: 'MI ARMARIO A LA VENTA!',
    url: 'https://www.micolet.com/armario/ely_fitness?utm_medium=wardrobe&utm_source=micolet&utm_campaign=ely_fitness',
    img: 'https://ugc.production.linktr.ee/83c528d7-14fc-435d-a7d5-9bfd6e5b865f_Disen-o-sin-ti-tulo--9-.png?io=true&size=thumbnail-stack_v1_0',
  },
  {
    title: '15% DTO. IATI - SEGURO VIAJES',
    url: 'https://www.iatiseguros.com/?discount=525597150068',
    img: 'https://ugc.production.linktr.ee/66bd4c74-c673-476c-b57a-b5ef322b2bd2_f490c830e913ec1828b8645cfa15425c.webp?io=true&size=thumbnail-stack_v1_0',
  },
];

const SHOP = [
  {
    title: 'ASESORIA PREMIUM 1a1 | PLANES ULTRA',
    url: '/#plan-ultra',
    img: 'https://ugc.production.linktr.ee/2ba9b9f8-dc0a-4172-8c26-b1119b7b1c5d_4cd4b0-ee76ab2a1046403ab63584360344375e-mv2.webp?io=true&size=thumbnail-grid-carousel-v1_1',
  },
  {
    title: 'PROZIS | CODIGO dto. ELY 10%',
    url: 'https://www.prozis.com/1DTPL',
    img: 'https://ugc.production.linktr.ee/529c5333-03a3-4bca-ab6d-bee8085f4d6e_prozis-link-share.png?io=true&size=thumbnail-grid-carousel-v1_1',
  },
  {
    title: "WOMEN'S BEST | CODIGO dto. ELY 10%",
    url: 'https://womens.best/ElyFitness',
    img: 'https://ugc.production.linktr.ee/c29cc784-4b8a-43f8-b05b-eb21c33531f4_logo-header-mobile-600x472.png?io=true&size=thumbnail-grid-carousel-v1_1',
  },
  {
    title: 'MATCHAFLIX CON ELY',
    url: 'https://matchaflix.com/ELY',
    img: 'https://ugc.production.linktr.ee/99743138-b004-4e89-9ef9-d64c489b1bd3_Logo-MATCHAFLIX-01-850862fe-7148-4483-9959-513d962f5cfb.png?io=true&size=thumbnail-grid-carousel-v1_1',
  },
];

const SOCIALS = [
  { icon: Mail, url: 'mailto:contacta@elyfitness.es', label: 'Email' },
  { icon: Instagram, url: 'https://www.instagram.com/ely_fitness/', label: 'Instagram' },
  { icon: Youtube, url: 'https://www.youtube.com/@ely_fitness', label: 'YouTube' },
  { icon: Globe, url: '/', label: 'Web' },
];

const SHARE_OPTIONS = [
  {
    label: 'WhatsApp',
    color: '#25D366',
    url: `https://wa.me/?text=${encodeURIComponent('Mira los links de @Ely_fitness ' + SHARE_URL)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    color: '#000000',
    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Mira los links de @Ely_fitness')}&url=${encodeURIComponent(SHARE_URL)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    color: '#1877F2',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    color: '#0A66C2',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.9453 8.68918V15.6727C15.9453 19.1598 13.1048 22.0004 9.6177 22.0004C8.27369 22.0004 7.01685 21.5717 5.99251 20.8525C4.35796 19.7047 3.29004 17.8085 3.29004 15.6727C3.29004 12.1783 6.12333 9.34505 9.6104 9.34505C9.90101 9.34505 10.1843 9.36685 10.4676 9.40318V12.9121H10.4386C10.3151 12.8758 10.1843 12.8394 10.0536 12.8177H9.9954C9.86466 12.8032 9.74114 12.7813 9.60309 12.7813C8.00491 12.7813 6.70448 14.0817 6.70448 15.6799C6.70448 17.2782 8.00491 18.5786 9.60309 18.5786C11.2014 18.5786 12.5018 17.2782 12.5018 15.6799V2.00037H15.938C15.938 2.29822 15.9671 2.58881 16.0179 2.87213C16.2649 4.1798 17.035 5.30584 18.1175 6.01053C18.873 6.50452 19.7593 6.78785 20.7182 6.78785V10.2241C18.9416 10.2241 17.288 9.65222 15.9453 8.68918Z" />
  </svg>
);

function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = SHARE_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 pb-8 sm:pb-6 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#2c2420]/5 transition-colors"
        >
          <X size={18} className="text-[#2c2420]/40" />
        </button>

        <p className="text-sm font-semibold text-[#2c2420] text-center mb-4">Compartir</p>

        {/* Preview card */}
        <div className="bg-gradient-to-br from-[#5c3d2e] to-[#3a2519] rounded-2xl p-5 flex flex-col items-center mb-5">
          <img
            src={PROFILE_IMG}
            alt="Ely Fitness"
            className="w-16 h-16 rounded-full object-cover border-2 border-white/30 mb-2"
          />
          <p className="text-white font-bold text-sm">@Ely_fitness</p>
          <p className="text-white/50 text-[11px]">elyfitness.es/links</p>
        </div>

        {/* Share buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Copy link */}
          <button onClick={copyLink} className="flex flex-col items-center gap-1.5">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              copied ? 'bg-green-500' : 'bg-[#2c2420]/10'
            }`}>
              {copied
                ? <Check size={18} className="text-white" />
                : <Link2 size={18} className="text-[#2c2420]" />
              }
            </div>
            <span className="text-[10px] text-[#2c2420]/60 font-medium">
              {copied ? 'Copiado!' : 'Copiar'}
            </span>
          </button>

          {/* Social share buttons */}
          {SHARE_OPTIONS.map(opt => (
            <a
              key={opt.label}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: opt.color }}
              >
                {opt.icon}
              </div>
              <span className="text-[10px] text-[#2c2420]/60 font-medium">{opt.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function Links() {
  const [tab, setTab] = useState('links');
  const [showShare, setShowShare] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '@Ely_fitness - Links',
          text: 'Mira los links de @Ely_fitness',
          url: SHARE_URL,
        });
        return;
      } catch { /* user cancelled or not supported, fall through to modal */ }
    }
    setShowShare(true);
  };

  return (
    <div className="min-h-screen relative bg-[#1a1714]">
      {/* Background - fullscreen image with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/links-bg.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2c2420]/65 backdrop-blur-sm md:bg-[#1a1714]/80 md:backdrop-blur-none" />
      </div>

      {/* Phone mockup wrapper */}
      <div className="relative z-10 min-h-screen flex items-start justify-center md:pt-4 md:pb-8">
        {/* Main card - phone shape on desktop */}
        <div className="w-full md:max-w-[520px] md:rounded-[2.5rem] md:shadow-2xl md:overflow-hidden md:border md:border-white/10 relative">
          {/* Card background */}
          <div className="absolute inset-0 hidden md:block">
            <img
              src="/links-bg.webp"
              alt=""
              className="w-full h-full object-cover object-bottom blur-[3px]"
            />
            <div className="absolute inset-0 bg-[#2c2420]/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 py-6">
            {/* Top buttons - inside the card */}
            <div className="w-full flex justify-between mb-1">
              <a
                href="/"
                className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
                aria-label="Ir a la landing"
              >
                <Globe size={16} className="text-white" />
              </a>
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
                aria-label="Compartir"
              >
                <Share2 size={16} className="text-white" />
              </button>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center mb-5">
              <img
                src={PROFILE_IMG}
                alt="Ely Fitness"
                className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md mb-3"
              />
              <h1 className="text-xl font-bold text-white drop-shadow-sm">@Ely_fitness</h1>
              <p className="text-sm text-white/70 text-center mt-1 max-w-[300px]">
                Buenas amig@s! Aquí tenéis los enlaces a mis planes y descuentos en suplementación y más!
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2 mt-4">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('/') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2 rounded-full text-white/70 hover:text-white transition-colors"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
                <a
                  href="https://www.tiktok.com/@ely_fitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2 rounded-full text-white/70 hover:text-white transition-colors"
                >
                  <TikTokIcon size={20} />
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="w-full mb-5">
              <div className="relative flex bg-white/20 backdrop-blur-md rounded-xl p-[3px] w-48 mx-auto">
                <div
                  className="absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] bg-white/90 rounded-[10px] shadow-sm transition-transform duration-200"
                  style={{ transform: tab === 'links' ? 'translateX(0)' : 'translateX(100%)' }}
                />
                <button
                  onClick={() => setTab('links')}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-[10px] transition-colors ${
                    tab === 'links' ? 'text-[#2c2420]' : 'text-white/70'
                  }`}
                >
                  Links
                </button>
                <button
                  onClick={() => setTab('shop')}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-[10px] transition-colors ${
                    tab === 'shop' ? 'text-[#2c2420]' : 'text-white/70'
                  }`}
                >
                  Shop
                </button>
              </div>
            </div>

            {/* Links tab */}
            {tab === 'links' && (
              <div className="w-full flex flex-col gap-2.5">
                {LINKS.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target={link.url.startsWith('/') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white/30 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-2 hover:bg-white/50 hover:shadow-md transition-all"
                  >
                    <img
                      src={link.img}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <span className="flex-1 text-[13px] font-medium text-white leading-tight drop-shadow-sm">
                      {link.title}
                    </span>
                    <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 mr-1" />
                  </a>
                ))}
              </div>
            )}

            {/* Shop tab */}
            {tab === 'shop' && (
              <div className="w-full grid grid-cols-2 gap-2.5">
                {SHOP.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target={item.url.startsWith('/') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden hover:bg-white/50 hover:shadow-md transition-all"
                  >
                    <div className="aspect-square overflow-hidden bg-white/10">
                      <img
                        src={item.img}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[12px] font-medium text-white leading-tight line-clamp-2 drop-shadow-sm">
                        {item.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* QR Code - mobile only */}
            <div className="mt-8 flex flex-col items-center gap-2 md:hidden">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-sm">
                <QRCodeSVG
                  value={SHARE_URL}
                  size={120}
                  bgColor="transparent"
                  fgColor="#2c2420"
                  level="M"
                />
              </div>
              <p className="text-[10px] text-white/50 font-medium">Escanea para ver mis links</p>
            </div>

            {/* Footer */}
            <div className="mt-4 mb-2">
              <a
                href="/"
                className="text-[10px] font-medium text-white/30 hover:text-white/60 transition-colors"
              >
                elyfitness.es
              </a>
            </div>
          </div>
        </div>

        {/* QR Code - desktop: floating bottom right */}
        <div className="hidden md:flex fixed bottom-6 right-6 z-20 flex-col items-center gap-2">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <QRCodeSVG
              value={SHARE_URL}
              size={100}
              bgColor="transparent"
              fgColor="#2c2420"
              level="M"
            />
          </div>
          <p className="text-[10px] text-white/40 font-medium">Escanea para ver mis links</p>
        </div>
      </div>

      {/* Share modal */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </div>
  );
}

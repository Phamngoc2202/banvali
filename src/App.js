import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import heroImage from './assets/anhNen.jpg';
import logoImage from './assets/logo.png';

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const navItems = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Sản phẩm', href: '#san-pham' },
  { label: 'Ưu điểm', href: '#uu-diem' },
  { label: 'Trải nghiệm', href: '#trai-nghiem' },
  { label: 'Đánh giá', href: '#danh-gia' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Liên hệ', href: '#lien-he' },
];

const heroBenefits = [
  {
    icon: 'feather',
    title: 'Siêu nhẹ',
    text: 'Dễ di chuyển và nâng kéo hằng ngày.',
  },
  {
    icon: 'shield',
    title: 'Chống va đập',
    text: 'Chất liệu cứng cáp, bảo vệ hành lý tốt.',
  },
  {
    icon: 'wheel',
    title: 'Bánh xe 360°',
    text: 'Xoay linh hoạt và vận hành êm ái.',
  },
  {
    icon: 'lock',
    title: 'Khóa bảo mật',
    text: 'An tâm hơn trên mọi chuyến đi.',
  },
];

const serviceHighlights = [
  {
    icon: 'truck',
    title: 'Miễn phí vận chuyển',
    text: 'Đơn hàng từ 1.000.000đ',
  },
  {
    icon: 'seal',
    title: 'Bảo hành chính hãng',
    text: 'Lên đến 5 năm',
  },
  {
    icon: 'refresh',
    title: 'Đổi trả dễ dàng',
    text: 'Trong vòng 7 ngày',
  },
  {
    icon: 'support',
    title: 'Hỗ trợ 24/7',
    text: 'Luôn sẵn sàng phục vụ',
  },
];

const whyFeatures = [
  {
    icon: 'feather',
    title: 'Thiết kế tối ưu trọng lượng',
    text: 'Khung vali chắc chắn nhưng vẫn nhẹ để bạn kéo, nâng và sắp xếp dễ dàng.',
  },
  {
    icon: 'shield',
    title: 'Độ bền premium',
    text: 'Lớp vỏ cao cấp giúp giữ phom đẹp và bảo vệ hành lý khi di chuyển liên tục.',
  },
  {
    icon: 'wheel',
    title: 'Lướt êm trên mọi địa hình',
    text: 'Cụm bánh xe xoay 360° đổi hướng nhanh ở sân bay, ga tàu hay khách sạn.',
  },
  {
    icon: 'lock',
    title: 'Bảo mật an tâm',
    text: 'Khóa số chắc chắn hỗ trợ bảo vệ vật dụng quan trọng trong những chuyến đi dài ngày.',
  },
];

const products = [
  {
    name: 'NOMA Black',
    tone: 'Đen nhám',
    price: '2.490.000đ',
    accent: 'midnight',
    placeholder: 'Ảnh vali đen',
  },
  {
    name: 'NOMA Sky Blue',
    tone: 'Xanh biển',
    price: '2.690.000đ',
    accent: 'sky',
    placeholder: 'Ảnh vali xanh',
  },
  {
    name: 'NOMA Rose',
    tone: 'Hồng pastel',
    price: '2.590.000đ',
    accent: 'rose',
    placeholder: 'Ảnh vali hồng',
  },
];

const productBenefits = [
  { icon: 'tsa', title: 'Khóa TSA đạt chuẩn quốc tế' },
  { icon: 'case', title: 'Ngăn chứa rộng rãi và khoa học' },
  { icon: 'spark', title: 'Bề mặt chống trầy xước' },
  { icon: 'handle', title: 'Tay kéo hợp kim chắc chắn' },
  { icon: 'wheel', title: 'Bánh xe xoay 360° êm ái' },
  { icon: 'seal', title: 'Bảo hành chính hãng dài hạn' },
];

const stats = [
  { value: 25000, suffix: '+', label: 'Sản phẩm đã bán' },
  { value: 98, suffix: '%', label: 'Khách hàng hài lòng' },
  { value: 4.9, suffix: '/5', label: 'Đánh giá tích cực', decimals: 1 },
];

const testimonials = [
  {
    name: 'Minh Anh',
    role: 'Frequent Flyer',
    review:
      'Vali kéo rất mượt, đựng đồ gọn và lên hình đẹp. Chuyến đi biển vừa rồi mình mang theo rất tiện.',
  },
  {
    name: 'Quốc Bảo',
    role: 'Business Traveler',
    review:
      'Khóa chắc chắn, tay kéo cứng cáp và phần bánh xe đi qua nền gạch hay sân bay đều rất êm.',
  },
  {
    name: 'Thanh Vy',
    role: 'Travel Blogger',
    review:
      'Màu sắc đẹp, thiết kế hiện đại và cảm giác cầm nắm tốt. Đây là mẫu vali mình dùng nhiều nhất mùa hè này.',
  },
];

const faqs = [
  {
    question: 'Vali NOMA phù hợp cho chuyến đi bao nhiêu ngày?',
    answer:
      'Tùy kích thước, NOMA có lựa chọn phù hợp từ chuyến đi ngắn 2 đến 3 ngày cho tới hành trình dài 7 ngày trở lên.',
  },
  {
    question: 'Sản phẩm có bảo hành chính hãng không?',
    answer:
      'Có. NOMA hỗ trợ bảo hành chính hãng dài hạn, áp dụng cho các lỗi kỹ thuật theo chính sách thương hiệu.',
  },
  {
    question: 'Bánh xe 360° có dễ thay thế hoặc bảo trì?',
    answer:
      'Cụm bánh xe được thiết kế bền bỉ để sử dụng thường xuyên và có hỗ trợ tư vấn bảo trì khi cần thiết.',
  },
  {
    question: 'Khóa TSA có an toàn cho các chuyến bay quốc tế?',
    answer:
      'Khóa TSA giúp tăng độ an tâm khi làm thủ tục tại các sân bay quốc tế và thuận tiện hơn trong quá trình kiểm tra hành lý.',
  },
  {
    question: 'NOMA có hỗ trợ đổi trả không?',
    answer:
      'Có. Bạn có thể đổi trả trong vòng 7 ngày theo điều kiện áp dụng và được đội ngũ hỗ trợ hướng dẫn chi tiết.',
  },
];

/* ═══════════════════════════════════════════════════════
   ICON COMPONENT
   ═══════════════════════════════════════════════════════ */
function Icon({ name }) {
  const icons = {
    plane: (
      <path d="M4 13.5 20 4l-3.3 16-3.2-4.6-4.5-3.2L4 13.5Z M9.2 12.1l4.1 3" />
    ),
    feather: (
      <path d="M18 5C11.5 5 7 9.4 7 15c0 1.8.5 3.5 1.4 5C10 16 13.6 13 19 11c0-3.8-1-6-1-6ZM5 19c2.8-2.6 6.2-4.6 10.1-5.9" />
    ),
    shield: (
      <path d="M12 3 5 6v5c0 4.5 2.7 7.8 7 10 4.3-2.2 7-5.5 7-10V6l-7-3Z" />
    ),
    wheel: (
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    ),
    lock: (
      <path d="M8 10V8a4 4 0 1 1 8 0v2M7 10h10v10H7V10Zm5 3v3" />
    ),
    truck: (
      <path d="M3 7h10v8H3V7Zm10 2h3l2 2v4h-5V9Zm-7 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm10 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    ),
    seal: (
      <path d="M12 3l2.3 2.2 3.2-.2.9 3.1 2.6 1.9-1.4 2.9 1.4 2.9-2.6 1.9-.9 3.1-3.2-.2L12 21l-2.3-2.2-3.2.2-.9-3.1-2.6-1.9L4.4 11 3 8.1l2.6-1.9.9-3.1 3.2.2L12 3Zm0 5.3-2.4 4.6 2.1 1.4L14.4 9 12 8.3Z" />
    ),
    refresh: (
      <path d="M20 11a8 8 0 1 1-2.3-5.7M20 4v6h-6" />
    ),
    support: (
      <path d="M5 13v-1a7 7 0 0 1 14 0v1M5 13v3a2 2 0 0 0 2 2h1v-5H7a2 2 0 0 0-2 2Zm14 0v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Zm-7 8h2" />
    ),
    tsa: (
      <path d="M6 7h12M12 7v10M8 17h8M9 4h6M7 10h10" />
    ),
    case: (
      <path d="M8 6V4h8v2M5 6h14a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Z" />
    ),
    spark: (
      <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Zm7 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
    ),
    handle: (
      <path d="M9 8V6a3 3 0 0 1 6 0v2M8 8h8v12H8V8Zm1 0h6" />
    ),
    star: (
      <path d="m12 4 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7L5.2 9l4.7-.7L12 4Z" />
    ),
    phone: (
      <path d="M7 4h3l1 4-2 2a14 14 0 0 0 5 5l2-2 4 1v3c0 1.1-.9 2-2 2A15 15 0 0 1 5 6c0-1.1.9-2 2-2Z" />
    ),
    mail: (
      <path d="M4 6h16v12H4V6Zm0 1 8 6 8-6" />
    ),
    pin: (
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
    time: (
      <path d="M12 5v7l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    ),
    camera: (
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    ),
    arrowUp: (
      <path d="M12 19V5m-7 7 7-7 7 7" />
    ),
  };

  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] || icons.star}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════════════════════ */

/** Detects when an element enters the viewport */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isVisible];
}

/** Animated counter hook */
function useCountUp(end, isVisible, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    let rAFId = null;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentValue = eased * end;

      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        rAFId = requestAnimationFrame(animate);
      }
    }

    rAFId = requestAnimationFrame(animate);
    return () => {
      if (rAFId) {
        cancelAnimationFrame(rAFId);
      }
    };
  }, [isVisible, end, duration, decimals]);

  return count;
}

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

/** Scroll progress bar at the top of the page */
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/** Reveal wrapper — adds scroll-triggered fade animation */
function Reveal({ children, className = '', direction = '', delay = 0 }) {
  const [ref, isVisible] = useInView();

  const dirClass = direction ? `reveal--${direction}` : '';

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Stat card with count-up animation */
function StatCard({ value, suffix, label, decimals = 0 }) {
  const [ref, isVisible] = useInView();
  const count = useCountUp(value, isVisible, 2000, decimals);

  return (
    <article ref={ref} className="stat-card">
      <strong>
        {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
        {suffix}
      </strong>
      <p>{label}</p>
    </article>
  );
}

/** Scroll-to-top button */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-top ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Lên đầu trang"
    >
      <Icon name="arrowUp" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Header shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-shell">
      <ScrollProgress />

      {/* ── HEADER ── */}
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#gioi-thieu" onClick={handleNavClick}>
          <img src={logoImage} alt="NOMA Luggage" />
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((c) => !c)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`site-header__panel ${menuOpen ? 'is-open' : ''}`}>
          <nav className="site-nav" aria-label="Điều hướng chính">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="button button--primary button--small site-header__cta"
            href="#lien-he"
            onClick={handleNavClick}
          >
            Mua ngay
          </a>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          className="hero"
          id="gioi-thieu"
          style={{ '--hero-image': `url(${heroImage})` }}
        >
          {/* Decorative circles */}
          <div className="hero__decor" aria-hidden="true">
            <div className="hero__decor-circle" />
            <div className="hero__decor-circle" />
            <div className="hero__decor-circle" />
          </div>

          <div className="hero__inner section-container">
            <div className="hero__content">
              <div className="hero__badge">
                <Icon name="plane" />
                <span>Đồng hành mọi hành trình</span>
              </div>

              <p className="eyebrow">Bộ sưu tập vali mùa hè</p>
              <h1>Vi Vu Mùa Hè</h1>
              <p className="hero__script">Trọn Vẹn Trải Nghiệm</p>
              <p className="hero__description">
                NOMA mang đến những chiếc vali bền bỉ, thời trang và tiện nghi,
                giúp mọi chuyến đi trở nên nhẹ nhàng và thoải mái hơn.
              </p>

              <div className="hero__benefits">
                {heroBenefits.map((benefit) => (
                  <article key={benefit.title} className="info-chip">
                    <span className="info-chip__icon">
                      <Icon name={benefit.icon} />
                    </span>
                    <div>
                      <strong>{benefit.title}</strong>
                      <p>{benefit.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hero__actions">
                <a className="button button--primary" href="#lien-he">
                  Mua ngay
                </a>
                <a className="button button--secondary" href="#san-pham">
                  Khám phá bộ sưu tập
                </a>
              </div>

              <div className="hero__trust">
                <div className="hero__avatars" aria-hidden="true">
                  <span>LA</span>
                  <span>QB</span>
                  <span>TV</span>
                  <span>NA</span>
                </div>
                <div className="hero__trust-copy">
                  <strong>10.000+ khách hàng tin chọn NOMA</strong>
                  <p>4.9/5 đánh giá trung bình và hơn 25.000 sản phẩm đã bán.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICE STRIP ── */}
        <section className="service-strip">
          <div className="section-container service-strip__grid stagger-children">
            {serviceHighlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="service-strip__item">
                  <span className="service-strip__icon">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── WHY NOMA ── */}
        <section className="section section--light" id="uu-diem">
          <div className="section-container">
            <Reveal>
              <div className="section-heading">
                <p className="eyebrow">Tại sao chọn NOMA</p>
                <hr className="section-divider" />
                <h2>Tại Sao NOMA Là Người Bạn Đồng Hành Lý Tưởng?</h2>
                <p>
                  Mọi chi tiết được tối ưu cho hành trình thực tế: nhẹ, bền, đẹp
                  và đủ an tâm để bạn tập trung tận hưởng chuyến đi.
                </p>
              </div>
            </Reveal>

            <div className="feature-grid stagger-children">
              {whyFeatures.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 100}>
                  <article className="feature-card">
                    <span className="feature-card__icon">
                      <Icon name={feature.icon} />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="section" id="san-pham">
          <div className="section-container">
            <Reveal>
              <div className="section-heading">
                <p className="eyebrow">Bộ sưu tập NOMA</p>
                <hr className="section-divider" />
                <h2>Thiết kế hiện đại cho nhiều phong cách dịch chuyển</h2>
                <p>
                  Từ gam màu tối thanh lịch đến tông pastel trẻ trung, NOMA giúp
                  bạn chọn đúng người bạn đồng hành cho từng hành trình.
                </p>
              </div>
            </Reveal>

            <div className="product-grid stagger-children">
              {products.map((product, i) => (
                <Reveal key={product.name} delay={i * 120}>
                  <article
                    className={`product-card product-card--${product.accent}`}
                  >
                    <div className="product-card__image">
                      <div className="placeholder">
                        <Icon name="camera" />
                        <span>{product.placeholder}</span>
                      </div>
                      <span>{product.tone}</span>
                    </div>
                    <div className="product-card__body">
                      <div>
                        <h3>{product.name}</h3>
                        <p>Kiểu dáng tối giản, phù hợp du lịch và công tác.</p>
                      </div>
                      <div className="product-card__footer">
                        <strong>{product.price}</strong>
                        <a href="#lien-he">Xem chi tiết</a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT BENEFITS ── */}
        <section className="section section--gradient">
          <div className="section-container">
            <Reveal>
              <div className="section-heading">
                <p className="eyebrow">Thiết kế cho mọi hành trình</p>
                <hr className="section-divider" />
                <h2>Những chi tiết nhỏ tạo nên trải nghiệm lớn</h2>
              </div>
            </Reveal>

            <div className="benefit-grid stagger-children">
              {productBenefits.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <article className="benefit-card">
                    <span className="benefit-card__icon">
                      <Icon name={item.icon} />
                    </span>
                    <h3>{item.title}</h3>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="section" id="trai-nghiem">
          <div className="section-container experience-layout">
            <Reveal direction="left">
              <div className="experience-copy">
                <p className="eyebrow">Mang cả mùa hè theo bạn</p>
                <h2>
                  Trọn vẹn từ chuyến đi biển đến lịch trình khám phá thành phố
                </h2>
                <p>
                  Từ những chuyến du lịch biển đến các hành trình khám phá thành
                  phố mới, NOMA luôn sẵn sàng đồng hành cùng bạn với thiết kế
                  tiện dụng và ngoại hình nổi bật.
                </p>

                <div className="stats-grid">
                  {stats.map((stat) => (
                    <StatCard
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      decimals={stat.decimals}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="experience-visual">
                <div className="placeholder">
                  <Icon name="camera" />
                  <span>Ảnh lifestyle du lịch</span>
                </div>
                <div className="experience-visual__panel">
                  <p>Ready for takeoff</p>
                  <strong>
                    Nhẹ gọn, sang và linh hoạt trong mọi khung hình.
                  </strong>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section section--light" id="danh-gia">
          <div className="section-container">
            <Reveal>
              <div className="section-heading">
                <p className="eyebrow">Khách hàng nói gì</p>
                <hr className="section-divider" />
                <h2>Đánh giá thực tế từ những người đã chọn NOMA</h2>
              </div>
            </Reveal>

            <div className="testimonial-grid stagger-children">
              {testimonials.map((item, i) => (
                <Reveal key={item.name} delay={i * 120}>
                  <article className="testimonial-card">
                    <div className="testimonial-card__stars" aria-label="5 sao">
                      <Icon name="star" />
                      <Icon name="star" />
                      <Icon name="star" />
                      <Icon name="star" />
                      <Icon name="star" />
                    </div>
                    <p>{item.review}</p>
                    <div className="testimonial-card__author">
                      <div className="testimonial-card__avatar">
                        <span>{item.name.slice(0, 1)}</span>
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.role}</small>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" id="faq">
          <div className="section-container faq-layout">
            <Reveal direction="left">
              <div className="section-heading section-heading--left">
                <p className="eyebrow">Câu hỏi thường gặp</p>
                <hr className="section-divider" />
                <h2>Giải đáp nhanh trước khi bạn chọn chiếc vali tiếp theo</h2>
                <p>
                  Những thông tin quan trọng nhất về chất liệu, bảo hành và trải
                  nghiệm sử dụng được tổng hợp ngay tại đây.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="faq-list">
                {faqs.map((item) => (
                  <details key={item.question} className="faq-item">
                    <summary>{item.question}</summary>
                    <div className="faq-answer">{item.answer}</div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section section--gradient" id="lien-he">
          <div className="section-container contact-layout">
            <Reveal direction="left">
              <div className="contact-copy">
                <p className="eyebrow">Liên hệ với chúng tôi</p>
                <h2>Sẵn sàng tư vấn để bạn chọn đúng mẫu NOMA phù hợp</h2>
                <p>
                  Liên hệ với đội ngũ NOMA để nhận tư vấn nhanh về kích thước,
                  màu sắc, bảo hành và ưu đãi hiện có.
                </p>

                <div className="contact-list">
                  <article>
                    <Icon name="phone" />
                    <div>
                      <strong>Hotline</strong>
                      <p>1900 6868</p>
                    </div>
                  </article>
                  <article>
                    <Icon name="mail" />
                    <div>
                      <strong>Email</strong>
                      <p>hello@nomaluggage.vn</p>
                    </div>
                  </article>
                  <article>
                    <Icon name="pin" />
                    <div>
                      <strong>Địa chỉ</strong>
                      <p>88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </article>
                  <article>
                    <Icon name="time" />
                    <div>
                      <strong>Giờ làm việc</strong>
                      <p>08:00 – 21:00 mỗi ngày</p>
                    </div>
                  </article>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                  Họ và tên
                  <input type="text" placeholder="Nhập họ tên của bạn" />
                </label>
                <label>
                  Số điện thoại
                  <input type="tel" placeholder="Nhập số điện thoại" />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="Nhập email" />
                </label>
                <label>
                  Nội dung
                  <textarea
                    rows="4"
                    placeholder="Bạn muốn được tư vấn về mẫu vali nào?"
                  />
                </label>
                <button className="button button--primary" type="submit">
                  Gửi yêu cầu
                </button>
              </form>
            </Reveal>
          </div>
        </section>


      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="section-container footer-grid">
          <div>
            <img className="site-footer__logo" src={logoImage} alt="NOMA" />
            <p>
              NOMA Luggage mang đến những chiếc vali bền bỉ, thanh lịch và sẵn
              sàng đồng hành trong mọi hành trình.
            </p>
          </div>
          <div>
            <h3>Chính sách</h3>
            <a href="#lien-he">Bảo hành chính hãng</a>
            <a href="#lien-he">Đổi trả &amp; hoàn tiền</a>
            <a href="#lien-he">Vận chuyển toàn quốc</a>
            <a href="#lien-he">Điều khoản sử dụng</a>
          </div>
          <div>
            <h3>Kết nối</h3>
            <a href="#lien-he">Facebook</a>
            <a href="#lien-he">Instagram</a>
            <a href="#lien-he">TikTok</a>
          </div>
          <div>
            <h3>Liên hệ</h3>
            <a href="tel:19006868">1900 6868</a>
            <a href="mailto:hello@nomaluggage.vn">hello@nomaluggage.vn</a>
            <p>88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
          </div>
        </div>
        <div className="site-footer__bottom">
          © NOMA Luggage. All Rights Reserved.
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default App;

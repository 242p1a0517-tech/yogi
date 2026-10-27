
import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Classic White Sneakers", category: "Fashion", price: 1499, oldPrice: 1999, rating: 4.8, emoji: "👟", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85", badge: "Bestseller" },
  { id: 2, name: "Minimal Wrist Watch", category: "Accessories", price: 2199, oldPrice: 2799, rating: 4.6, emoji: "⌚", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85", badge: "Popular" },
  { id: 3, name: "Everyday Backpack", category: "Accessories", price: 999, oldPrice: 1499, rating: 4.5, emoji: "🎒", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85", badge: "Sale" },
  { id: 4, name: "Wireless Headphones", category: "Electronics", price: 2499, oldPrice: 3299, rating: 4.9, emoji: "🎧", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85", badge: "Top rated" },
  { id: 5, name: "Modern Sunglasses", category: "Fashion", price: 799, oldPrice: 1199, rating: 4.4, emoji: "🕶️", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85", badge: "Trending" },
  { id: 6, name: "Smart Fitness Watch", category: "Electronics", price: 1899, oldPrice: 2499, rating: 4.7, emoji: "⌚", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85", badge: "New" },
  { id: 7, name: "Premium Leather Bag", category: "Accessories", price: 1799, oldPrice: 2299, rating: 4.6, emoji: "👜", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85", badge: "Popular" },
  { id: 8, name: "Everyday Running Shoes", category: "Fashion", price: 1999, oldPrice: 2699, rating: 4.8, emoji: "👟", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=85", badge: "Bestseller" },
];

const categories = [
  { name: "All", icon: "✦" },
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "🎧" },
  { name: "Accessories", icon: "👜" },
];

function money(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [search, category, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    showNotice(`${product.name} added to cart`);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function goToProducts() {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }

  return (
    <div className="app">
      <div className="announcement">
        <span>✦</span> Welcome to ShopNest — Free delivery on orders above ₹999!
      </div>

      <header className="header">
        <a className="logo" href="#home" aria-label="ShopNest home">
          <span className="logo-icon">S</span>
          <span>shop<span className="logo-accent">nest</span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>Categories</a>
          <a href="#products" onClick={() => setMobileMenu(false)}>Shop</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Search products"
            />
          </label>
          <button className="icon-button wishlist-header" onClick={goToProducts} aria-label="View wishlist items">
            ♡ <span className="small-count">{wishlist.length}</span>
          </button>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <span>🛍</span> Cart <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"></span> YOUR EVERYDAY MARKETPLACE</div>
            <h1>Find your next <span>favorite</span> thing.</h1>
            <p>
              Discover thoughtfully selected products for your lifestyle.
              Great style, everyday essentials, and little things you'll love.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={goToProducts}>Explore collection <span>→</span></button>
              <a className="text-button" href="#categories">Browse categories ↗</a>
            </div>
            <div className="hero-stats">
              <div><strong>500+</strong><span>Happy shoppers</span></div>
              <div className="stat-divider"></div>
              <div><strong>100+</strong><span>Products to explore</span></div>
              <div className="stat-divider"></div>
              <div><strong>4.8/5</strong><span>Customer rating</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=90"
                alt="Stylish modern retail store"
              />
              <div className="floating-card">
                <span className="floating-icon">✦</span>
                <div><strong>Made for your style</strong><span>Fresh finds, every day</span></div>
              </div>
            </div>
            <div className="hero-decoration">S.</div>
          </div>
        </section>

        <section className="benefits">
          <div className="benefit"><span className="benefit-icon">🚚</span><div><strong>Free delivery</strong><span>On orders above ₹999</span></div></div>
          <div className="benefit"><span className="benefit-icon">↩</span><div><strong>Easy returns</strong><span>Simple return process</span></div></div>
          <div className="benefit"><span className="benefit-icon">🔒</span><div><strong>Secure shopping</strong><span>Your details stay safe</span></div></div>
          <div className="benefit"><span className="benefit-icon">♡</span><div><strong>Made with care</strong><span>Products picked for you</span></div></div>
        </section>

        <section className="categories-section section-container" id="categories">
          <div className="section-heading">
            <div><span className="section-kicker">SHOP YOUR WAY</span><h2>Explore categories</h2></div>
            <button className="text-button" onClick={() => { setCategory("All"); goToProducts(); }}>View all products ↗</button>
          </div>
          <div className="category-grid">
            <button className={`category-card category-fashion ${category === "Fashion" ? "category-active" : ""}`} onClick={() => { setCategory("Fashion"); goToProducts(); }}>
              <span className="category-emoji">👕</span><span className="category-info"><strong>Fashion</strong><span>Style your everyday</span></span><span className="category-arrow">↗</span>
            </button>
            <button className={`category-card category-electronics ${category === "Electronics" ? "category-active" : ""}`} onClick={() => { setCategory("Electronics"); goToProducts(); }}>
              <span className="category-emoji">🎧</span><span className="category-info"><strong>Electronics</strong><span>Tech made simple</span></span><span className="category-arrow">↗</span>
            </button>
            <button className={`category-card category-accessories ${category === "Accessories" ? "category-active" : ""}`} onClick={() => { setCategory("Accessories"); goToProducts(); }}>
              <span className="category-emoji">👜</span><span className="category-info"><strong>Accessories</strong><span>Little finishing touches</span></span><span className="category-arrow">↗</span>
            </button>
          </div>
        </section>

        <section className="products-section section-container" id="products">
          <div className="section-heading products-heading">
            <div><span className="section-kicker">THE GOOD STUFF</span><h2>Our favorite finds</h2><p>Everyday essentials you'll be happy to bring home.</p></div>
            <label className="sort-label">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          <div className="filter-row">
            <div className="filter-buttons">
              {categories.map((item) => (
                <button key={item.name} className={`filter-chip ${category === item.name ? "filter-active" : ""}`} onClick={() => setCategory(item.name)}>
                  <span>{item.icon}</span> {item.name}
                </button>
              ))}
            </div>
            <span className="result-count">{filteredProducts.length} products</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="product-badge">{product.badge}</span>
                    <button
                      className={`wishlist-button ${wishlist.includes(product.id) ? "wishlisted" : ""}`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>
                    <button className="quick-add" onClick={() => addToCart(product)}>+ Add to cart</button>
                  </div>
                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-rating"><span>★</span> {product.rating} <span className="rating-reviews">(Customer favorite)</span></div>
                    <div className="product-price-row"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del><span className="discount">{Math.round((1 - product.price / product.oldPrice) * 100)}% off</span></div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-products"><span>⌕</span><h3>No products found</h3><p>Try another search or select a different category.</p><button className="primary-button" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button></div>
          )}
        </section>

        <section className="promo-section section-container">
          <div className="promo-content">
            <span className="section-kicker">A LITTLE SOMETHING FOR YOU</span>
            <h2>Good finds.<br /><span>Better prices.</span></h2>
            <p>Find your next everyday favorite without stretching your budget.</p>
            <button className="light-button" onClick={goToProducts}>Shop the collection →</button>
          </div>
          <div className="promo-art" aria-hidden="true"><span className="promo-circle circle-one"></span><span className="promo-circle circle-two"></span><span className="promo-big-letter">S</span><span className="promo-sparkle">✦</span></div>
        </section>

        <section className="about-section section-container" id="about">
          <span className="section-kicker">A LITTLE ABOUT US</span>
          <h2>Shopping should feel <span>simple.</span></h2>
          <p>ShopNest brings together everyday favorites in one easy-to-explore place. Browse, find something you love, and add it to your cart.</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="logo footer-logo" href="#home"><span className="logo-icon">S</span><span>shop<span className="logo-accent">nest</span></span></a><p>Your happy place for everyday finds.</p></div>
          <div className="footer-links"><strong>Explore</strong><a href="#home">Home</a><a href="#categories">Categories</a><a href="#products">Shop products</a></div>
          <div className="footer-links"><strong>Customer care</strong><a href="#about">About us</a><a href="mailto:hello@shopnest.example">Contact us</a><span>Easy shopping, every day.</span></div>
          <div className="footer-newsletter"><strong>Stay in the loop</strong><p>Discover new finds and shopping inspiration.</p><form onSubmit={(event) => { event.preventDefault(); showNotice("Thanks for subscribing!"); event.currentTarget.reset(); }}><input type="email" placeholder="Your email address" required aria-label="Email address" /><button aria-label="Subscribe">→</button></form></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ShopNest. Demo storefront.</span><span>Made for everyday discoveries ✦</span></div>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}

      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping cart">
            <div className="drawer-heading"><div><span className="section-kicker">YOUR SHOPPING BAG</span><h2>Your cart ({cartCount})</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><span>🛍</span><h3>Your cart is waiting</h3><p>Add something you love and it will show up here.</p><button className="primary-button" onClick={() => { setCartOpen(false); goToProducts(); }}>Start shopping</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info"><strong>{item.name}</strong><span>{money(item.price)}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button></div></div>
                      <button className="remove-item" onClick={() => setCart((current) => current.filter((product) => product.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="primary-button checkout-button" onClick={() => showNotice("Demo only — checkout is not connected yet.")}>Continue to checkout →</button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

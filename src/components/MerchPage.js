
import { ChevronLeft, ChevronRight,ShoppingCart } from "lucide-react";
import React, { useState, useRef } from "react";
import { Element } from "react-scroll";
import "./MerchPage.css";
import merchData from "../data/merchData.json";

// Import images
import tshirtImg from "../assets/images/tshirt.jpg";
import hoodieImg from "../assets/images/hoodie.jpg";
import mugImg from "../assets/images/mug.jpg";
import cardholderImg from "../assets/images/cardholder.jpg";
import totebagImg from "../assets/images/totebag.jpg";
import stickerImg from "../assets/images/sticker.jpg";

// Map JSON image keys to imports
const imageMap = {
  tshirt: tshirtImg,
  hoodie: hoodieImg,
  mug: mugImg,
  cardholder: cardholderImg,
  totebag: totebagImg,
  sticker: stickerImg,
};

const MerchPage = ({ title, content }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [expandedItem, setExpandedItem] = useState(null);
  const [hoverDetails, setHoverDetails] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const scrollRef = useRef(null);

  // Toggle favorite
  const toggleFavorite = (merchID) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      newFavs.has(merchID) ? newFavs.delete(merchID) : newFavs.add(merchID);
      return newFavs;
    });
  };

  // Toggle expanded details
  const toggleDetails = (merchID) => {
    setExpandedItem((prev) => (prev === merchID ? null : merchID));
  };

  // Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.merchID === item.merchID);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.merchID === item.merchID
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (merchID) => {
    setCart((prev) => prev.filter((item) => item.merchID !== merchID));
  };

  // Update quantity
  const updateQuantity = (merchID, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(merchID);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.merchID === merchID ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₱$,]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // External store link
  const redirectToBrand = (brandURL) => {
    if (brandURL) window.open(brandURL, "_blank");
  };

  // Scroll controls
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Element name="merch">
      <div className="merch-page">
        <div className="merch-header">
          <h1>{title || "MERCHANDISE"}</h1>
          <p>
            {content ||
              "Buy and support Baybayin heritage from different shops across the country!"}
          </p>
        </div>

        <button
  className="cart-toggle-btn"
  onClick={() => setIsCartOpen(!isCartOpen)}
>
  <ShoppingCart size={12} className="cart-icon" />
  <span className="cart-label">{`Cart (${getCartItemCount()})`}</span>
</button>
        {/* Scroll Buttons with spacing */}
        <button className="scroll-btn left" onClick={scrollLeft}>
          <ChevronLeft size={24} />
        </button>
        <button className="scroll-btn right" onClick={scrollRight}>
          <ChevronRight size={24} />
        </button>

        {/* Merch Grid */}
        <div className="merch-grid" ref={scrollRef}>
          {merchData.map((item) => {
            const isExpanded = expandedItem === item.merchID;
            const isHovered = hoverDetails === item.merchID;

            return (
              <div
                key={item.merchID}
                className={`merch-card ${isExpanded ? "expanded" : ""}`}
              >
                {/* Image + overlay */}
                <div
                  className="merch-image-container"
                  onMouseEnter={() => setHoverDetails(item.merchID)}
                  onMouseLeave={() => setHoverDetails(null)}
                >
                  <img
                    src={imageMap[item.image]}
                    alt={item.name}
                    className="merch-image"
                  />

                  {/* Hover overlay */}
                  {isHovered && (
                    <div className="hover-details-overlay">
                      <div className="hover-details-content">
                        <p className="hover-description">{item.description}</p>
                        <div className="hover-quick-info">
                          <span className="hover-sizes">
                            {item.sizes.slice(0, 3).join(", ")}
                            {item.sizes.length > 3 ? "..." : ""}
                          </span>
                          <span className="hover-colors">
                            {item.colors.slice(0, 2).join(", ")}
                            {item.colors.length > 2 ? "..." : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    className={`favorite-btn ${
                      favorites.has(item.merchID) ? "favorited" : ""
                    }`}
                    onClick={() => toggleFavorite(item.merchID)}
                    aria-label="Add to favorites"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="heart-icon">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                  {/* Price badge */}
                  <div className="quick-info-badge">
                    <span className="price-badge">{item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="merch-content">
                  <h3 className="merch-name">{item.name}</h3>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="merch-details">
                      <p className="merch-description">{item.description}</p>

                      <div className="product-specs">
                        <div className="spec-row">
                          <strong>Available Sizes:</strong>
                          <div className="spec-tags">
                            {item.sizes.map((size, i) => (
                              <span key={i} className="spec-tag size-tag">
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="spec-row">
                          <strong>Available Colors:</strong>
                          <div className="spec-tags">
                            {item.colors.map((color, i) => (
                              <span key={i} className="spec-tag color-tag">
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="merch-price-main">{item.price}</div>

                  <div className="merch-actions">
                    <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                    <button
                      className="brand-link-btn"
                      onClick={() => redirectToBrand(item.brandURL)}
                    >
                      Visit Store
                    </button>
                    <button
                      className="details-btn"
                      onClick={() => toggleDetails(item.merchID)}
                    >
                      {isExpanded ? "Less Info" : "More Info"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Sidebar */}
        <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>

          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.merchID} className="cart-item">
                      <img
                        src={imageMap[item.image]}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.merchID, item.quantity - 1)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.merchID, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.merchID)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ₱{getTotalPrice().toFixed(2)}</strong>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cart Overlay */}
        {isCartOpen && (
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
        )}
      </div>
    </Element>
  );
};

export default MerchPage;

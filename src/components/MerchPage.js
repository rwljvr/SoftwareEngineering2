import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  X,
  Check,
} from "lucide-react";
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
  const [cartToast, setCartToast] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [selectionModal, setSelectionModal] = useState({ open: false, item: null });
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const scrollRef = useRef(null);

  // --- Helpers ---
  const toggleFavorite = (merchID) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      newFavs.has(merchID) ? newFavs.delete(merchID) : newFavs.add(merchID);
      return newFavs;
    });
  };

  const toggleDetails = (merchID) => {
    setExpandedItem((prev) => (prev === merchID ? null : merchID));
  };

  const openSelection = (item) => {
    setSelectionModal({ open: true, item });
    setSelectedSize("");
    setSelectedColor("");
  };

  const confirmSelection = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart({ ...selectionModal.item, selectedSize, selectedColor });
    setSelectionModal({ open: false, item: null });
  };

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

    setCartToast(`✅ ${item.name} added to cart`);
    setTimeout(() => setCartToast(""), 2500);
  };

  const removeFromCart = (merchID) => {
    setCart((prev) => prev.filter((item) => item.merchID !== merchID));
  };

  const updateQuantity = (merchID, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(merchID);
    setCart((prev) =>
      prev.map((item) =>
        item.merchID === merchID ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₱$,]/g, ""));
      return total + price * item.quantity;
    }, 0);

  const getCartItemCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutMessage("⚠️ Your cart is empty!");
    } else {
      setCheckoutMessage("🎉 Thank you for your purchase!");
      setCart([]);
    }
    setTimeout(() => setCheckoutMessage(""), 3000);
  };

  const redirectToBrand = (brandURL) => {
    if (brandURL) window.open(brandURL, "_blank");
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // --- JSX ---
  return (
    <Element name="merch">
      <div className="merch-page">
        {/* Header */}
        <div className="merch-header">
          <h1>{title || "MERCHANDISE"}</h1>
          <p>
            {content ||
              "Buy and support Baybayin heritage from different shops across the country!"}
          </p>
        </div>

        {/* Cart Toggle */}
        <button
          className={`cart-toggle-btn ${cartToast ? "cart-bump" : ""}`}
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart size={18} className="cart-icon" />
          <span className="cart-label">{`Cart (${getCartItemCount()})`}</span>
        </button>

        {/* Scroll Buttons */}
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
              <div key={item.merchID} className={`merch-card ${isExpanded ? "expanded" : ""}`}>
                {/* Image + Hover */}
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

                  {/* Favorite Button */}
                  <button
                    className={`favorite-btn ${favorites.has(item.merchID) ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(item.merchID)}
                    aria-label="Add to favorites"
                  >
                    <Heart size={20} />
                  </button>

                  {/* Price Badge */}
                  <div className="quick-info-badge">
                    <span className="price-badge">{item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="merch-content">
                  <h3 className="merch-name">{item.name}</h3>

                  {isExpanded && (
                    <div className="merch-details">
                      <p className="merch-description">{item.description}</p>
                      <div className="product-specs">
                        <div className="spec-row">
                          <strong>Available Sizes:</strong>
                          <div className="spec-tags">
                            {item.sizes.map((size, i) => (
                              <span key={i} className="spec-tag size-tag">{size}</span>
                            ))}
                          </div>
                        </div>
                        <div className="spec-row">
                          <strong>Available Colors:</strong>
                          <div className="spec-tags">
                            {item.colors.map((color, i) => (
                              <span key={i} className="spec-tag color-tag">{color}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="merch-price-main">{item.price}</div>

                  <div className="merch-actions">
                    <button className="add-to-cart-btn" onClick={() => openSelection(item)}>
                      Add to Cart
                    </button>
                    <button className="brand-link-btn" onClick={() => redirectToBrand(item.brandURL)}>
                      Visit Store
                    </button>
                    <button className="details-btn" onClick={() => toggleDetails(item.merchID)}>
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
              <X size={20} />
            </button>
          </div>

          {checkoutMessage && <div className="checkout-message">{checkoutMessage}</div>}

          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="empty-cart"><p>Your cart is empty</p></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.merchID} className="cart-item">
                      <img src={imageMap[item.image]} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.merchID, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.merchID, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button className="remove-item-btn" onClick={() => removeFromCart(item.merchID)}>
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ₱{getTotalPrice().toFixed(2)}</strong>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cart Overlay */}
        {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}

        {/* Toast Notification */}
        {cartToast && (
          <div className="cart-toast">
            <Check size={18} className="toast-icon" />
            <span>{cartToast}</span>
          </div>
        )}

        {/* Selection Modal */}
        {selectionModal.open && (
          <div className="selection-modal">
            <div className="modal-content">
              <h3>Select Options for {selectionModal.item.name}</h3>

              <div className="option-group">
                <strong>Size:</strong>
                <div className="spec-tags">
                  {selectionModal.item.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`spec-tag size-tag ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <strong>Color:</strong>
                <div className="spec-tags">
                  {selectionModal.item.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`spec-tag color-tag ${selectedColor === color ? "active" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button onClick={confirmSelection} className="add-to-cart-btn confirm-btn">
                  <Check size={18} /> Confirm
                </button>
                <button onClick={() => setSelectionModal({ open: false, item: null })} className="cancel-btn">
                  <X size={18} /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Element>
  );
};

export default MerchPage;

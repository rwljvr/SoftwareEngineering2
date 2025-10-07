// File: src/components/MerchPage.js
import React from "react";
import { Element } from "react-scroll";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  X,
  Check,
} from "lucide-react";
import "./MerchPage.css";
import Page from "./Page";
import merchData from "../data/merchData.json";

// Import images
import tshirtImg from "../assets/images/tshirt.jpg";
import hoodieImg from "../assets/images/hoodie.jpg";
import mugImg from "../assets/images/mug.jpg";
import cardholderImg from "../assets/images/cardholder.jpg";
import totebagImg from "../assets/images/totebag.jpg";
import stickerImg from "../assets/images/sticker.jpg";

const imageMap = {
  tshirt: tshirtImg,
  hoodie: hoodieImg,
  mug: mugImg,
  cardholder: cardholderImg,
  totebag: totebagImg,
  sticker: stickerImg,
};

// MerchItem Class - represents individual merchandise items
class MerchItem {
  constructor(data) {
    this.merchID = data.merchID;
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
    this.price = data.price;
    this.sizes = data.sizes || [];
    this.colors = data.colors || [];
    this.brandURL = data.brandURL;
  }

  displayItem() {
    // Returns the display data for this item
    return {
      merchID: this.merchID,
      name: this.name,
      image: this.image,
      description: this.description,
      price: this.price,
      sizes: this.sizes,
      colors: this.colors,
      brandURL: this.brandURL,
    };
  }

  showDetails() {
    // Returns detailed information
    return {
      description: this.description,
      sizes: this.sizes,
      colors: this.colors,
    };
  }
}

// BrandLink Class - handles brand site interactions
class BrandLink {
  constructor(brandID, name, url, logo) {
    this.brandID = brandID;
    this.brandName = name;
    this.url = url;
    this.logo = logo;
  }

  openBrandSite() {
    if (this.url) {
      window.open(this.url, "_blank");
    }
  }
}

// MerchPage Class - extends Page base class
class MerchPage extends Page {
  constructor(props) {
    super({
      ...props,
      pageID: 4,
      title: props.title || "MERCHANDISE",
      content: props.content || "Buy and support Baybayin heritage from different shops across the country!",
    });

    this.state = {
      favorites: new Set(),
      expandedItem: null,
      hoverDetails: null,
      cart: [],
      isCartOpen: false,
      cartToast: "",
      checkoutMessage: "",
      selectionModal: { open: false, item: null },
      selectedSize: "",
      selectedColor: "",
    };

    this.merchItems = [];
    this.scrollRef = React.createRef();
  }

  loadMerchItems() {
    // Load merchandise items from data
    this.merchItems = merchData.map(data => new MerchItem(data));
  }

  displayMerchItem(item) {
    // Display individual merchandise item
    return item.displayItem();
  }

  showBrandLinks(item) {
    // Create and open brand link
    const brand = new BrandLink(
      item.merchID,
      item.name,
      item.brandURL,
      null
    );
    brand.openBrandSite();
  }

  showDetails(merchID) {
    // Toggle details display
    this.setState((prevState) => ({
      expandedItem: prevState.expandedItem === merchID ? null : merchID,
    }));
  }

  toggleFavorite = (merchID) => {
    this.setState((prevState) => {
      const newFavs = new Set(prevState.favorites);
      newFavs.has(merchID) ? newFavs.delete(merchID) : newFavs.add(merchID);
      return { favorites: newFavs };
    });
  };

  openSelection = (item) => {
    this.setState({
      selectionModal: { open: true, item },
      selectedSize: "",
      selectedColor: "",
    });
  };

  confirmSelection = () => {
    const { selectedSize, selectedColor, selectionModal } = this.state;
    if (!selectedSize || !selectedColor) return;
    this.addToCart({ ...selectionModal.item, selectedSize, selectedColor });
    this.setState({ selectionModal: { open: false, item: null } });
  };

  addToCart = (item) => {
    this.setState((prevState) => {
      const existingItem = prevState.cart.find(
        (cartItem) => cartItem.merchID === item.merchID
      );
      const newCart = existingItem
        ? prevState.cart.map((cartItem) =>
            cartItem.merchID === item.merchID
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevState.cart, { ...item, quantity: 1 }];

      return { cart: newCart, cartToast: `✅ ${item.name} added to cart` };
    });

    setTimeout(() => this.setState({ cartToast: "" }), 2500);
  };

  removeFromCart = (merchID) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.merchID !== merchID),
    }));
  };

  updateQuantity = (merchID, newQuantity) => {
    if (newQuantity <= 0) return this.removeFromCart(merchID);
    this.setState((prevState) => ({
      cart: prevState.cart.map((item) =>
        item.merchID === merchID ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  getTotalPrice = () => {
    return this.state.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₱$,]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  getCartItemCount = () => {
    return this.state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  handleCheckout = () => {
    const message =
      this.state.cart.length === 0
        ? "⚠️ Your cart is empty!"
        : "🎉 Thank you for your purchase!";
    
    this.setState({
      checkoutMessage: message,
      cart: this.state.cart.length === 0 ? this.state.cart : [],
    });

    setTimeout(() => this.setState({ checkoutMessage: "" }), 3000);
  };

  scrollLeft = () => {
    this.scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  scrollRight = () => {
    this.scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  componentDidMount() {
    this.loadMerchItems();
    this.forceUpdate();
  }

  renderContent() {
    const {
      favorites,
      expandedItem,
      hoverDetails,
      cart,
      isCartOpen,
      cartToast,
      checkoutMessage,
      selectionModal,
      selectedSize,
      selectedColor,
    } = this.state;

    return (
      <Element name="merch">
        <div className="merch-page">
          {/* Header */}
          <div className="merch-header">
            <h1>{this.title}</h1>
            <p>{this.content}</p>
          </div>

          {/* Cart Toggle */}
          <button
            className={`cart-toggle-btn ${cartToast ? "cart-bump" : ""}`}
            onClick={() => this.setState({ isCartOpen: !isCartOpen })}
          >
            <ShoppingCart size={18} className="cart-icon" />
            <span className="cart-label">{`Cart (${this.getCartItemCount()})`}</span>
          </button>

          {/* Scroll Buttons */}
          <button className="scroll-btn left" onClick={this.scrollLeft}>
            <ChevronLeft size={24} />
          </button>
          <button className="scroll-btn right" onClick={this.scrollRight}>
            <ChevronRight size={24} />
          </button>

          {/* Merch Grid */}
          <div className="merch-grid" ref={this.scrollRef}>
            {this.merchItems.map((merchItem) => {
              const item = merchItem.displayItem();
              const isExpanded = expandedItem === item.merchID;
              const isHovered = hoverDetails === item.merchID;

              return (
                <div
                  key={item.merchID}
                  className={`merch-card ${isExpanded ? "expanded" : ""}`}
                >
                  {/* Image + Hover */}
                  <div
                    className="merch-image-container"
                    onMouseEnter={() => this.setState({ hoverDetails: item.merchID })}
                    onMouseLeave={() => this.setState({ hoverDetails: null })}
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
                      className={`favorite-btn ${
                        favorites.has(item.merchID) ? "favorited" : ""
                      }`}
                      onClick={() => this.toggleFavorite(item.merchID)}
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
                      <button
                        className="add-to-cart-btn"
                        onClick={() => this.openSelection(item)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="brand-link-btn"
                        onClick={() => this.showBrandLinks(item)}
                      >
                        Visit Store
                      </button>
                      <button
                        className="details-btn"
                        onClick={() => this.showDetails(item.merchID)}
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
              <button
                className="close-cart-btn"
                onClick={() => this.setState({ isCartOpen: false })}
              >
                <X size={20} />
              </button>
            </div>

            {checkoutMessage && (
              <div className="checkout-message">{checkoutMessage}</div>
            )}

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
                            <button
                              onClick={() =>
                                this.updateQuantity(
                                  item.merchID,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                this.updateQuantity(
                                  item.merchID,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() => this.removeFromCart(item.merchID)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <strong>Total: ₱{this.getTotalPrice().toFixed(2)}</strong>
                    </div>
                    <button
                      className="checkout-btn"
                      onClick={this.handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Cart Overlay */}
          {isCartOpen && (
            <div
              className="cart-overlay"
              onClick={() => this.setState({ isCartOpen: false })}
            ></div>
          )}

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
                        className={`spec-tag size-tag ${
                          selectedSize === size ? "active" : ""
                        }`}
                        onClick={() => this.setState({ selectedSize: size })}
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
                        className={`spec-tag color-tag ${
                          selectedColor === color ? "active" : ""
                        }`}
                        onClick={() => this.setState({ selectedColor: color })}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    onClick={this.confirmSelection}
                    className="add-to-cart-btn confirm-btn"
                  >
                    <Check size={18} /> Confirm
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ selectionModal: { open: false, item: null } })
                    }
                    className="cancel-btn"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Element>
    );
  }

  navigateTo() {
    const element = document.querySelector('[name="merch"]');
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default MerchPage;
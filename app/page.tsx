'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, ChevronUp, LockKeyhole, Minus, Plus, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react'

const product = {
  name: 'Arc One',
  eyebrow: 'The everyday carry, re-engineered.',
  description: 'A precision-built desk companion that keeps your focus in frame and your workspace in flow.',
  price: 189,
  accent: 'Signal Blue',
}

function ProductVisual() {
  return (
    <div className="product-visual" aria-label="Arc One device preview">
      <div className="visual-grid" />
      <div className="device-shadow" />
      <div className="device">
        <div className="device-screen"><span>09:41</span><strong>ARC</strong></div>
        <div className="device-edge" />
        <div className="device-detail" />
      </div>
      <div className="visual-tag"><span className="status-dot" /> Designed for momentum</div>
    </div>
  )
}

function Quantity({ quantity, setQuantity }: { quantity: number; setQuantity: (value: number) => void }) {
  return (
    <div className="quantity" aria-label="Quantity selector">
      <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button>
      <span>{quantity}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(Math.min(5, quantity + 1))}><Plus size={14} /></button>
    </div>
  )
}

export default function Page() {
  const [checkout, setCheckout] = useState(false)
  const [success, setSuccess] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [error, setError] = useState('')
  const total = useMemo(() => product.price * quantity, [quantity])

  function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.includes('@') || card.replace(/\s/g, '').length < 12) {
      setError('Enter a valid email and 12+ digit card number.')
      return
    }
    setError('')
    setSuccess(true)
  }

  return (
    <main className="storefront-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Arc home"><span className="brand-mark">A</span><span>arc<span className="brand-muted">/</span>studio</span></a>
        <div className="topbar-meta"><span>Built for better days</span><span className="live-pill"><span className="status-dot" /> In stock</span></div>
      </header>

      {!checkout ? (
        <section className="store-grid" id="top">
          <div className="hero-copy">
            <div className="section-label"><Sparkles size={13} /> New release / 2026</div>
            <h1>Make space<br /><em>for focus.</em></h1>
            <p className="hero-description">{product.description}</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => setCheckout(true)}>Buy Arc One <ArrowRight size={16} /></button>
              <span className="ship-note">Ships free · 2–4 days</span>
            </div>
            <div className="feature-row">
              <div><ShieldCheck size={17} /><span>2 year warranty</span></div>
              <div><RotateCcw size={17} /><span>30 day returns</span></div>
            </div>
          </div>

          <ProductVisual />

          <aside className="product-card" aria-label="Product details">
            <div className="card-top"><span className="section-label">01 / Product</span><span className="product-code">ARC-001</span></div>
            <h2>{product.name}</h2>
            <p className="muted">{product.accent} edition</p>
            <div className="divider" />
            <div className="price-line"><span className="price">${product.price}</span><span className="price-caption">one-time<br />purchase</span></div>
            <div className="card-details"><div><span>Material</span><strong>Recycled aluminum</strong></div><div><span>Finish</span><strong>Soft graphite</strong></div><div><span>Includes</span><strong>Arc One + cable</strong></div></div>
            <button className="text-button" type="button" onClick={() => setCheckout(true)}>View checkout <ArrowRight size={15} /></button>
          </aside>
        </section>
      ) : (
        <section className="checkout-layout">
          <div className="checkout-intro">
            <button className="back-button" type="button" onClick={() => { setCheckout(false); setSuccess(false) }}>← Back to product</button>
            <div className="section-label">02 / Checkout</div>
            <h1>Almost<br /><em>yours.</em></h1>
            <p>Secure your Arc One. No account required.</p>
            <div className="secure-note"><LockKeyhole size={15} /> Demo checkout · your card will not be charged</div>
          </div>
          {success ? (
            <div className="success-panel"><div className="success-icon"><Check size={25} /></div><div className="section-label">Order confirmed</div><h2>You&apos;re in the flow.</h2><p>Your Arc One is reserved. We&apos;ll send the details to {email}.</p><button className="text-button" type="button" onClick={() => { setCheckout(false); setSuccess(false) }}>Return home <ArrowRight size={15} /></button></div>
          ) : (
            <form className="payment-card" onSubmit={submitPayment}>
              <div className="order-line"><div><strong>{product.name}</strong><span>Graphite / One unit</span></div><div className="order-price">${total}</div></div>
              <div className="quantity-line"><span>Quantity</span><Quantity quantity={quantity} setQuantity={setQuantity} /></div>
              <div className="divider" />
              <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /></label>
              <label>Card details<div className="card-input"><input inputMode="numeric" value={card} onChange={(event) => setCard(event.target.value)} placeholder="4242 4242 4242 4242" required /><span>VISA</span></div></label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="primary-button checkout-button" type="submit">Pay ${total} <LockKeyhole size={15} /></button>
              <p className="tiny-note">By continuing, you agree to Arc Studio&apos;s terms.</p>
            </form>
          )}
        </section>
      )}
      <footer className="footer"><span>© 2026 Arc Studio</span><span>Thoughtfully made in California</span><span>Privacy · Terms</span></footer>
    </main>
  )
}

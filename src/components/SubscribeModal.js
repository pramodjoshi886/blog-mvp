'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function SubscribeModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Thank you!');
                setEmail('');
                setName('');

                // Confetti Burst
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    zIndex: 2000
                });

                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setMessage('');
                }, 2500);
            } else {
                setStatus('error');
                setMessage(data.error);
            }
        } catch (err) {
            setStatus('error');
            setMessage('Something went wrong.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                {status === 'success' ? (
                    <div className="success-message">
                        <h3>🎉</h3>
                        <p>{message}</p>
                    </div>
                ) : (
                    <>
                        <h2>Join the Newsletter</h2>
                        <p>Get the latest articles delivered to your inbox.</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={status === 'loading'}
                            />
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                            <button type="submit" className="btn" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Joining...' : 'Subscribe'}
                            </button>
                            {status === 'error' && <p className="error">{message}</p>}
                        </form>
                    </>
                )}
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-content {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 400px;
          position: relative;
          box-shadow: var(--shadow-md);
          text-align: center;
        }
        .close-btn {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--muted);
        }
        h2 { margin-bottom: 0.5rem; }
        p { color: var(--muted); margin-bottom: 1.5rem; }
        
        form { display: flex; flex-direction: column; gap: 1rem; }
        
        input {
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          background: var(--background);
          color: var(--foreground);
        }
        
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        
        .success-message h3 { font-size: 3rem; margin-bottom: 1rem; }
      `}</style>
        </div>
    );
}

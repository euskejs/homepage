'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUp, MessageCircle, Plus } from 'lucide-react';
import { site } from '@/data/site';

type Message = { role: 'user' | 'assistant'; content: string };

export function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    const log = conversation.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, busy]);

  async function send(text: string) {
    if (!text.trim() || controller.current) return;
    const updated: Message[] = [...messages, { role: 'user', content: text.trim() }];
    // Keep the full visible conversation; only bound the context sent to the API.
    const history = updated.slice(-13);
    setError(''); setBusy(true); setDraft(''); setMessages(updated);
    const abort = new AbortController(); controller.current = abort;
    try {
      const response = await fetch('/api/ai-twin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.any([abort.signal, AbortSignal.timeout(40000)]),
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== 'string') throw new Error(data.error || site.twin.chatError);
      setMessages([...updated, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(updated.slice(0, -1)); setDraft(text);
      setError(err instanceof Error && err.name === 'Error' ? err.message : site.twin.chatError);
    } finally {
      controller.current = null; setBusy(false);
      requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    }
  }

  function newChat() {
    setMessages([]); setError(''); setDraft('');
    input.current?.focus({ preventScroll: true });
  }

  return <section className="chat" aria-label="Chat with Kejia’s AI Twin">
    <div className="chat-toolbar">
      <div className="chat-identity"><span className="chat-avatar" aria-hidden="true">KS</span><div><strong>{site.twin.chatName}</strong><span className="status">{site.twin.liveLabel}</span></div></div>
      <button className="new-chat" type="button" disabled={busy || !messages.length} onClick={newChat}><Plus size={17} aria-hidden="true"/>New chat</button>
    </div>

    <div className="chat-messages" ref={conversation} tabIndex={0} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
      {!messages.length && <div className="chat-start"><MessageCircle size={34} strokeWidth={1.4} aria-hidden="true"/><h2>{site.twin.welcome}</h2><p>{site.twin.chatIntro}</p><div className="chat-suggestions">{site.twin.suggestions.map(text => <button type="button" disabled={busy} key={text} onClick={() => send(text)}>{text}</button>)}</div></div>}
      {messages.map((m, i) => <article className={`chat-message ${m.role}`} key={i} aria-label={m.role === 'user' ? 'Your question' : 'AI Twin answer'}>
        <div className="message-author">{m.role === 'assistant' && <span className="message-avatar" aria-hidden="true">KS</span>}<span>{m.role === 'user' ? 'You' : site.twin.chatName}</span></div>
        <div className="message-content">{m.content.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </article>)}
      {busy && <div role="status" className="chat-thinking"><span className="message-avatar" aria-hidden="true">KS</span>Thinking…</div>}
    </div>

    <div className="chat-compose-area">
      {error && <p role="alert" className="chat-error">{error} Your question is ready to resend.</p>}
      <form className="chat-composer" onSubmit={e => { e.preventDefault(); void send(draft); }}>
        <label className="sr-only" htmlFor="twin-message">Your question</label>
        <textarea ref={input} id="twin-message" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(draft); }
        }} maxLength={1000} rows={2} disabled={busy} placeholder={site.twin.questionPlaceholder} aria-describedby="chat-input-help"/>
        <div className="chat-actions"><small id="chat-input-help"><span className="keyboard-hint">Enter to send · Shift + Enter for a new line</span><span>{draft.length}/1,000</span></small><button className="chat-send" type="submit" aria-label={busy ? 'Sending message' : 'Send message'} title="Send message" disabled={busy || !draft.trim()}><ArrowUp size={21} aria-hidden="true"/></button></div>
      </form>
      <p className="chat-note">{site.twin.accuracy}</p>
      <details className="chat-privacy"><summary>{site.twin.privacyLabel}</summary><p>{site.twin.privacy}</p></details>
    </div>
  </section>;
}

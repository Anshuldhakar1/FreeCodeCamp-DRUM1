import styles from './app.module.css';
import { useState, useEffect, useRef } from "react";

type AppState = {
  display: string
};

export const Main: React.FC = () => {

  const [display, setDisplay] = useState<AppState['display']>("Nothing");

  const QRef = useRef<HTMLAudioElement>(null);
  const WRef = useRef<HTMLAudioElement>(null);
  const ERef = useRef<HTMLAudioElement>(null);
  const ARef = useRef<HTMLAudioElement>(null);
  const SRef = useRef<HTMLAudioElement>(null);
  const DRef = useRef<HTMLAudioElement>(null);
  const ZRef = useRef<HTMLAudioElement>(null);
  const XRef = useRef<HTMLAudioElement>(null);
  const CRef = useRef<HTMLAudioElement>(null);

  const drumPads = [
    { id: 'Q', ref: QRef, src: '/src/assets/Heater-1.mp3' },
    { id: 'W', ref: WRef, src: '/src/assets/Heater-2.mp3' },
    { id: 'E', ref: ERef, src: '/src/assets/Heater-3.mp3' },
    { id: 'A', ref: ARef, src: '/src/assets/Heater-4_1.mp3' },
    { id: 'S', ref: SRef, src: '/src/assets/Cev_H2.mp3' },
    { id: 'D', ref: DRef, src: '/src/assets/Dsc_Oh.mp3' },
    { id: 'Z', ref: ZRef, src: '/src/assets/Kick_n_Hat.mp3' },
    { id: 'X', ref: XRef, src: '/src/assets/RP4_KICK_1.mp3' },
    { id: 'C', ref: CRef, src: '/src/assets/side_stick_1.mp3' },
  ];

  useEffect(() => {
    const handleCanPlayThrough = () => {
      window.addEventListener('keydown', handleKeydown);
    };

    const audioElements = [QRef.current, WRef.current, ERef.current, ARef.current, SRef.current, DRef.current, ZRef.current, XRef.current, CRef.current];
    audioElements.forEach(audio => audio?.addEventListener('canplaythrough', handleCanPlayThrough));
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      audioElements.forEach(audio => audio?.removeEventListener('canplaythrough', handleCanPlayThrough));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleKeydown(e: KeyboardEvent): void {
    e.preventDefault();
    const key = e.key.toUpperCase();
    if ('QWEASDZXC'.includes(key)) {
      playClip(key, `${key} Sound`);
    }
  }

  function playClip(id: string, description: string): void {
    let audio: HTMLAudioElement | null = null;
    switch (id) {
      case 'Q': audio = QRef.current; break;
      case 'W': audio = WRef.current; break;
      case 'E': audio = ERef.current; break;
      case 'A': audio = ARef.current; break;
      case 'S': audio = SRef.current; break;
      case 'D': audio = DRef.current; break;
      case 'Z': audio = ZRef.current; break;
      case 'X': audio = XRef.current; break;
      case 'C': audio = CRef.current; break;
    }
    if (audio) {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio.play();
      setDisplay(description);
    }
  }

  return (
    <div id="drum-machine" className={styles['drum-machine']}>
      <div id="display" className={styles['display']}>
        <h3 style={{ margin: "none" }}>Now Playing</h3>
        <span>{display}</span>
      </div>

      <div id="buttons" className={styles['buttons']} >
        {
          drumPads.map((drumPad, index) => {
            return (
              <button
                key={index}
                id={drumPad.id}
                className={styles['drum-pad']}
                onClick={() => playClip(drumPad.id, `${drumPad.id} Sound`)}
              >
                {drumPad.id}
                <audio ref={drumPad.ref} src={drumPad.src} className="clip" id={drumPad.id}></audio>
              </button>
            );
          })
        }
      </div>

    </div>
  );
};

export default Main;


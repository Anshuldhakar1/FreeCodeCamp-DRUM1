// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { useEffect, useRef, useState } from 'react';

import Heater1 from '/src/assets/Heater-1.mp3';
import Heater2 from '/src/assets/Heater-2.mp3';
import Heater3 from '/src/assets/Heater-3.mp3';
import Heater4_1 from '/src/assets/Heater-4_1.mp3';
import Cev_H2 from '/src/assets/Cev_H2.mp3';
import Dsc_Oh from '/src/assets/Dsc_Oh.mp3';
import Kick_n_Hat from '/src/assets/Kick_n_Hat.mp3';
import RP4_KICK_1 from '/src/assets/RP4_KICK_1.mp3';
import side_stick_1 from '/src/assets/side_stick_1.mp3';

type AppState = {
	display: string
}

interface pad {
	id: string,
	display: string,
	ref: React.RefObject<HTMLAudioElement>,
	src: string
}

export const App: React.FC = () => {

	const [display, setDisplay] = useState<AppState['display']>("Nothing Playing ");

	const QRef = useRef<HTMLAudioElement>(null);
	const WRef = useRef<HTMLAudioElement>(null);
	const ERef = useRef<HTMLAudioElement>(null);
	const ARef = useRef<HTMLAudioElement>(null);
	const SRef = useRef<HTMLAudioElement>(null);
	const DRef = useRef<HTMLAudioElement>(null);
	const ZRef = useRef<HTMLAudioElement>(null);
	const XRef = useRef<HTMLAudioElement>(null);
	const CRef = useRef<HTMLAudioElement>(null);

	const drumPads: Array<pad> = [
		{ id: 'Q', display: "Heater 1", ref: QRef, src: Heater1 },
		{ id: 'W', display: "Heater 2", ref: WRef, src: Heater2 },
		{ id: 'E', display: "Heater 3", ref: ERef, src: Heater3 },
		{ id: 'A', display: "Heater 4 1", ref: ARef, src: Heater4_1 },
		{ id: 'S', display: "Cev H2", ref: SRef, src: Cev_H2 },
		{ id: 'D', display: "DSC Oh", ref: DRef, src: Dsc_Oh },
		{ id: 'Z', display: "Kick n Hat", ref: ZRef, src: Kick_n_Hat },
		{ id: 'X', display: "RP4 KICK 1", ref: XRef, src: RP4_KICK_1 },
		{ id: 'C', display: "Side Stick 1", ref: CRef, src: side_stick_1 }
	];

	const playClip = (id:string, description:string) => {

		let audio:HTMLAudioElement | null = null;
		switch (id) {
			case 'Q': audio = QRef.current; break;
			case 'W': audio = QRef.current; break;
			case 'E': audio = QRef.current; break;
			case 'A': audio = QRef.current; break;
			case 'S': audio = QRef.current; break;
			case 'D': audio = QRef.current; break;
			case 'Z': audio = QRef.current; break;
			case 'X': audio = QRef.current; break;
			case 'C': audio = QRef.current; break;
		}
		if (audio) {
			if (!audio.paused) {
				audio.pause();
				audio.currentTime = 0;
			}
			audio.play();
			setDisplay(description);
		}
	};

	const handleKeyDown = (e:KeyboardEvent): void => {
		const key = e.key.toUpperCase();
		if ("QWEASDZXC".includes(key)) {
			e.preventDefault();
			const p = drumPads.find((object: pad) => { return object.id === key.toString() });
			playClip(key, p? p.display: "Null");
		}
	}

	useEffect(() => {

		const handleCanPlayThrough = () => {
			window.addEventListener('keydown', handleKeyDown);
		};

		const audioElements = [
			QRef.current,
			WRef.current,
			ERef.current,
			ARef.current,
			SRef.current,
			DRef.current,
			ZRef.current,
			XRef.current,
			CRef.current
		];

		audioElements.forEach(audio => {
			audio?.addEventListener('canplaythrough', handleCanPlayThrough);
		});

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			audioElements.forEach(audio => {
				audio?.removeEventListener('canplaythrough', handleCanPlayThrough)
			});
		};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    return (
		<div id="drum-machine" className={styles['drum-machine']}>
			<div id="display" className={ styles['display']}>
				<h3>Now Playing</h3>
				<span>{display}</span>
			</div>
			<div id="buttons" className={styles['buttons']}>
				{
					drumPads.map((drumPad, index) => {
						return (
							<button
								key={index}
                id={drumPad.id}
                className={styles['drum-pad']}
								onClick={() => playClip(drumPad.id, `${drumPad.display}`)}
							>{drumPad.id}
								<audio ref={drumPad.ref} src={drumPad.src} className="clip" id={drumPad.id}></audio>
							</button>
						)
					})
				}
			</div>
        </div>
    );
};

export default App;

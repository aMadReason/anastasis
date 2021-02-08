import { Howl } from 'howler';


class HowlerChannel {
  constructor(options) {
    const initial = { volume: 1.0, preload: true, autoplay: false, muted: false, rate: 1.0, fadeDuration: 2000 }
    this.options = { ...initial, ...options };
    this.tracks = {};
  }
  addTrack(key, options = {}) {
    const track = new Howl({ ...this.options, ...options });
    track.playing = false;

    track.on('end', () => {
      track.pos(0);
      track.playing = false;
    });

    track.on('stop', () => {
      track.pos(0);
      track.playing = false;
    });

    track.on('play', () => track.playing = true);

    this.tracks[key] = track;
    return this;
  }
  getTrack(key) {
    return this.tracks[key];
  }
  getPlaying() {
    return Object.keys(this.tracks).filter(i => this.tracks[i].playing)
  }
  play(key) {
    const track = this.getTrack(key);
    if (track) {
      track.pos(0).play();
    }
  }
  fadeIn(key, duration = this.options.fadeDuration) {
    const track = this.getTrack(key);
    if (track && !track.playing) {
      this.play(key)
      track.fade(0, this.options.volume, duration);
    }
  }
  fadeOut(key, duration = this.options.fadeDuration) {
    const track = this.getTrack(key);
    if (track && track.playing) {
      track.playing = false;
      track.fade(this.options.volume, 0, duration);
    }
  }
  crossFade(toKey) {
    const playing = Object.keys(this.tracks).filter((i, idx) => this.tracks[i].playing && idx !== toKey);
    const to = this.getTrack(toKey);
    playing.map(i => this.fadeOut(i));
    if (to) this.fadeIn(toKey);
  }
  updateTracks(options = {}) {
    const keys = Object.keys(this.tracks);
    const optionKeys = Object.keys({ ...this.options, ...options });
    keys.map(i => {
      const track = this.tracks[i];
      optionKeys.map(opt => track[opt] = options[opt])
    })
  }
  setVolume(volume) {
    this.volume = volume;
    this.updateTracks({ volume })
  }
}

const atmospheres = new HowlerChannel({ volume: .3 });
atmospheres.addTrack('dark', { src: require("@/assets/atmosphere/very-low-note-by-kevin-macleod-from-filmmusic-io.mp3"), loop: true })
atmospheres.addTrack('anxiety', { src: require("@/assets/atmosphere/anxiety-by-kevin-macleod-from-filmmusic-io.mp3"), loop: true })

const effects = new HowlerChannel({ volume: .3 });
effects.addTrack('pickup', { src: require("@/assets/kenny_rpg/handleSmallLeather2.ogg") })
effects.addTrack('door', { src: require("@/assets/kenny_rpg/doorClose_2.ogg") })
effects.addTrack('metalClick', { src: require("@/assets/kenny_rpg/metalClick.ogg") })

export {
  atmospheres,
  effects
}
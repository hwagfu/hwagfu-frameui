// Sound for the logos: MP3s rendered ahead of time, one module per cue,
// fetched only by pages that use it. The logos themselves stay plain Server
// Components; `LogoSound` is the client part that plays a cue in step with a
// logo's animation.
export { playLogoSound, preloadLogoSound, type LogoSoundCue, type LogoSoundOptions } from "./_logo-sound-player"
export { LogoSound, type LogoSoundProps } from "./_logo-sound-client"

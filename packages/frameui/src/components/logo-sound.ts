// Sound for the logos: MP3s rendered ahead of time, one module per cue,
// fetched only by pages that use it. The logos themselves stay plain Server
// Components; `LogoSound` plays a cue in step with a logo's animation and
// `LogoIntro` runs the logo before the film on the watch page.
export {
  playLogoSound,
  preloadLogoSound,
  stopLogoSound,
  type LogoSoundCue,
  type LogoSoundOptions,
} from "./_logo-sound-player"
export { LogoSound, type LogoSoundProps } from "./_logo-sound-client"
export { LogoIntro, type LogoIntroProps } from "./_logo-intro-client"

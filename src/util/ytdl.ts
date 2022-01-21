import * as ytdl from "ytdl-core";

export function createAudioStream(
  youtubeVideoId: string,
  opts: { onInfo?: (info: ytdl.videoInfo) => void } = {}
) {
  const ytdlStream = ytdl(youtubeVideoId);
  if (opts.onInfo) {
    ytdlStream.on("info", opts.onInfo);
  }
  return ytdlStream;
}

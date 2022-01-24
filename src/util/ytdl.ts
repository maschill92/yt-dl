import { Readable } from "stream";
import ytdl from "ytdl-core";
import ytpl from "ytpl";

export function fetchVideoInfo(videoId: string): Promise<ytdl.videoInfo> {
  return ytdl.getInfo(videoId);
}

export function createVideoStreamFromInfo(videoInfo: ytdl.videoInfo): Readable {
  return ytdl.downloadFromInfo(videoInfo);
}

export function createVideoStreamFromVideoId(videoId: string): Readable {
  return ytdl(videoId);
}

export function fetchPlaylistInfo(playlistId: string): Promise<ytpl.Result> {
  return ytpl(playlistId);
}

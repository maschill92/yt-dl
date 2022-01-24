import { Command, Flags } from "@oclif/core";
import {
  fetchPlaylistInfo,
  createVideoStreamFromVideoId,
} from "../util/ytdl";
import { convertInputStreamToFile } from "../util/ffmpeg";
import ux, { cli } from "cli-ux";
import { YoutubePlaylistVideoTemplatedFilePath } from "../util/VideoFilePathNormalizer";

export default class Playlist extends Command {
  static description = "Download all the videos in a youtube playlist.";

  static examples = [
    "<%= config.bin %> <%= command.id %> https://www.youtube.com/playlist?list=PL062A00534D28BD25",
    "<%= config.bin %> <%= command.id %> PLi9drqWffJ9FWBo7ZVOiaVy0UQQEm4IbP -f '<$= author $>-<$= title $>.mp3'",
  ];

  static args = [
    { name: "id", description: "ID or link to a YouTube playlist" },
  ];

  static flags = {
    file: Flags.string({
      char: "f",
      name: "file",
      required: false,
      description:
        "File name template for each video in the playlist. Template properties are 'id', 'title', 'author' 'playlist', and 'playlistId'. Note that you must supply an extension. The application will do it's best to convert to the request format.",
      default: "<$ title $>.mp3",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Playlist);
    const { id: playlistId } = args;
    const { file: fileNameTemplate } = flags;

    const playlistInfo = await fetchPlaylistInfo(playlistId);

    this.log(
      'Downloading from playlist "%s" (ID: %s)',
      playlistInfo.title,
      playlistInfo.id
    );

    // use for loop to allow early breakout?

    await playlistInfo.items.reduce(
      async (promiseChain, playlistVideo, idx, arr) => {
        // await recieved promise to ensure the next video is downloaded only after the previous video
        await promiseChain;

        const templatedPath = new YoutubePlaylistVideoTemplatedFilePath(
          fileNameTemplate,
          {
            id: playlistVideo.id,
            title: playlistVideo.title,
            author: playlistVideo.author.name,
            playlist: playlistInfo.title,
            playlistId: playlistInfo.id,
          }
        );

        cli.action.start(`Downloading ${templatedPath.name}`);

        try {
          const youtubeVideoStream = createVideoStreamFromVideoId(
            playlistVideo.id
          );
          await convertInputStreamToFile(youtubeVideoStream, {
            file: templatedPath,
          });
          cli.action.stop();
        } catch (err) {
          cli.action.stop();
          this.warn(
            `Failed to download ${templatedPath.name}. Video ID ${playlistVideo.id}.`
          );
          this.warn(err as string | Error);
          const continueParsing = await cli.confirm(
            "Continue processing playlist?"
          );
        }
      },
      Promise.resolve()
    );
  }
}

import { convertInputStreamToFile } from "../util/ffmpeg";
import { YoutubeVideoTemplatedFilePath } from "../util/templated-file-path";
import { createVideoStreamFromInfo, fetchVideoInfo } from "../util/ytdl";
import { Command, Flags } from "@oclif/core";
import { cli } from "cli-ux";

export default class Video extends Command {
  static description = "Download a youtube video";

  static examples = [
    "<%= config.bin %> <%= command.id %> https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "<%= config.bin %> <%= command.id %> djV11Xbc914 -f 'path/to/<$= author $>-<$= title $>.mp3'",
  ];

  static args = [{ name: "id", description: "ID or link to a YouTube video" }];

  static flags = {
    file: Flags.string({
      name: "file",
      char: "f",
      required: false,
      description:
        "The output file name or template. Template properties are 'id', 'title', and 'author'. Note that you must supply an extension. The application will do it's best to convert to the request format.",
      default: "<$= title $>.mp3",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Video);
    const { id } = args;
    const { file } = flags;

    const videoInfo = await fetchVideoInfo(id);
    const {
      videoDetails: { author, videoId, title },
    } = videoInfo;

    const templatedPath = new YoutubeVideoTemplatedFilePath(file, {
      id: videoId,
      title: title,
      author: author.name,
    });

    cli.action.start("Downloading %s", title);
    const youtubeVideoStream = createVideoStreamFromInfo(videoInfo);
    await convertInputStreamToFile(youtubeVideoStream, { file: templatedPath });

    cli.action.stop();
  }
}

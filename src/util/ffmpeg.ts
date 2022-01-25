import { Readable } from "stream";
import fs from "fs";
import { TemplatedFilePath } from "./templated-file-path";

export async function convertInputStreamToFile(
  inputStream: Readable,
  opts: {
    file: TemplatedFilePath;
    onProgress?: (progressData: any) => void;
  }
): Promise<void> {
  const ffmpeg = await importFluentFfmpeg();
  const ffmpegStream = ffmpeg(inputStream);

  if (opts.onProgress) {
    // progress is broken.
    ffmpegStream.on("progress", opts.onProgress);
  }

  await new Promise<void>((resolve, reject) => {
    ffmpegStream
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      })
      .saveToFile(opts.file.tmpFile);
  });
  fs.mkdirSync(opts.file.dir, { recursive: true });
  fs.copyFileSync(opts.file.tmpFile, opts.file.fullPath);
}

async function importFluentFfmpeg() {
  const [ffmpegInstaller, fluentFfmpeg] = await Promise.all([
    import("@ffmpeg-installer/ffmpeg"),
    import("fluent-ffmpeg"),
  ]);

  fluentFfmpeg.setFfmpegPath(ffmpegInstaller.path);

  return fluentFfmpeg.default;
}

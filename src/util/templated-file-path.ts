import path, { ParsedPath } from "path";
import sanitizeFilename from "sanitize-filename";
import tmp from "tmp";
import { renderTemplate } from "./template";

export abstract class TemplatedFilePath {
  private readonly _templateData: Record<string, string>;
  private readonly _parsedPath: ParsedPath;
  private readonly _path: string;
  private _tmpFile: string | null = null;

  constructor(filePathTemplate: string, templateData: Record<string, string>) {
    this._templateData = templateData;
    const parsedTemplatePath = path.parse(path.normalize(filePathTemplate));

    const renderedDir = parsedTemplatePath.dir
      .split(path.sep)
      .map((folder) => this.renderAndSanitizedPathPart(folder))
      .join(path.sep);

    const renderedBase = this.renderAndSanitizedPathPart(
      parsedTemplatePath.base
    );
    this._path = path.join(renderedDir, renderedBase);
    this._parsedPath = path.parse(this._path);
  }

  /**
   * The full directory path such as '/home/user/dir/audio.mp3' or 'c:\path\dir\audio.mp3'
   */
  get fullPath(): string {
    return this._path;
  }

  /**
   * The file name including extension (if any) such as 'audo.mp3'
   */
  get name(): string {
    return this._parsedPath.base;
  }

  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  get dir(): string {
    return this._parsedPath.dir;
  }

  get tmpFile(): string {
    if (this._tmpFile !== null) {
      return this._tmpFile;
    }

    this._tmpFile = tmp.fileSync({ template: `XXXXXX-${this.name}` }).name;
    return this._tmpFile;
  }

  private renderAndSanitizedPathPart(pathPart: string): string {
    const rendered = renderTemplate(pathPart, this._templateData);
    return sanitizeFilename(rendered);
  }
}

interface YoutubeVideoTemplateData extends Record<string, string> {
  id: string;
  title: string;
  author: string;
}
interface YoutubePlaylistVideoTemplateData extends YoutubeVideoTemplateData {
  playlist: string;
  playlistId: string;
}

export class YoutubePlaylistVideoTemplatedFilePath extends TemplatedFilePath {
  constructor(
    fileNameTemplate: string,
    templateData: YoutubePlaylistVideoTemplateData
  ) {
    super(fileNameTemplate, templateData);
  }
}
export class YoutubeVideoTemplatedFilePath extends TemplatedFilePath {
  constructor(
    fileNameTemplate: string,
    templateData: YoutubeVideoTemplateData
  ) {
    super(fileNameTemplate, templateData);
  }
}

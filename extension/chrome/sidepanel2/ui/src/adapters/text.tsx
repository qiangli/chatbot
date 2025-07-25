import {
  AttachmentAdapter,
  PendingAttachment,
  CompleteAttachment,
} from "@assistant-ui/react";

export class TextAdapter implements AttachmentAdapter {
  public accept =
    "text/plain,text/html,text/markdown,text/csv,text/xml,text/json,text/css";

  public async add(state: { file: File }): Promise<PendingAttachment> {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (state.file.size > maxSize) {
      throw new Error("Image size exceeds 10MB limit");
    }

    return {
      id: state.file.name,
      type: "document",
      name: state.file.name,
      contentType: state.file.type,
      file: state.file,
      status: { type: "requires-action", reason: "composer-send" },
    };
  }

  public async send(
    attachment: PendingAttachment,
  ): Promise<CompleteAttachment> {
    return {
      ...attachment,
      status: { type: "complete" },
      content: [
        {
          type: "text",
          text: `<attachment name=${attachment.name}>\n${await getFileText(attachment.file)}\n</attachment>`,
        },
      ],
    };
  }

  public async remove() {
    // noop
  }
}

const getFileText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);

    reader.readAsText(file);
  });

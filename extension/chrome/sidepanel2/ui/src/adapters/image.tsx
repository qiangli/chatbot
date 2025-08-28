import {
  AttachmentAdapter,
  PendingAttachment,
  CompleteAttachment,
} from "@assistant-ui/react"

// https://www.assistant-ui.com/docs/guides/Attachments
export class ImageAdapter implements AttachmentAdapter {
  // public accept = "image/jpeg,image/png,image/webp,image/gif";
  public accept = "image/*"

  async add(state: { file: File }): Promise<PendingAttachment> {
    // Validate file size (e.g., 10MB limit for most LLMs)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (state.file.size > maxSize) {
      throw new Error("Image size exceeds 10MB limit")
    }

    return {
      id: crypto.randomUUID(),
      type: "image",
      name: state.file.name,
      contentType: state.file.type,
      file: state.file,
      status: { type: "requires-action", reason: "composer-send" },
    }
  }

  async send(attachment: PendingAttachment): Promise<CompleteAttachment> {
    const base64 = await this.fileToBase64(attachment.file)
    return {
      ...attachment,
      status: { type: "complete" },
      content: [
        {
          type: "image",
          image: base64,
        },
      ],
    }
  }

  public async remove() {
    // no op
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        // FileReader result is already a data URL
        resolve(reader.result as string)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }
}

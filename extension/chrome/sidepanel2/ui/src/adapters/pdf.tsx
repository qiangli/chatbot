import {
  AttachmentAdapter,
  PendingAttachment,
  CompleteAttachment,
} from "@assistant-ui/react"

// https://www.assistant-ui.com/docs/guides/Attachments
export class PDFAdapter implements AttachmentAdapter {
  public accept = "application/pdf"

  async add(state: { file: File }): Promise<PendingAttachment> {
    const maxSize = 10 * 1024 * 1024 // 10MB limit
    if (state.file.size > maxSize) {
      throw new Error("PDF size exceeds 10MB limit")
    }

    return {
      id: crypto.randomUUID(),
      type: "document",
      name: state.file.name,
      contentType: state.file.type,
      file: state.file,
      status: { type: "requires-action", reason: "composer-send" },
    }
  }

  async send(attachment: PendingAttachment): Promise<CompleteAttachment> {
    // Option 1: Extract text from PDF (requires pdf parsing library)
    // const text = await this.extractTextFromPDF(attachment.file);

    // Option 2: Convert to base64 for API processing
    const base64 = await this.fileToBase64(attachment.file)

    return {
      ...attachment,
      status: { type: "complete" },
      content: [
        {
          type: "text",
          text: base64,
        },
      ],
    }
  }

  public async remove(): Promise<void> {
    // no opt
  }

  private async fileToBase64(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    let binary = ""
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte)
    })
    return btoa(binary)
  }

  // // Optional: Extract text from PDF using a library like pdf.js
  // private async extractTextFromPDF(file: File): Promise<string> {
  //   // Implementation would use pdf.js or similar
  //   // This is a placeholder
  //   return "Extracted PDF text content";
  // }
}

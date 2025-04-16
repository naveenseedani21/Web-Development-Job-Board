declare module 'pdf-parse' {
    import { Buffer } from 'buffer';
  
    interface PDFPageProxy {
      getTextContent(): Promise<any>;
    }
  
    interface PDFDocumentProxy {
      numPages: number;
      getPage(pageNumber: number): Promise<PDFPageProxy>;
    }
  
    export interface PDFParseData {
      numpages: number;
      numrender: number;
      info: Record<string, any>;
      metadata: any;
      version: string;
      text: string;
    }
  
    export default function pdf(dataBuffer: Buffer): Promise<PDFParseData>;
  }
  
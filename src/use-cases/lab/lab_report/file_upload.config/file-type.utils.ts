import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';

const mimeToTypeMap = {
  'application/pdf': FileType.PDF,
  'application/msword': FileType.DOC,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    FileType.DOCX,
  'application/zip': FileType.ZIP,
  'application/x-zip-compressed': FileType.ZIP,
};

export function mimeToFileType(mimeType: string): FileType {
  const fileType = mimeToTypeMap[mimeType];
  if (!fileType) {
    throw new Error(`Unsupported MIME type: ${mimeType}`);
  }
  return fileType;
}

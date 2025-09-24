export interface Props {
  className?: string
  value: string
  readOnly?: boolean
  onChange?: (content: string) => void
  onUploadImage?: (mediaUrl: string) => void
  onDeleteImage?: (mediaUrl: string) => void
}

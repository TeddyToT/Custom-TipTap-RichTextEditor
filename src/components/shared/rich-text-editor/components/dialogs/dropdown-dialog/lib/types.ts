export type Option = {
  label: string
  value: string
  url: string
}

export type DropdownDialogProps = {
  onConfirm: (data: { placeholder: string; options: Option[] }) => void
  onCancel: () => void
}

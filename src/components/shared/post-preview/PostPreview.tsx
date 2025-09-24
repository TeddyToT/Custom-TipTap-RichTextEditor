import type { Props } from './lib/types'
import './PostPreview.css'

const PostPreview: React.FC<Props> = (props) => {
  // Props
  const { title, content } = props

  return (
    <div className='animate-fadeIn '>
      <div className='preview-container min-h-[400px]'>
        {/* Title */}
        {title && <h1 className='mb-6 text-2xl font-bold text-gray-700'>{title || 'Không có tiêu đề'}</h1>}

        {/* Content */}
        <div className='post-preview prose mb-8 max-w-none' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

export default PostPreview

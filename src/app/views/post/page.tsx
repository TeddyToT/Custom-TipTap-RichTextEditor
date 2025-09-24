import { Card, CardContent } from '../../../components/ui/card'
import { PostCreationForm } from './components'

const PostCreation = () => {
  return (
    <Card className='mx-auto mt-4 max-w-7xl'>
      <CardContent>
        <PostCreationForm />
      </CardContent>
    </Card>
  )
}

export default PostCreation

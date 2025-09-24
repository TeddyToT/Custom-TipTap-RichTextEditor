import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '../../../../../components/ui/form'
import { PostPreview, RichTextEditor } from '../../../../../components/shared'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs'
import type { PostCreationFormType } from './lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_POST_CREATION_FORM_VALUES, POST_CREATION_FORM_SCHEMA } from './lib/constants'

const PostCreationForm = () => {
  const [imageUrlList, setImageUrlList] = useState<string[]>([])

  const form = useForm<PostCreationFormType>({
    resolver: zodResolver(POST_CREATION_FORM_SCHEMA),
    defaultValues: DEFAULT_POST_CREATION_FORM_VALUES
  })

  const title = form.watch('title')

  return (
    <div className='p-2'>
      <Form {...form}>
        <form>
          <div className='space-y-8'>

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <Tabs defaultValue='editor' className='w-full'>
                    <TabsList className='grid h-12 w-full grid-cols-2 bg-gray-100 p-1'>
                      <TabsTrigger value='editor' className='rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm'>
                        <span className='text-base'>Soạn thảo</span>
                      </TabsTrigger>
                      <TabsTrigger value='preview' className='rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm'>
                        <span className='text-base'>Xem trước</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value='editor' className='pt-4'>
                      <div className='overflow-hidden rounded-lgshadow-sm transition-shadow hover:shadow-md'>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          onUploadImage={(url) => setImageUrlList((prev) => [...prev, url])}
                          onDeleteImage={(url) => setImageUrlList((prev) => prev.filter((u) => u !== url))}
                        />
                      </div>
                      <FormMessage className='mt-1 text-xs text-red-500' />
                    </TabsContent>

                    <TabsContent value='preview' className='pt-4'>
                      <div className='max-w-6xl mx-auto preview-container min-h-[300px] rounded-lg border border-gray-200 bg-gray-50 p-6'>
                        <PostPreview title={title} content={field.value} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PostCreationForm
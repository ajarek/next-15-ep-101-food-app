'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { z } from 'zod'
import { createRecipe } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import { toast } from "sonner";

const formSchema = z.object({
  
  name: z.string().min(1, 'Name is required'),
  image: z.string().min(1, 'Image is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  ingredients: z.string().min(1, 'Ingredients are required'),
 
})

type RecipeFormValues = z.infer<typeof formSchema>;

const RecipeForm = () => {
  const form = useForm<RecipeFormValues>({
    // zodResolver's types can be incompatible with the useForm generic in some lib versions
    // cast to Resolver<RecipeFormValues> so the control and submit handler types align
    resolver: zodResolver(formSchema) as unknown as Resolver<RecipeFormValues>,
    defaultValues: {
     name: '',
      image: '',
      price: 0,
     ingredients: ''
      
    },
  });

  const onSubmit: (values: RecipeFormValues) => Promise<void> = async (values) => {
    try {
      await createRecipe(values);
      toast.success('Recipe created successfully');
      form.reset();
    } catch (err) {
      console.error('createRecipe error', err);
      toast.error('Failed to create recipe');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-xl space-y-4 border-2 shadow-xl gap-4 p-4 rounded-xl mt-4'
      >
         <h1 className='text-2xl text-center font-bold'>Add Recipe</h1>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Recipe Name'
                  {...field}
                />
              </FormControl>
              <FormDescription>Name must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='https://example.com/image.jpg'
                  {...field}
                />
              </FormControl>
              <FormDescription>Image URL must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='20'
                  {...field}
                />
              </FormControl>
              <FormDescription>price must correct.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ingredients'
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Textarea
                  placeholder="List the ingredients of the dish"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Adding...' : 'Add Recipe'}
        </Button>
      </form>
     
    </Form>
  )
}

export default RecipeForm

import { z } from 'zod';
import { useZodForm } from '../../../hooks/use-zod-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export function UploadModpackForm() {
	const schema = z.object({
		apiKey: z.string().min(3),
		displayName: z.string().min(3),
		image: z.string().min(3),
	})

	const form = useZodForm({
		schema,
		handler: async (values) => {
			const response = await window.api.invoke('upload:modpack', values);

			if (response) {
				alert("Modpack enviado com sucesso!");
			} else {
				alert("Erro ao enviar modpack!");
			}
		},
	});

	return (
		<Form {...form} className='w-full flex flex-col gap-4'>
			<FormField
				control={form.control}
				name="apiKey"
				render={({ field }) => (
					<FormItem className="grid gap-2">
						<FormLabel>Chave da API</FormLabel>
						<FormControl>
							<Input type="text" placeholder="sk-..." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem className="grid gap-2">
							<FormLabel>Nome do modpack</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Quality of Life" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem className="grid gap-2">
							<FormLabel>Imagem do modpack</FormLabel>
							<FormControl>
								<Input type="text" placeholder="https://example.com/image.png" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>Selecionar manifest</Button>
		</Form>
	)
}
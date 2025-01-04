import { z } from 'zod';
import { useZodForm } from '../../../hooks/use-zod-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../ui/select';
import { useModpacks } from '../../../hooks/api/use-modpacks';

export function UploadModpackVersionForm() {
	const schema = z.object({
		apiKey: z.string().min(3),
		modpackId: z.string().min(3),
		versionTag: z.string().min(3),
	})

	const form = useZodForm({
		schema,
		handler: async (values) => {
			const response = await window.api.invoke('upload:version', values);

			if (response) {
				alert("Nova versão enviada com sucesso!");
			} else {
				alert("Erro ao enviar nova versão!");
			}
		}
	});

	const { modpacks, isLoading } = useModpacks();

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
					name="modpackId"
					render={({ field }) => (
						<FormItem className="grid gap-2">
							<FormLabel>ID do modpack</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Selecione um modpack" />
									</SelectTrigger>
									<SelectContent>
										{isLoading ? (
											<SelectItem value="loading" disabled>Carregando...</SelectItem>
										) : (
											modpacks.map((modpack) => (
												<SelectItem key={modpack.id} value={modpack.id}>
													{modpack.displayName}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="versionTag"
					render={({ field }) => (
						<FormItem className="grid gap-2">
							<FormLabel>Tag da versão</FormLabel>
							<FormControl>
								<Input type="text" placeholder="1.1.0" {...field} />
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
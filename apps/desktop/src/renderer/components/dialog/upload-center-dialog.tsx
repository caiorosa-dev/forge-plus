import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { UploadModpackForm } from './forms/upload-modpack-form';
import { UploadModpackVersionForm } from './forms/upload-modpack-version-form';

export function UploadCenterDialog({ children }: { children: React.ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Central de uploads</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Esta área é destinada para o upload de modpacks para o servidor, somente usuários com acesso ao servidor são permitidos.
				</DialogDescription>
				<Tabs defaultValue="modpack">
					<TabsList>
						<TabsTrigger value="modpack">Novo Modpack</TabsTrigger>
						<TabsTrigger value="version">Nova Versão</TabsTrigger>
					</TabsList>
					<TabsContent value="modpack">
						<UploadModpackForm />
					</TabsContent>
					<TabsContent value="version">
						<UploadModpackVersionForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}
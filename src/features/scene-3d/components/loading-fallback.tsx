export function LoadingFallback() {
	return (
		<section
			data-testid="voxel-studio-loading"
			className="flex h-full w-full flex-col items-center justify-center gap-4"
		>
			<p className="text-muted-foreground">Carregando estúdio 3D…</p>
		</section>
	);
}

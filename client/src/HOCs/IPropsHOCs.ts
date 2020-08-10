export default interface IPropsTQHOCs {
	component: React.ComponentType;
	path: string | string[] | undefined;
	needsRenderTime: boolean;
	redirectTo: string;
	exact?: boolean;
}
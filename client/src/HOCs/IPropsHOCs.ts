export default interface IPropsTQHOCs {
	component: React.ComponentType;
	path: string | string[] | undefined;
	redirectTo: string;
	exact?: boolean;
}

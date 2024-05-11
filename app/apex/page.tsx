import { CardWithForm } from "@/components/form";
import { ApexForm } from "@/components/playerstats";
import ReactHookForm from "@/components/reacthookform";
import TradForm from "@/components/traditionalform";
import ZodReactHookForm from "@/components/zodform";

export default function ApexPage() {
	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<div className="flex flex-col items-start">
				<div className="flex-1 space-x-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">
						Apex Legends
					</h1>
				</div>
			</div>
			<hr className="my-8" />
			<div className="flex flex-col">
				<TradForm />
				<ReactHookForm />
				<ZodReactHookForm />
			</div>
		</div>
	);
}

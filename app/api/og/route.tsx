import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const interBold = fetch(
	new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
	try {
		const fontBold = await interBold;

		const { searchParams } = req.nextUrl;
		const title = searchParams.get("title");

		if (!title) {
			return new Response("No title provided", { status: 500 });
		}

		const heading =
			title.length > 140 ? `${title.substring(0, 140)}...` : title;

		return new ImageResponse(
			(
				<div tw="flex relative flex-col p-12 w-full h-full text-black bg-gray-100">
					<div tw="flex flex-col h-full items-center">
						<p tw="font-bold text-2xl break-words mt-8">Karl Dev Blog</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="250"
							height="250"
							viewBox="0 0 623.65002 623.63"
							xmlnsXlink="http://www.w3.org/1999/xlink">
							<path
								d="m311.82001,623.63c-7.10999,0-14.20001-.23999-21.06-.70001-7.09-.46997-14.19-1.19-21.12-2.14001-3.04999-.40997-5.81-.82001-8.44-1.25-7.81-1.27002-15.75999-2.88-23.62-4.79999-2.69-.65002-5.33-1.33002-7.83-2.03003-.88-.22998-1.78-.47998-2.67-.72998-3.8-1.07001-7.48-2.17999-10.92-3.29999-.22-.06-.48-.15002-.74001-.22998-3.11-1-6.35001-2.10999-9.62-3.29999-2.75999-1-5.56-2.06-8.56-3.23999-6.25-2.46002-12.50999-5.17999-18.61-8.07001-2.53999-1.19-5.19-2.5-8.11-3.97998-.52-.26001-1.05-.53003-1.57001-.79999l-.60001-.31c-34.28-17.79999-64.67-41.54999-90.31-70.58002C27.72,461.19,0,387.89999,0,311.81c0-83.29001,32.44-161.60001,91.33-220.49001C150.22,32.43,228.53,0,311.82001,0s161.60001,32.43,220.5,91.32c58.90002,58.88999,91.33002,137.19999,91.33002,220.49,0,48.94-11.02002,95.79001-32.73999,139.25-20.71997,41.44-51.04999,78.42999-87.73001,106.96002-8.62,6.71997-17.70001,13.03998-26.98001,18.79999-9.41,5.85999-19.28,11.28998-29.34,16.13-2.23999,1.08002-4.64001,2.20001-7.56,3.51001l-.28.12c-.35999.15997-.72.32001-1.07999.46997-2.17999.96997-4.39999,1.91998-6.59,2.82001l-.98999.41998c-.62.26001-1.20001.5-1.78.71997-7.42999,3-14.92001,5.70001-22.26001,8.01001-.57999.20001-1.17001.38-1.76999.56l-.51999.15997c-6.10001,1.89001-12.51999,3.65002-19.04999,5.21997-23.79001,5.73999-48.41,8.65002-73.16,8.65002v.02002h0l-.00006.00006Zm0-621.63c-82.76001,0-160.56,32.22-219.08,90.74C34.23,151.25,2,229.05,2,311.81c0,75.60999,27.54,148.41998,77.55,205.02997,25.48,28.84003,55.67,52.44,89.73,70.12l.60001.31c.50999.27002,1.03.53003,1.55.78998,2.91,1.47998,5.53999,2.78003,8.06,3.96002,6.06,2.87,12.28,5.57001,18.49001,8.01001,2.98,1.17999,5.75999,2.22998,8.5,3.21997,3.25,1.17999,6.47,2.28003,9.57001,3.28003.24001.08002.47.15002.7.21997,3.45,1.12,7.09,2.21997,10.87,3.28998.87.25,1.75999.5,2.64.72998,2.5.69,5.11,1.37,7.78,2.02002,7.82001,1.90997,15.71001,3.52002,23.48001,4.77002,2.60999.42999,5.35001.84003,8.38,1.25,6.88.94,13.94,1.65997,20.98001,2.12,6.82001.46002,13.85999.70001,20.92001.70001,24.60001,0,49.04999-2.89001,72.70001-8.59003,6.48999-1.56,12.85999-3.31,18.94-5.19l.51999-.15997c.57999-.17999,1.14999-.34998,1.73001-.54999,7.31-2.29999,14.76001-4.97998,22.14999-7.96997.57999-.22998,1.14001-.46002,1.70001-.69l1.23001-.51001c2.10999-.87,4.25-1.78998,6.37-2.72998.37-.15997.70999-.31,1.06-.46997l.28-.12c2.89999-1.31,5.29001-2.41998,7.51001-3.48999,10-4.81,19.81-10.20001,29.16-16.03003,9.22-5.71997,18.23999-12.01001,26.81-18.67999,36.44-28.35999,66.58002-65.10999,87.16998-106.28,21.58002-43.17001,32.52997-89.72,32.52997-138.35001,0-82.76001-32.22998-160.56-90.75-219.07001C472.39001,34.22,394.57999,2,311.82001,2Z"
								fill="#dadbdc"
							/>
							<polygon
								points="273.97 426.13 349.73999 444.28 340.95001 338.10001 274.03 343.64001 273.97 426.13"
								fill="#f3a3a6"
							/>
							<circle
								cx="328.17001"
								cy="294.73999"
								r="73.76001"
								fill="#f3a3a6"
							/>
							<path
								d="m406.01999,608.08002c-.59.20001-1.17001.38-1.76001.56-.17001.04999-.34.10999-.51001.15997-6.25,1.94-12.59,3.66998-19,5.21002-23.38998,5.64001-47.82001,8.62-72.92999,8.62-7.06,0-14.06-.22998-20.98999-.70001-7.09-.46997-14.10999-1.17999-21.04999-2.13-2.82001-.38-5.62-.78998-8.41-1.25-7.95-1.28998-15.81-2.90002-23.55-4.78998-2.61-.63-5.21001-1.29999-7.8-2.02002-.89-.22998-1.78-.47998-2.66-.72998-3.64999-1.03003-7.28-2.12-10.88-3.28998-.24001-.07001-.49001-.15002-.73-.22998-3.22-1.03998-6.42-2.14001-9.60001-3.28998-2.86-1.03003-5.7-2.10999-8.53-3.22998-6.28999-2.47998-12.47-5.15997-18.55-8.03998l2.34-10.59998,8.11-36.72003,17.61-79.78,17.8-80.62,46.77,1.29999h.01999l2.28.07001,71.13,1.98001,31.12.87,29.76999,218.64996h0l.00003-.00006Z"
								fill="#dadbdc"
							/>
							<path
								d="m475.67999,575.96997c-9.42001,5.87-19.19,11.23999-29.25,16.08002-2.48999,1.20001-5.01001,2.35999-7.54001,3.5-.45001.20001-.89001.40002-1.34.59003-2.17999.96997-4.37,1.90997-6.57999,2.82001h0l-.98999.41998c-.57999.23999-1.16.47998-1.75.71002-7.26999,2.94-14.67001,5.62-22.20001,7.98999-.59.20001-1.17001.38-1.76001.56l-65.23999-166.92999-4.41-11.26999-12.29999-31.48999-4.07999-10.42999,26.92999.42001,31.09.48999c28.22,3.60999,51.62,23.57999,59.63,50.87l39.79999,135.66998h-.01001v-.00006Z"
								fill="#dadbdc"
							/>
							<path
								d="m276.42999,328.44c2.62-.44,5.23999-.89001,7.85999-1.32999.62-14.01001,1.97-29.63998,12.45999-38.95001,5.78-5.13,14.14001-8.12,17.01001-15.29999,2.38-5.95001.16-13.26001,3.48001-18.74001,3.48999-5.77,11.29001-6.8,18.03-7.22,10.54999-.64999,21.29001-1.28999,31.56,1.21001,10.26999,2.50999,20.17999,8.69,24.56,18.31,1.35001,2.95999,2.13,6.14999,2.91,9.31,2.63,10.69,6.66,31.03,6.66,31.03,0,0,.78-4.20999,3-12.39999,4.53-6.48001,10.06-12.45999,12.72-19.89999,3.20001-8.95999,1.79001-18.97-1.35001-27.94-7.13-20.41-23.67001-37.66-44.26999-44.22-20.60999-6.55-40.10001-10.25999-55.5,4.92-2.89001,2.85001-5.48999,6.03-8.79001,8.39-6.10001,4.37-13.89001,5.47-20.76999,8.49001-15.31,6.72-29.14999,22.88-32.60001,39.24001-3.45,16.35999-1.64999,33.31.17,49.94,1.57001,14.34,8.37999,30.32999,20.31999,38.42999.48999-7.34.98001-14.67001,1.47-22.01001l1.06-1.25h.01001v-.01001Z"
								fill="#2f2e43"
							/>
							<path
								d="m317.26001,397.39999l-.72,1.17999-20.13998,32.92001-29.85999,48.84-6.04999,9.89001-22.06,36.07999s-7.16,10.07001-19.24001,22.97998l-.03999.03998c-4.39,4.67999-9.42,9.72998-14.99001,14.79999-.03999.04999-.08.09003-.13.12-6.8,6.20001-14.39999,12.42999-22.62,18.08002-3.38,2.33002-6.86,4.54999-10.42,6.63-.73-.35999-1.45-.73999-2.17-1.10999-34.22-17.77002-64.72-41.71002-90.02-70.34998,26.41-42.17999,78.67001-89.48001,112.33999-117.64999,19.05-15.95001,44.5-21.95999,68.66-16.17999l11.89999,2.84,2.29999.54999,43.26001,10.34h-.00003Z"
								fill="#dadbdc"
							/>
							<path
								d="m411.22,387.25c-12.97-4.67001-47.29999-4.69-62.70001.51001-2.98999,1.01001-4.79999,4.04999-4.28,7.16l.60999,3.69c-1.34-.20001-2.64999-.57999-3.89001-1.14999-3.67001-1.67999-10.89999-3.95999-18.20001-.32001-5.10001,2.54001-8.69,7.32999-9.95001,12.89999-3.01001,13.32001,4.57999,20.69,4.57999,20.69l10.10999,9.48999c8.47,7.94,17.70999,15.01999,27.57999,21.12l.20001.12-3.60001-21.66c-2.03,3.57001-6.62,4.73999-10.10999,2.57999-8.82001-5.45999-23.23001-16.39999-21.48001-28.82001,1.22-8.66,6.03-10.5,10.64999-10.10999,5.17001.44,9.67999,3.69,11.89001,8.38.53,1.12,1.39999,2.04001,2.48001,2.64001l2.60001,1.42001,7.62,45.91c.34,2.06,1.66,3.84,3.53,4.76001,17.92001,8.79001,37.26001,4.23001,43.95001,2.17999,1.53-.47,2.84-1.48001,3.66-2.85999l1.44-2.39001c.5-.82001.79999-1.75.89999-2.70001l6.64999-66.82001c.29001-2.95001-1.45999-5.70999-4.25-6.72h.01007Z"
								fill="#22c55e"
							/>
							<ellipse
								cx="380.17001"
								cy="390.79999"
								rx="30.13"
								ry="2.84"
								fill="#dedfe0"
							/>
							<path
								id="uuid-add59a10-2c6d-45b5-a06d-26741c0f8cf5-253"
								d="m319.98001,447.72c16.35001-12.51001,22.82001-31.32001,14.45001-42.01001-8.35999-10.69-28.38998-9.22-44.75,3.29999-6.60001,4.91-11.88,11.37-15.37,18.84l-68.56,53.89001,27.22,32.56,64.70001-56.59c8.19-1.47,15.84-4.89999,22.29999-9.98999h.00998Z"
								fill="#f3a3a6"
							/>
							<polygon
								points="274.62 494.54001 247.5 446.84 148.81 493.28 204.03 564.26001 274.62 494.54001"
								fill="#dadbdc"
							/>
							<path
								d="m215.47,461.91s-71.94,52.67001-69.28,52.37997c2.66-.28998,38.13-19.79999,38.13-19.79999l31.14999-32.58002h0v.00003Z"
								fill="#272223"
								opacity=".1"
							/>
						</svg>
						<div tw="flex flex-col flex-1 py-10 items-center">
							<div tw="text-xl uppercase font-bold tracking-tight">
								BLOG POST
							</div>
							<div tw="text-[50px] font-bold break-words text-center">
								{heading}
							</div>
						</div>

						<div tw="flex items-center w-full text-xl justify-between">
							<div tw="flex text-xl">{siteConfig.url}</div>
							<div tw="flex items-center ml-4">{siteConfig.links.github}</div>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: fontBold,
						style: "normal",
						weight: 700,
					},
				],
			}
		);
	} catch (error) {
		return new Response("Failed to generate image", { status: 500 });
	}
}

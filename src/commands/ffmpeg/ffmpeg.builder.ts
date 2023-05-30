export class FfmpegBuilder {
	private inputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	addResolution(width: number, height: number): this {
		this.options.set('-s', `${width}x${height}`);
		return this;
	}

	addInputFilePath(inputPath: string): this {
		this.inputPath = inputPath;
		return this;
	}

	addOutputFilePath(outputPath: string): string[] {
		if (!this.inputPath) {
			throw new Error('Input is not defined');
		}
		const args: string[] = ['-i', this.inputPath];
		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		})
		args.push(outputPath);
		return args;
	}
}
"use client";
import { motion } from "framer-motion";
import rough from "roughjs";
import type { DiagramElement } from "@/core/entities/diagram-element";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { cn } from "@/shared/lib/utils";
import {
	DEFAULT_BOX_HEIGHT,
	DEFAULT_BOX_WIDTH,
	generateShape,
} from "../lib/shape-generators";
import { AnimatedPath } from "./animated-path";

const generator = rough.generator();

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;
const SUB_PATH_DELAY_MS = 40;

export interface WhiteboardCanvasProps {
	elements: DiagramElement[];
	width?: number;
	height?: number;
	className?: string;
}

/** Declarative React counterpart of IWhiteboardDriver: `elements` prop mirrors `render()`, an empty list mirrors `clear()`. */
export function WhiteboardCanvas({
	elements,
	width = DEFAULT_WIDTH,
	height = DEFAULT_HEIGHT,
	className,
}: WhiteboardCanvasProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className={cn("h-auto w-full", className)}
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-label="Diagrama de quadro branco"
		>
			<title>Diagrama de quadro branco</title>
			{elements.map((el) => {
				const shape = generateShape(el);

				if (shape.kind === "text") {
					return (
						<motion.text
							key={el.id}
							x={shape.x}
							y={shape.y}
							initial={prefersReducedMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={
								prefersReducedMotion
									? undefined
									: { duration: 0.4, delay: (el.delayMs ?? 0) / 1000 }
							}
						>
							{shape.label}
						</motion.text>
					);
				}

				let pathIndex = 0;
				const paths = shape.drawables.map((drawable, drawableIndex) =>
					generator.toPaths(drawable).map((pathInfo) => {
						const key = `${el.id}-${drawableIndex}-${pathIndex}`;
						const delayMs = (el.delayMs ?? 0) + pathIndex * SUB_PATH_DELAY_MS;
						pathIndex += 1;
						return (
							<AnimatedPath
								key={key}
								d={pathInfo.d}
								stroke={pathInfo.stroke}
								strokeWidth={pathInfo.strokeWidth}
								fill={pathInfo.fill}
								delayMs={delayMs}
							/>
						);
					}),
				);

				if (!el.label) {
					return paths;
				}

				const labelWidth = el.width ?? DEFAULT_BOX_WIDTH;
				const labelHeight = el.height ?? DEFAULT_BOX_HEIGHT;
				return [
					...paths,
					<motion.text
						key={`${el.id}-label`}
						x={el.x + labelWidth / 2}
						y={el.y + labelHeight / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						initial={prefersReducedMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={
							prefersReducedMotion
								? undefined
								: { duration: 0.4, delay: (el.delayMs ?? 0) / 1000 }
						}
					>
						{el.label}
					</motion.text>,
				];
			})}
		</svg>
	);
}

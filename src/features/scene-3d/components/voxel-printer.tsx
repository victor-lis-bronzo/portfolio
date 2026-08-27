"use client";

// Positioned in Quadrant 2 (North-East / Back-Right)
export const PRINTER_ORIGIN: [number, number, number] = [3, 0, -2.2];

const STAND_FRAME = "#1e293b";
const STAND_TOP = "#475569";
const PRINTER_BASE = "#f1f5f9";
const PRINTER_DARK = "#18181b";
const ROD_METAL = "#94a3b8";
const PEI_GOLD = "#eab308";
const SPOOL_FILAMENT = "#f97316";
const BENCHY_COLOR = "#06b6d4";

export function VoxelPrinter() {
	return (
		<group position={PRINTER_ORIGIN}>
			{/* ================= HEAVY DUTY UTILITY STAND ================= */}
			<group position={[0, 0, 0]}>
				{/* Stand Top */}
				<mesh position={[0, 0.68, 0]}>
					<boxGeometry args={[1.5, 0.06, 1.4]} />
					<meshStandardMaterial color={STAND_TOP} roughness={0.6} />
				</mesh>
				{/* 4 Sturdy Legs */}
				{[
					[-0.65, -0.6],
					[0.65, -0.6],
					[-0.65, 0.6],
					[0.65, 0.6],
				].map(([x, z]) => (
					<mesh key={`stand-leg-${x}-${z}`} position={[x, 0.33, z]}>
						<boxGeometry args={[0.08, 0.64, 0.08]} />
						<meshStandardMaterial
							color={STAND_FRAME}
							metalness={0.7}
							roughness={0.3}
						/>
					</mesh>
				))}
				{/* Bottom Storage Shelf */}
				<mesh position={[0, 0.15, 0]}>
					<boxGeometry args={[1.3, 0.04, 1.2]} />
					<meshStandardMaterial color={STAND_FRAME} metalness={0.6} />
				</mesh>
				{/* Spare Filament Spool Boxes on bottom shelf */}
				<mesh position={[-0.35, 0.28, 0]}>
					<boxGeometry args={[0.26, 0.22, 0.26]} />
					<meshStandardMaterial color="#38bdf8" roughness={0.7} />
				</mesh>
				<mesh position={[0, 0.28, 0]}>
					<boxGeometry args={[0.26, 0.22, 0.26]} />
					<meshStandardMaterial color="#a855f7" roughness={0.7} />
				</mesh>
				<mesh position={[0.35, 0.28, 0]}>
					<boxGeometry args={[0.26, 0.22, 0.26]} />
					<meshStandardMaterial color="#84cc16" roughness={0.7} />
				</mesh>
			</group>

			{/* ================= BAMBU LAB STYLE 3D PRINTER ================= */}
			<group position={[0, 0.71, 0]}>
				{/* Lower Base Chassis */}
				<mesh position={[0, 0.08, 0]}>
					<boxGeometry args={[1.0, 0.16, 1.0]} />
					<meshStandardMaterial color={PRINTER_BASE} roughness={0.3} />
				</mesh>

				{/* 4 Rubber Vibration Feet */}
				{[
					[-0.42, -0.42],
					[0.42, -0.42],
					[-0.42, 0.42],
					[0.42, 0.42],
				].map(([x, z]) => (
					<mesh key={`foot-${x}-${z}`} position={[x, -0.01, z]}>
						<cylinderGeometry args={[0.04, 0.04, 0.02, 10]} />
						<meshStandardMaterial color="#09090b" roughness={0.9} />
					</mesh>
				))}

				{/* Front Status Recess & Brand Stripe */}
				<mesh position={[0, 0.08, 0.502]}>
					<planeGeometry args={[0.8, 0.04]} />
					<meshStandardMaterial color="#0284c7" />
				</mesh>

				{/* Angled Touchscreen UI on front right */}
				<group position={[0.36, 0.18, 0.48]} rotation={[-Math.PI / 6, 0, 0]}>
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[0.2, 0.14, 0.02]} />
						<meshStandardMaterial color={PRINTER_DARK} roughness={0.2} />
					</mesh>
					{/* Screen UI Display */}
					<mesh position={[0, 0, 0.012]}>
						<planeGeometry args={[0.18, 0.12]} />
						<meshStandardMaterial
							color="#090d16"
							emissive="#090d16"
							emissiveIntensity={0.3}
						/>
					</mesh>
					{/* Progress Bar & Status Text Mockup */}
					<mesh position={[-0.01, 0.02, 0.014]}>
						<planeGeometry args={[0.12, 0.015]} />
						<meshStandardMaterial
							color="#22c55e"
							emissive="#22c55e"
							emissiveIntensity={0.8}
						/>
					</mesh>
					<mesh position={[-0.01, -0.02, 0.014]}>
						<planeGeometry args={[0.14, 0.015]} />
						<meshStandardMaterial
							color="#38bdf8"
							emissive="#38bdf8"
							emissiveIntensity={0.6}
						/>
					</mesh>
				</group>

				{/* 4 Aluminum Vertical Corner Extrusions */}
				{[
					[-0.46, -0.46],
					[0.46, -0.46],
					[-0.46, 0.46],
					[0.46, 0.46],
				].map(([x, z]) => (
					<mesh key={`column-${x}-${z}`} position={[x, 0.6, z]}>
						<boxGeometry args={[0.06, 0.9, 0.06]} />
						<meshStandardMaterial
							color={PRINTER_DARK}
							metalness={0.8}
							roughness={0.2}
						/>
					</mesh>
				))}

				{/* Top Gantry Frame */}
				<mesh position={[0, 1.05, 0]}>
					<boxGeometry args={[1.0, 0.06, 1.0]} />
					<meshStandardMaterial color={PRINTER_DARK} metalness={0.7} />
				</mesh>

				{/* Tinted Glass Enclosure Panels */}
				{/* Left Glass Panel */}
				<mesh position={[-0.465, 0.6, 0]}>
					<boxGeometry args={[0.01, 0.84, 0.86]} />
					<meshStandardMaterial
						color="#38bdf8"
						roughness={0.1}
						metalness={0.8}
						transparent
						opacity={0.3}
					/>
				</mesh>
				{/* Right Glass Panel */}
				<mesh position={[0.465, 0.6, 0]}>
					<boxGeometry args={[0.01, 0.84, 0.86]} />
					<meshStandardMaterial
						color="#38bdf8"
						roughness={0.1}
						metalness={0.8}
						transparent
						opacity={0.3}
					/>
				</mesh>
				{/* Top Glass Lid */}
				<mesh position={[0, 1.085, 0]}>
					<boxGeometry args={[0.88, 0.01, 0.88]} />
					<meshStandardMaterial
						color="#38bdf8"
						roughness={0.1}
						metalness={0.8}
						transparent
						opacity={0.35}
					/>
				</mesh>

				{/* Dual Z-Axis Precision Lead Screws */}
				<mesh position={[-0.35, 0.58, -0.4]}>
					<cylinderGeometry args={[0.015, 0.015, 0.82, 10]} />
					<meshStandardMaterial
						color={ROD_METAL}
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
				<mesh position={[0.35, 0.58, -0.4]}>
					<cylinderGeometry args={[0.015, 0.015, 0.82, 10]} />
					<meshStandardMaterial
						color={ROD_METAL}
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>

				{/* Heated Bed Carriage & Gold Textured PEI Plate */}
				<group position={[0, 0.35, 0]}>
					{/* Bed Aluminum Support */}
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[0.76, 0.03, 0.76]} />
						<meshStandardMaterial color="#27272a" metalness={0.8} />
					</mesh>
					{/* Gold PEI Spring Sheet */}
					<mesh position={[0, 0.02, 0]}>
						<boxGeometry args={[0.72, 0.01, 0.72]} />
						<meshStandardMaterial
							color={PEI_GOLD}
							metalness={0.6}
							roughness={0.4}
						/>
					</mesh>
					{/* Bed Alignment Tab */}
					<mesh position={[0, 0.02, 0.38]}>
						<boxGeometry args={[0.15, 0.008, 0.04]} />
						<meshStandardMaterial color={PEI_GOLD} metalness={0.6} />
					</mesh>
				</group>

				{/* ================= 3D PRINT IN PROGRESS: 3D BENCHY ================= */}
				<group position={[0, 0.38, 0]}>
					{/* Hull / Boat Base */}
					<mesh position={[0, 0.04, 0]}>
						<boxGeometry args={[0.18, 0.06, 0.32]} />
						<meshStandardMaterial color={BENCHY_COLOR} roughness={0.4} />
					</mesh>
					{/* Pointed Bow */}
					<mesh position={[0, 0.05, 0.18]}>
						<coneGeometry args={[0.09, 0.08, 4]} />
						<meshStandardMaterial color={BENCHY_COLOR} roughness={0.4} />
					</mesh>
					{/* Cabin / Wheelhouse */}
					<mesh position={[0, 0.11, -0.02]}>
						<boxGeometry args={[0.12, 0.08, 0.14]} />
						<meshStandardMaterial color={BENCHY_COLOR} roughness={0.4} />
					</mesh>
					{/* Roof */}
					<mesh position={[0, 0.16, -0.02]}>
						<boxGeometry args={[0.15, 0.02, 0.17]} />
						<meshStandardMaterial color={BENCHY_COLOR} roughness={0.4} />
					</mesh>
					{/* Cylindrical Smokestack */}
					<mesh position={[0, 0.19, -0.02]}>
						<cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
						<meshStandardMaterial color={BENCHY_COLOR} roughness={0.4} />
					</mesh>
				</group>

				{/* ================= TOOLHEAD & EXTRUDER ASSEMBLY ================= */}
				{/* CoreXY Cross Carbon Rods */}
				<group position={[0, 0.72, 0]}>
					<mesh position={[0, 0, -0.05]}>
						<cylinderGeometry args={[0.012, 0.012, 0.88, 8]} />
						<meshStandardMaterial color="#27272a" roughness={0.3} />
					</mesh>
					<mesh position={[0, 0, 0.05]}>
						<cylinderGeometry args={[0.012, 0.012, 0.88, 8]} />
						<meshStandardMaterial color="#27272a" roughness={0.3} />
					</mesh>

					{/* Toolhead Body right above the Benchy */}
					<group position={[0, 0, 0]}>
						<mesh position={[0, 0, 0]}>
							<boxGeometry args={[0.18, 0.16, 0.18]} />
							<meshStandardMaterial color="#18181b" roughness={0.4} />
						</mesh>
						{/* Front Fan Shroud Accent */}
						<mesh position={[0, 0, 0.092]}>
							<boxGeometry args={[0.12, 0.1, 0.01]} />
							<meshStandardMaterial color="#0284c7" roughness={0.4} />
						</mesh>
						{/* Status LED on Toolhead */}
						<mesh position={[0, 0.05, 0.096]}>
							<sphereGeometry args={[0.015, 8, 8]} />
							<meshStandardMaterial
								color="#22c55e"
								emissive="#22c55e"
								emissiveIntensity={1.5}
							/>
						</mesh>
						{/* Brass Nozzle Tip */}
						<mesh position={[0, -0.1, 0]}>
							<coneGeometry args={[0.025, 0.05, 8]} />
							<meshStandardMaterial
								color="#d97706"
								metalness={0.8}
								roughness={0.2}
							/>
						</mesh>
					</group>
				</group>

				{/* ================= REAR FILAMENT SPOOL & BOWDEN TUBE ================= */}
				<group position={[0, 0.95, -0.58]}>
					{/* Spool Holder Bracket */}
					<mesh position={[0, 0, 0.05]}>
						<boxGeometry args={[0.08, 0.08, 0.12]} />
						<meshStandardMaterial color={PRINTER_DARK} />
					</mesh>
					{/* Spool Flanges (Transparent Plastic) */}
					<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
						<cylinderGeometry args={[0.16, 0.16, 0.12, 16]} />
						<meshStandardMaterial
							color="#cbd5e1"
							transparent
							opacity={0.4}
							roughness={0.2}
						/>
					</mesh>
					{/* Orange PLA Filament Core */}
					<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
						<cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
						<meshStandardMaterial color={SPOOL_FILAMENT} roughness={0.5} />
					</mesh>
				</group>

				{/* PTFE Bowden Guide Tube (Arching from Spool to Toolhead) */}
				<mesh position={[0, 0.95, -0.25]} rotation={[Math.PI / 4, 0, 0]}>
					<cylinderGeometry args={[0.01, 0.01, 0.45, 8]} />
					<meshStandardMaterial
						color="#f8fafc"
						transparent
						opacity={0.8}
						roughness={0.3}
					/>
				</mesh>

				{/* Filament Purge / Poop Bin on side */}
				<mesh position={[-0.56, 0.06, -0.3]}>
					<boxGeometry args={[0.14, 0.12, 0.2]} />
					<meshStandardMaterial color="#0f172a" roughness={0.8} />
				</mesh>
			</group>
		</group>
	);
}

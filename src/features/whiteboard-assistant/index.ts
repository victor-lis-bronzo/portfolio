export type { AssistantPanelProps } from "./components/assistant-panel";
export { AssistantPanel } from "./components/assistant-panel";
export {
	CHAT_ENDPOINT,
	httpAssistantClient,
	useWhiteboardAssistant,
	type WhiteboardAssistant,
} from "./hooks/use-whiteboard-assistant";
export {
	type AssistantState,
	type AssistantStatus,
	useAssistantStore,
} from "./state/assistant-store";

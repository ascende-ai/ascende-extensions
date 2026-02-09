import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useThemeType } from "@/hooks/useVscTheme";

export const getLogoPath = (assetName: string) => {
  return `${window.vscMediaUrl}/logos/${assetName}`;
};

/**
 * Returns the brand logo path based on the current theme.
 * For dark themes: returns ascendeai-branco.png (white logo)
 * For light themes: returns ascendeai-preto.png (black logo)
 */
export const getBrandLogoPath = (themeType?: string) => {
  // Default to dark if themeType is not provided
  const isDark = themeType !== 'light';
  const logoName = isDark ? 'ascendeai-branco.png' : 'ascendeai-preto.png';
  return getLogoPath(logoName);
};

export default function ImportExtensions({ importError, isDone }: { importError: string, isDone: boolean }) {
  const themeType = useThemeType();
  return (
    <div className="flex flex-col items-center justify-center h-full relative gap-5">
      <div className="self-stretch text-center text-2xl font-['SF Pro']">
        Import your VS Code extensions to PearAI
      </div>
      <div className="flex items-center justify-center gap-8">
        <img src={getLogoPath("vscode.svg")} className="w-[100px] h-[100px]" alt="VS Code" />
        <ArrowLongRightIcon className="w-8 h-8 text-muted-foreground" />
        <img src={getBrandLogoPath(themeType)} className="w-36 h-36 ml-[-2.5rem]" alt="Ascende.ai Logo" />
      </div>
      <div className="absolute bottom-8 h-8">
        {importError && <p className="text-red-500 text-center">{importError}</p>}
        {isDone && (
          <div className="text-center">
            Done importing! You can continue to the next step.
          </div>
        )}
      </div>
    </div>
  );
}

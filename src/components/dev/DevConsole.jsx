import { useDevFlags, toggleDevFlag } from '@/utils/devFlags';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function DevConsole() {
  const devFlags = useDevFlags();

  const handleToggle = (flag) => () => {
    toggleDevFlag(flag);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold text-white">Dev Console Settings</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-zinc-800 p-3 rounded">
          <Label htmlFor="simulateProd" className="text-white">
            Simulate Production Mode
          </Label>
          <Switch
            id="simulateProd"
            checked={devFlags.simulateProd}
            onCheckedChange={handleToggle('simulateProd')}
          />
        </div>

        <div className="flex items-center justify-between bg-zinc-800 p-3 rounded">
          <Label htmlFor="showWhisperPreview" className="text-white">
            Show Whisper Preview
          </Label>
          <Switch
            id="showWhisperPreview"
            checked={devFlags.showWhisperPreview}
            onCheckedChange={handleToggle('showWhisperPreview')}
          />
        </div>

        <div className="flex items-center justify-between bg-zinc-800 p-3 rounded">
          <Label htmlFor="toneEchoDebug" className="text-white">
            Enable Tone Echo Debug
          </Label>
          <Switch
            id="toneEchoDebug"
            checked={devFlags.toneEchoDebug}
            onCheckedChange={handleToggle('toneEchoDebug')}
          />
        </div>
      </div>
    </div>
  );
}

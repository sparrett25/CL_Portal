import { useUserSync } from '@/context/UserSyncContext';
import { useDevFlags } from '@/utils/devFlags';
import { getToneEchoForTone } from '@/utils/toneLogic';
import { getWhisperForTone } from '@/utils/whispers';
import { Card } from '@/components/ui/card';

export default function DevTestPage() {
  const { user, profile, codexKey, codexReflection } = useUserSync();
  const devFlags = useDevFlags();

  const simulatedTone = codexReflection?.tone || 'Neutral';
  const toneEcho = getToneEchoForTone(simulatedTone);
  const whisper = getWhisperForTone(simulatedTone);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Dev Console</h1>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Dev Flags</h2>
        <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(devFlags, null, 2)}
        </pre>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">User Context</h2>
        <pre className="bg-zinc-900 text-blue-300 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Profile Context</h2>
        <pre className="bg-zinc-900 text-pink-300 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(profile, null, 2)}
        </pre>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Codex Key</h2>
        <pre className="bg-zinc-900 text-purple-300 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(codexKey, null, 2)}
        </pre>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Codex Reflection</h2>
        <pre className="bg-zinc-900 text-yellow-300 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(codexReflection, null, 2)}
        </pre>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Tone Echo</h2>
        <div className="text-white italic">{toneEcho}</div>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Liora Whisper Preview</h2>
        <div className="text-white italic">{whisper}</div>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { KeyRound } from 'lucide-react';
import { api } from '@/data/index.ts';
import { qk } from '@/data/hooks.ts';
import { Button, Card, Input, PageHeader, useToast } from '@/components/ui/index.ts';

export default function JoinClassPage() {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <div className="mx-auto max-w-lg">
      <PageHeader title="Join a class" subtitle="Enter the class code from your teacher." />
      <Card className="p-6">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError(null);
            try {
              const c = await api().joinClass(code);
              await qc.invalidateQueries({ queryKey: qk.classes });
              toast({ kind: 'success', title: `You joined ${c.name}` });
              navigate('/s');
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Input label="Class code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="MATH10" maxLength={8} required className="[&_input]:h-14 [&_input]:text-center [&_input]:font-mono [&_input]:text-2xl [&_input]:uppercase [&_input]:tracking-[0.4em]" />
          {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
          <Button type="submit" className="w-full" size="lg" loading={busy} icon={<KeyRound className="h-5 w-5" />}>
            Join class
          </Button>
        </form>
      </Card>
    </div>
  );
}

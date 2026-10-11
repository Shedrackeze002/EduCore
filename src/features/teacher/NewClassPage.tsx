import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Check, Lock } from 'lucide-react';
import { COURSES } from '@engine/curriculum/index.ts';
import { api } from '@/data/index.ts';
import { useCreateClass } from '@/data/hooks.ts';
import { Button, Card, CardBody, Checkbox, Input, PageHeader, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { ApprovalNotice, needsApproval } from './ApprovalNotice.tsx';

const UPCOMING = ['Grades 5 to 9'];

export default function NewClassPage() {
  const [name, setName] = useState(COURSES[0].shortTitle);
  const [nameEdited, setNameEdited] = useState(false);
  const [section, setSection] = useState('');
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const [publishFirst, setPublishFirst] = useState(true);
  const create = useCreateClass();
  const navigate = useNavigate();
  const toast = useToast();
  const me = useMe();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const c = await create.mutateAsync({ name: name.trim() || 'My class', section: section.trim() || null, courseId });
      if (publishFirst) {
        const course = COURSES.find((x) => x.id === courseId)!;
        await api().setPublished(c.id, course.lessons[0].id, true);
      }
      toast({ kind: 'success', title: 'Class created', body: `Share the code ${c.joinCode} with your students, or add them from the Students page.` });
      navigate(`/t/c/${c.id}`);
    } catch (err) {
      toast({ kind: 'error', title: 'Could not create the class', body: (err as Error).message });
    }
  }

  if (needsApproval(me)) return <ApprovalNotice me={me} />;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Create a class" subtitle="Each class gets its own roster, join code, published lessons and gradebook." back={{ to: '/t?all', label: 'My classes' }} />
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Input label="Class name" value={name} onChange={(e) => { setName(e.target.value); setNameEdited(true); }} required maxLength={60} />
            <Input label="Section or period" placeholder="e.g. Block A, Period 3" value={section} onChange={(e) => setSection(e.target.value)} maxLength={40} />
          </CardBody>
        </Card>
        <div>
          <div className="label">Course</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {COURSES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCourseId(c.id);
                  if (!nameEdited) setName(c.shortTitle);
                }}
                className={cn('card flex items-start gap-3 p-4 text-left transition', courseId === c.id ? 'border-brand ring-2 ring-brand/20' : 'hover:border-line-strong')}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{c.title}</span>
                  <span className="mt-0.5 block text-sm text-ink-3">
                    {c.units.length} units · {c.lessons.length} lessons · {c.outcomes.length} outcomes
                  </span>
                </span>
                {courseId === c.id && <Check className="h-5 w-5 text-brand" />}
              </button>
            ))}
            {UPCOMING.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-dashed border-line p-4 text-ink-3">
                <Lock className="h-4 w-4" />
                <span className="text-sm">{t}</span>
                <span className="ml-auto text-xs">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
        <Checkbox checked={publishFirst} onChange={setPublishFirst} label="Publish the first lesson now so students see something when they join" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" to="/t?all">
            Cancel
          </Button>
          <Button type="submit" loading={create.isPending}>
            Create class
          </Button>
        </div>
      </form>
    </div>
  );
}

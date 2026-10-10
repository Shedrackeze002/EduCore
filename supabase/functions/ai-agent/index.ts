/**
 * ai-agent: the AI teaching assistant.
 *   status   — whether live MiniMax analysis is configured.
 *   generate — analyse a class or one student and store the insight.
 *
 * Secrets: MINIMAX_API_KEY (required for live AI), MINIMAX_MODEL, MINIMAX_BASE_URL.
 * Without a key the shared offline analyst is used, so insights always work.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, requireTeacherOf, str } from '../_shared/db.ts';
import { aiConfig, loadAnalystInput } from '../_shared/analyst.ts';
import { DEFAULT_MODEL, generateInsight } from '../_shared/engine/ai/index.ts';

const PER_HOUR = Number(Deno.env.get('AI_INSIGHTS_PER_HOUR') ?? 60);

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  const body = await readJson(req);

  if (body.action === 'status') {
    const cfg = aiConfig();
    return cfg
      ? { live: true, model: cfg.model ?? DEFAULT_MODEL, note: 'Live analysis with MiniMax. If MiniMax is unavailable, the offline analyst answers instead.' }
      : { live: false, model: null, note: 'Using EduCore’s offline analyst. Set the MINIMAX_API_KEY secret on the ai-agent function to enable MiniMax.' };
  }

  if (body.action !== 'generate') throw new HttpError(400, 'Unknown action.');
  const classId = str(body.classId, 64);
  await requireTeacherOf(db, classId, me);
  const studentId = body.studentId ? str(body.studentId, 64) : null;
  if (studentId) {
    const { data } = await db.from('enrollments').select('student_id').eq('class_id', classId).eq('student_id', studentId).maybeSingle();
    if (!data) throw new HttpError(404, 'That student is not in this class.');
  }
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await db.from('insights').select('id', { count: 'exact', head: true }).eq('class_id', classId).gte('created_at', since);
  if ((count ?? 0) >= PER_HOUR) throw new HttpError(429, 'You have run many analyses this hour. Please try again later.');

  const input = await loadAnalystInput(db, classId);
  const res = await generateInsight(input, studentId ? { scope: 'student', studentId } : { scope: 'class' }, aiConfig());
  const { data, error } = await db
    .from('insights')
    .insert({ class_id: classId, student_id: studentId, source: res.source, model: res.model, data: res.data, error: res.error ?? null })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { insight: data };
});
